// package: event_store.grpc.projections
// file: projections.proto

var projections_pb = require("./projections_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Projections = (function () {
  function Projections() {}
  Projections.serviceName = "event_store.grpc.projections.Projections";
  return Projections;
}());

Projections.Create = {
  methodName: "Create",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.CreateReq,
  responseType: projections_pb.CreateResp
};

Projections.Update = {
  methodName: "Update",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.UpdateReq,
  responseType: projections_pb.UpdateResp
};

Projections.Delete = {
  methodName: "Delete",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.DeleteReq,
  responseType: projections_pb.DeleteResp
};

Projections.Statistics = {
  methodName: "Statistics",
  service: Projections,
  requestStream: false,
  responseStream: true,
  requestType: projections_pb.StatisticsReq,
  responseType: projections_pb.StatisticsResp
};

Projections.Disable = {
  methodName: "Disable",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.DisableReq,
  responseType: projections_pb.DisableResp
};

Projections.Enable = {
  methodName: "Enable",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.EnableReq,
  responseType: projections_pb.EnableResp
};

Projections.Reset = {
  methodName: "Reset",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.ResetReq,
  responseType: projections_pb.ResetResp
};

Projections.State = {
  methodName: "State",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.StateReq,
  responseType: projections_pb.StateResp
};

Projections.Result = {
  methodName: "Result",
  service: Projections,
  requestStream: false,
  responseStream: false,
  requestType: projections_pb.ResultReq,
  responseType: projections_pb.ResultResp
};

exports.Projections = Projections;

function ProjectionsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ProjectionsClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.Create, {
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

ProjectionsClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.Update, {
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

ProjectionsClient.prototype.delete = function pb_delete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.Delete, {
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

ProjectionsClient.prototype.statistics = function statistics(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Projections.Statistics, {
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

ProjectionsClient.prototype.disable = function disable(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.Disable, {
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

ProjectionsClient.prototype.enable = function enable(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.Enable, {
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

ProjectionsClient.prototype.reset = function reset(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.Reset, {
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

ProjectionsClient.prototype.state = function state(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.State, {
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

ProjectionsClient.prototype.result = function result(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Projections.Result, {
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

exports.ProjectionsClient = ProjectionsClient;

