// source: operations.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var shared_pb = require('./shared_pb.js');
goog.object.extend(proto, shared_pb);
goog.exportSymbol('proto.event_store.client.operations.ScavengeResp', null, global);
goog.exportSymbol('proto.event_store.client.operations.ScavengeResp.ScavengeResult', null, global);
goog.exportSymbol('proto.event_store.client.operations.SetNodePriorityReq', null, global);
goog.exportSymbol('proto.event_store.client.operations.StartScavengeReq', null, global);
goog.exportSymbol('proto.event_store.client.operations.StartScavengeReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.operations.StopScavengeReq', null, global);
goog.exportSymbol('proto.event_store.client.operations.StopScavengeReq.Options', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event_store.client.operations.StartScavengeReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.operations.StartScavengeReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.operations.StartScavengeReq.displayName = 'proto.event_store.client.operations.StartScavengeReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event_store.client.operations.StartScavengeReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.operations.StartScavengeReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.operations.StartScavengeReq.Options.displayName = 'proto.event_store.client.operations.StartScavengeReq.Options';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event_store.client.operations.StopScavengeReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.operations.StopScavengeReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.operations.StopScavengeReq.displayName = 'proto.event_store.client.operations.StopScavengeReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event_store.client.operations.StopScavengeReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.operations.StopScavengeReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.operations.StopScavengeReq.Options.displayName = 'proto.event_store.client.operations.StopScavengeReq.Options';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event_store.client.operations.ScavengeResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.operations.ScavengeResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.operations.ScavengeResp.displayName = 'proto.event_store.client.operations.ScavengeResp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event_store.client.operations.SetNodePriorityReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.operations.SetNodePriorityReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.operations.SetNodePriorityReq.displayName = 'proto.event_store.client.operations.SetNodePriorityReq';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event_store.client.operations.StartScavengeReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.operations.StartScavengeReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.operations.StartScavengeReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StartScavengeReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.operations.StartScavengeReq.Options.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event_store.client.operations.StartScavengeReq}
 */
proto.event_store.client.operations.StartScavengeReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.operations.StartScavengeReq;
  return proto.event_store.client.operations.StartScavengeReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.operations.StartScavengeReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.operations.StartScavengeReq}
 */
proto.event_store.client.operations.StartScavengeReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.operations.StartScavengeReq.Options;
      reader.readMessage(value,proto.event_store.client.operations.StartScavengeReq.Options.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event_store.client.operations.StartScavengeReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.operations.StartScavengeReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.operations.StartScavengeReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StartScavengeReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.operations.StartScavengeReq.Options.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event_store.client.operations.StartScavengeReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.operations.StartScavengeReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.operations.StartScavengeReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StartScavengeReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    threadCount: jspb.Message.getFieldWithDefault(msg, 1, 0),
    startFromChunk: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event_store.client.operations.StartScavengeReq.Options}
 */
proto.event_store.client.operations.StartScavengeReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.operations.StartScavengeReq.Options;
  return proto.event_store.client.operations.StartScavengeReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.operations.StartScavengeReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.operations.StartScavengeReq.Options}
 */
proto.event_store.client.operations.StartScavengeReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setThreadCount(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartFromChunk(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event_store.client.operations.StartScavengeReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.operations.StartScavengeReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.operations.StartScavengeReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StartScavengeReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getThreadCount();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getStartFromChunk();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 thread_count = 1;
 * @return {number}
 */
proto.event_store.client.operations.StartScavengeReq.Options.prototype.getThreadCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.operations.StartScavengeReq.Options} returns this
 */
proto.event_store.client.operations.StartScavengeReq.Options.prototype.setThreadCount = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 start_from_chunk = 2;
 * @return {number}
 */
proto.event_store.client.operations.StartScavengeReq.Options.prototype.getStartFromChunk = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.operations.StartScavengeReq.Options} returns this
 */
proto.event_store.client.operations.StartScavengeReq.Options.prototype.setStartFromChunk = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.operations.StartScavengeReq.Options}
 */
proto.event_store.client.operations.StartScavengeReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.operations.StartScavengeReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.operations.StartScavengeReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.operations.StartScavengeReq.Options|undefined} value
 * @return {!proto.event_store.client.operations.StartScavengeReq} returns this
*/
proto.event_store.client.operations.StartScavengeReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.operations.StartScavengeReq} returns this
 */
proto.event_store.client.operations.StartScavengeReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.operations.StartScavengeReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event_store.client.operations.StopScavengeReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.operations.StopScavengeReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.operations.StopScavengeReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StopScavengeReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.operations.StopScavengeReq.Options.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event_store.client.operations.StopScavengeReq}
 */
