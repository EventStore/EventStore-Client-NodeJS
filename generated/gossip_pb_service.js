// package: event_store.client.gossip
// file: gossip.proto

var gossip_pb = require("./gossip_pb");
var shared_pb = require("./shared_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Gossip = (function () {
  function Gossip() {}
  Gossip.serviceName = "event_store.client.gossip.Gossip";
  return Gossip;
}());

Gossip.Read = {
  methodName: "Read",
  service: Gossip,
  requestStream: false,
  responseStream: false,
  requestType: shared_pb.Empty,
  responseType: gossip_pb.ClusterInfo
};

exports.Gossip = Gossip;

function GossipClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

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

