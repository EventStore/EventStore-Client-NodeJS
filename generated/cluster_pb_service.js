// package: event_store.cluster
// file: cluster.proto

var cluster_pb = require("./cluster_pb");
var shared_pb = require("./shared_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Gossip = (function () {
  function Gossip() {}
  Gossip.serviceName = "event_store.cluster.Gossip";
  return Gossip;
}());

Gossip.Update = {
  methodName: "Update",
  service: Gossip,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.GossipRequest,
  responseType: cluster_pb.ClusterInfo
};

Gossip.Read = {
  methodName: "Read",
  service: Gossip,
  requestStream: false,
  responseStream: false,
  requestType: shared_pb.Empty,
  responseType: cluster_pb.ClusterInfo
};

exports.Gossip = Gossip;

function GossipClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GossipClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Gossip.Update, {
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

GossipClient.prototype.read = function read(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Gossip.Read, {
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

exports.GossipClient = GossipClient;

var Elections = (function () {
  function Elections() {}
  Elections.serviceName = "event_store.cluster.Elections";
  return Elections;
}());

Elections.ViewChange = {
  methodName: "ViewChange",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.ViewChangeRequest,
  responseType: shared_pb.Empty
};

Elections.ViewChangeProof = {
  methodName: "ViewChangeProof",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.ViewChangeProofRequest,
  responseType: shared_pb.Empty
};

Elections.Prepare = {
  methodName: "Prepare",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.PrepareRequest,
  responseType: shared_pb.Empty
};

Elections.PrepareOk = {
  methodName: "PrepareOk",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.PrepareOkRequest,
  responseType: shared_pb.Empty
};

Elections.Proposal = {
  methodName: "Proposal",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.ProposalRequest,
  responseType: shared_pb.Empty
};

Elections.Accept = {
  methodName: "Accept",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.AcceptRequest,
  responseType: shared_pb.Empty
};

Elections.LeaderIsResigning = {
  methodName: "LeaderIsResigning",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.LeaderIsResigningRequest,
  responseType: shared_pb.Empty
};

Elections.LeaderIsResigningOk = {
  methodName: "LeaderIsResigningOk",
  service: Elections,
  requestStream: false,
  responseStream: false,
  requestType: cluster_pb.LeaderIsResigningOkRequest,
  responseType: shared_pb.Empty
};

exports.Elections = Elections;

function ElectionsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ElectionsClient.prototype.viewChange = function viewChange(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.ViewChange, {
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

ElectionsClient.prototype.viewChangeProof = function viewChangeProof(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.ViewChangeProof, {
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

ElectionsClient.prototype.prepare = function prepare(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.Prepare, {
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

ElectionsClient.prototype.prepareOk = function prepareOk(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.PrepareOk, {
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

ElectionsClient.prototype.proposal = function proposal(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.Proposal, {
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

ElectionsClient.prototype.accept = function accept(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.Accept, {
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

ElectionsClient.prototype.leaderIsResigning = function leaderIsResigning(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.LeaderIsResigning, {
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

ElectionsClient.prototype.leaderIsResigningOk = function leaderIsResigningOk(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Elections.LeaderIsResigningOk, {
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

exports.ElectionsClient = ElectionsClient;

