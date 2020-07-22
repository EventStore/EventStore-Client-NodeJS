// package: event_store.client.persistent_subscriptions
// file: persistent.proto

var persistent_pb = require("./persistent_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PersistentSubscriptions = (function () {
  function PersistentSubscriptions() {}
  PersistentSubscriptions.serviceName = "event_store.client.persistent_subscriptions.PersistentSubscriptions";
  return PersistentSubscriptions;
}());

PersistentSubscriptions.Create = {
  methodName: "Create",
  service: PersistentSubscriptions,
  requestStream: false,
  responseStream: false,
  requestType: persistent_pb.CreateReq,
  responseType: persistent_pb.CreateResp
};

PersistentSubscriptions.Update = {
  methodName: "Update",
  service: PersistentSubscriptions,
  requestStream: false,
  responseStream: false,
  requestType: persistent_pb.UpdateReq,
  responseType: persistent_pb.UpdateResp
};

PersistentSubscriptions.Delete = {
  methodName: "Delete",
  service: PersistentSubscriptions,
  requestStream: false,
  responseStream: false,
  requestType: persistent_pb.DeleteReq,
  responseType: persistent_pb.DeleteResp
};

PersistentSubscriptions.Read = {
  methodName: "Read",
  service: PersistentSubscriptions,
  requestStream: true,
  responseStream: true,
  requestType: persistent_pb.ReadReq,
  responseType: persistent_pb.ReadResp
};

exports.PersistentSubscriptions = PersistentSubscriptions;

function PersistentSubscriptionsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PersistentSubscriptionsClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PersistentSubscriptions.Create, {
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

PersistentSubscriptionsClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PersistentSubscriptions.Update, {
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

PersistentSubscriptionsClient.prototype.delete = function pb_delete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PersistentSubscriptions.Delete, {
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

PersistentSubscriptionsClient.prototype.read = function read(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(PersistentSubscriptions.Read, {
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
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
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

exports.PersistentSubscriptionsClient = PersistentSubscriptionsClient;

