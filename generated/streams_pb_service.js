// package: event_store.client.streams
// file: streams.proto

var streams_pb = require("./streams_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Streams = (function () {
  function Streams() {}
  Streams.serviceName = "event_store.client.streams.Streams";
  return Streams;
}());

Streams.Read = {
  methodName: "Read",
  service: Streams,
  requestStream: false,
  responseStream: true,
  requestType: streams_pb.ReadReq,
  responseType: streams_pb.ReadResp
};

Streams.Append = {
  methodName: "Append",
  service: Streams,
  requestStream: true,
  responseStream: false,
  requestType: streams_pb.AppendReq,
  responseType: streams_pb.AppendResp
};

Streams.Delete = {
  methodName: "Delete",
  service: Streams,
  requestStream: false,
  responseStream: false,
  requestType: streams_pb.DeleteReq,
  responseType: streams_pb.DeleteResp
};

Streams.Tombstone = {
  methodName: "Tombstone",
  service: Streams,
  requestStream: false,
  responseStream: false,
  requestType: streams_pb.TombstoneReq,
  responseType: streams_pb.TombstoneResp
};

exports.Streams = Streams;

function StreamsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

StreamsClient.prototype.read = function read(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Streams.Read, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

StreamsClient.prototype.append = function append(metadata) {
  var listeners = {
    end: [],
    status: []
  };
  var client = grpc.client(Streams.Append, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      if (!client.started) {
        client.start(metadata);
      }
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

StreamsClient.prototype.delete = function pb_delete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Streams.Delete, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

StreamsClient.prototype.tombstone = function tombstone(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Streams.Tombstone, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.StreamsClient = StreamsClient;