proto.event_store.client.operations.StopScavengeReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.operations.StopScavengeReq;
  return proto.event_store.client.operations.StopScavengeReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.operations.StopScavengeReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.operations.StopScavengeReq}
 */
proto.event_store.client.operations.StopScavengeReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.operations.StopScavengeReq.Options;
      reader.readMessage(value,proto.event_store.client.operations.StopScavengeReq.Options.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event_store.client.operations.StopScavengeReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.operations.StopScavengeReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.operations.StopScavengeReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StopScavengeReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.operations.StopScavengeReq.Options.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event_store.client.operations.StopScavengeReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.operations.StopScavengeReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.operations.StopScavengeReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StopScavengeReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    scavengeId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event_store.client.operations.StopScavengeReq.Options}
 */
proto.event_store.client.operations.StopScavengeReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.operations.StopScavengeReq.Options;
  return proto.event_store.client.operations.StopScavengeReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.operations.StopScavengeReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.operations.StopScavengeReq.Options}
 */
proto.event_store.client.operations.StopScavengeReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setScavengeId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event_store.client.operations.StopScavengeReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.operations.StopScavengeReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.operations.StopScavengeReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.StopScavengeReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getScavengeId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string scavenge_id = 1;
 * @return {string}
 */
proto.event_store.client.operations.StopScavengeReq.Options.prototype.getScavengeId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.operations.StopScavengeReq.Options} returns this
 */
proto.event_store.client.operations.StopScavengeReq.Options.prototype.setScavengeId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.operations.StopScavengeReq.Options}
 */
proto.event_store.client.operations.StopScavengeReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.operations.StopScavengeReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.operations.StopScavengeReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.operations.StopScavengeReq.Options|undefined} value
 * @return {!proto.event_store.client.operations.StopScavengeReq} returns this
*/
proto.event_store.client.operations.StopScavengeReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.operations.StopScavengeReq} returns this
 */
proto.event_store.client.operations.StopScavengeReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.operations.StopScavengeReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event_store.client.operations.ScavengeResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.operations.ScavengeResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.operations.ScavengeResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.ScavengeResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    scavengeId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    scavengeResult: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event_store.client.operations.ScavengeResp}
 */
proto.event_store.client.operations.ScavengeResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.operations.ScavengeResp;
  return proto.event_store.client.operations.ScavengeResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.operations.ScavengeResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.operations.ScavengeResp}
 */
proto.event_store.client.operations.ScavengeResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setScavengeId(value);
      break;
    case 2:
      var value = /** @type {!proto.event_store.client.operations.ScavengeResp.ScavengeResult} */ (reader.readEnum());
      msg.setScavengeResult(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event_store.client.operations.ScavengeResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.operations.ScavengeResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.operations.ScavengeResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.ScavengeResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getScavengeId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getScavengeResult();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.event_store.client.operations.ScavengeResp.ScavengeResult = {
  STARTED: 0,
  INPROGRESS: 1,
  STOPPED: 2
};

/**
 * optional string scavenge_id = 1;
 * @return {string}
 */
proto.event_store.client.operations.ScavengeResp.prototype.getScavengeId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.operations.ScavengeResp} returns this
 */
proto.event_store.client.operations.ScavengeResp.prototype.setScavengeId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional ScavengeResult scavenge_result = 2;
 * @return {!proto.event_store.client.operations.ScavengeResp.ScavengeResult}
 */
proto.event_store.client.operations.ScavengeResp.prototype.getScavengeResult = function() {
  return /** @type {!proto.event_store.client.operations.ScavengeResp.ScavengeResult} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.event_store.client.operations.ScavengeResp.ScavengeResult} value
 * @return {!proto.event_store.client.operations.ScavengeResp} returns this
 */
proto.event_store.client.operations.ScavengeResp.prototype.setScavengeResult = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event_store.client.operations.SetNodePriorityReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.operations.SetNodePriorityReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.operations.SetNodePriorityReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.SetNodePriorityReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    priority: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event_store.client.operations.SetNodePriorityReq}
 */
proto.event_store.client.operations.SetNodePriorityReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.operations.SetNodePriorityReq;
  return proto.event_store.client.operations.SetNodePriorityReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.operations.SetNodePriorityReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.operations.SetNodePriorityReq}
 */
proto.event_store.client.operations.SetNodePriorityReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPriority(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event_store.client.operations.SetNodePriorityReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.operations.SetNodePriorityReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.operations.SetNodePriorityReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.operations.SetNodePriorityReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPriority();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 priority = 1;
 * @return {number}
 */
proto.event_store.client.operations.SetNodePriorityReq.prototype.getPriority = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.operations.SetNodePriorityReq} returns this
 */
proto.event_store.client.operations.SetNodePriorityReq.prototype.setPriority = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


goog.object.extend(exports, proto.event_store.client.operations);