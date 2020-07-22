// package: event_store.client.operations
// file: operations.proto

var operations_pb = require("./operations_pb");
var shared_pb = require("./shared_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Operations = (function () {
  function Operations() {}
  Operations.serviceName = "event_store.client.operations.Operations";
  return Operations;
}());

Operations.StartScavenge = {
  methodName: "StartScavenge",
  service: Operations,
  requestStream: false,
  responseStream: false,
  requestType: operations_pb.StartScavengeReq,
  responseType: operations_pb.ScavengeResp
};

Operations.StopScavenge = {
  methodName: "StopScavenge",
  service: Operations,
  requestStream: false,
  responseStream: false,
  requestType: operations_pb.StopScavengeReq,
  responseType: operations_pb.ScavengeResp
};

Operations.Shutdown = {
  methodName: "Shutdown",
  service: Operations,
  requestStream: false,
  responseStream: false,
  requestType: shared_pb.Empty,
  responseType: shared_pb.Empty
};

Operations.MergeIndexes = {
  methodName: "MergeIndexes",
  service: Operations,
  requestStream: false,
  responseStream: false,
  requestType: shared_pb.Empty,
  responseType: shared_pb.Empty
};

Operations.ResignNode = {
  methodName: "ResignNode",
  service: Operations,
  requestStream: false,
  responseStream: false,
  requestType: shared_pb.Empty,
  responseType: shared_pb.Empty
};

Operations.SetNodePriority = {
  methodName: "SetNodePriority",
  service: Operations,
  requestStream: false,
  responseStream: false,
  requestType: operations_pb.SetNodePriorityReq,
  responseType: shared_pb.Empty
};

exports.Operations = Operations;

function OperationsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

OperationsClient.prototype.startScavenge = function startScavenge(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Operations.StartScavenge, {
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

OperationsClient.prototype.stopScavenge = function stopScavenge(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Operations.StopScavenge, {
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

OperationsClient.prototype.shutdown = function shutdown(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Operations.Shutdown, {
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

OperationsClient.prototype.mergeIndexes = function mergeIndexes(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Operations.MergeIndexes, {
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

OperationsClient.prototype.resignNode = function resignNode(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Operations.ResignNode, {
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

OperationsClient.prototype.setNodePriority = function setNodePriority(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Operations.SetNodePriority, {
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

exports.OperationsClient = OperationsClient;

