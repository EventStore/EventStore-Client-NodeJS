// source: streams.proto
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
var status_pb = require('./status_pb.js');
goog.object.extend(proto, status_pb);
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
goog.exportSymbol('proto.event_store.client.streams.AppendReq', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendReq.ContentCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendReq.Options.ExpectedStreamRevisionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendReq.ProposedMessage', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.Position', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.ResultCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.Success', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.Success.CurrentRevisionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.Success.PositionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.WrongExpectedVersion', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOption2060Case', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOption2060Case', null, global);
goog.exportSymbol('proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendReq', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendReq.Options.ExpectedStreamPositionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendReq.ProposedMessage', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendResp', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendResp.ExpectedStreamPositionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendResp.ResultCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendResp.Success', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendResp.Success.CurrentRevisionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.BatchAppendResp.Success.PositionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.DeleteReq', null, global);
goog.exportSymbol('proto.event_store.client.streams.DeleteReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.streams.DeleteReq.Options.ExpectedStreamRevisionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.DeleteResp', null, global);
goog.exportSymbol('proto.event_store.client.streams.DeleteResp.Position', null, global);
goog.exportSymbol('proto.event_store.client.streams.DeleteResp.PositionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.AllOptions', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.AllOptions.AllOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.ControlOption', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.CountOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.FilterOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.FilterOptions', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.FilterOptions.FilterCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.FilterOptions.WindowCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.Position', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.ReadDirection', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.StreamOptions', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.StreamOptions.RevisionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.UUIDOption', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadReq.Options.UUIDOption.ContentCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.CaughtUp', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.Checkpoint', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.ContentCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.FellBehind', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.ReadEvent', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.ReadEvent.PositionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.StreamNotFound', null, global);
goog.exportSymbol('proto.event_store.client.streams.ReadResp.SubscriptionConfirmation', null, global);
goog.exportSymbol('proto.event_store.client.streams.TombstoneReq', null, global);
goog.exportSymbol('proto.event_store.client.streams.TombstoneReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.streams.TombstoneReq.Options.ExpectedStreamRevisionCase', null, global);
goog.exportSymbol('proto.event_store.client.streams.TombstoneResp', null, global);
goog.exportSymbol('proto.event_store.client.streams.TombstoneResp.Position', null, global);
goog.exportSymbol('proto.event_store.client.streams.TombstoneResp.PositionOptionCase', null, global);
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
proto.event_store.client.streams.ReadReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.displayName = 'proto.event_store.client.streams.ReadReq';
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
proto.event_store.client.streams.ReadReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.ReadReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.displayName = 'proto.event_store.client.streams.ReadReq.Options';
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
proto.event_store.client.streams.ReadReq.Options.StreamOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.ReadReq.Options.StreamOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.StreamOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.StreamOptions.displayName = 'proto.event_store.client.streams.ReadReq.Options.StreamOptions';
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
proto.event_store.client.streams.ReadReq.Options.AllOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.ReadReq.Options.AllOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.AllOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.AllOptions.displayName = 'proto.event_store.client.streams.ReadReq.Options.AllOptions';
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
proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.displayName = 'proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions';
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
proto.event_store.client.streams.ReadReq.Options.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.Position.displayName = 'proto.event_store.client.streams.ReadReq.Options.Position';
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
proto.event_store.client.streams.ReadReq.Options.FilterOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.FilterOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.FilterOptions.displayName = 'proto.event_store.client.streams.ReadReq.Options.FilterOptions';
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
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.displayName = 'proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression';
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
proto.event_store.client.streams.ReadReq.Options.UUIDOption = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.ReadReq.Options.UUIDOption.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.UUIDOption, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.UUIDOption.displayName = 'proto.event_store.client.streams.ReadReq.Options.UUIDOption';
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
proto.event_store.client.streams.ReadReq.Options.ControlOption = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadReq.Options.ControlOption, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadReq.Options.ControlOption.displayName = 'proto.event_store.client.streams.ReadReq.Options.ControlOption';
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
proto.event_store.client.streams.ReadResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.ReadResp.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.ReadResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.displayName = 'proto.event_store.client.streams.ReadResp';
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
proto.event_store.client.streams.ReadResp.CaughtUp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadResp.CaughtUp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.CaughtUp.displayName = 'proto.event_store.client.streams.ReadResp.CaughtUp';
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
proto.event_store.client.streams.ReadResp.FellBehind = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadResp.FellBehind, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.FellBehind.displayName = 'proto.event_store.client.streams.ReadResp.FellBehind';
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
proto.event_store.client.streams.ReadResp.ReadEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.ReadResp.ReadEvent.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.ReadResp.ReadEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.ReadEvent.displayName = 'proto.event_store.client.streams.ReadResp.ReadEvent';
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
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.displayName = 'proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent';
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
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadResp.SubscriptionConfirmation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.displayName = 'proto.event_store.client.streams.ReadResp.SubscriptionConfirmation';
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
proto.event_store.client.streams.ReadResp.Checkpoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadResp.Checkpoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.Checkpoint.displayName = 'proto.event_store.client.streams.ReadResp.Checkpoint';
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
proto.event_store.client.streams.ReadResp.StreamNotFound = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.ReadResp.StreamNotFound, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.ReadResp.StreamNotFound.displayName = 'proto.event_store.client.streams.ReadResp.StreamNotFound';
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
proto.event_store.client.streams.AppendReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.AppendReq.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.AppendReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.AppendReq.displayName = 'proto.event_store.client.streams.AppendReq';
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
proto.event_store.client.streams.AppendReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.AppendReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.AppendReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.AppendReq.Options.displayName = 'proto.event_store.client.streams.AppendReq.Options';
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
proto.event_store.client.streams.AppendReq.ProposedMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.AppendReq.ProposedMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.AppendReq.ProposedMessage.displayName = 'proto.event_store.client.streams.AppendReq.ProposedMessage';
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
proto.event_store.client.streams.AppendResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.AppendResp.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.AppendResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.AppendResp.displayName = 'proto.event_store.client.streams.AppendResp';
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
proto.event_store.client.streams.AppendResp.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.AppendResp.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.AppendResp.Position.displayName = 'proto.event_store.client.streams.AppendResp.Position';
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
proto.event_store.client.streams.AppendResp.Success = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.AppendResp.Success.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.AppendResp.Success, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.AppendResp.Success.displayName = 'proto.event_store.client.streams.AppendResp.Success';
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
proto.event_store.client.streams.AppendResp.WrongExpectedVersion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.AppendResp.WrongExpectedVersion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.AppendResp.WrongExpectedVersion.displayName = 'proto.event_store.client.streams.AppendResp.WrongExpectedVersion';
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
proto.event_store.client.streams.BatchAppendReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.streams.BatchAppendReq.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.streams.BatchAppendReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.BatchAppendReq.displayName = 'proto.event_store.client.streams.BatchAppendReq';
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
proto.event_store.client.streams.BatchAppendReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.BatchAppendReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.BatchAppendReq.Options.displayName = 'proto.event_store.client.streams.BatchAppendReq.Options';
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
proto.event_store.client.streams.BatchAppendReq.ProposedMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.BatchAppendReq.ProposedMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.BatchAppendReq.ProposedMessage.displayName = 'proto.event_store.client.streams.BatchAppendReq.ProposedMessage';
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
proto.event_store.client.streams.BatchAppendResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.BatchAppendResp.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.BatchAppendResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.BatchAppendResp.displayName = 'proto.event_store.client.streams.BatchAppendResp';
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
proto.event_store.client.streams.BatchAppendResp.Success = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.BatchAppendResp.Success, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.BatchAppendResp.Success.displayName = 'proto.event_store.client.streams.BatchAppendResp.Success';
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
proto.event_store.client.streams.DeleteReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.DeleteReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.DeleteReq.displayName = 'proto.event_store.client.streams.DeleteReq';
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
proto.event_store.client.streams.DeleteReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.DeleteReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.DeleteReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.DeleteReq.Options.displayName = 'proto.event_store.client.streams.DeleteReq.Options';
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
proto.event_store.client.streams.DeleteResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.DeleteResp.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.DeleteResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.DeleteResp.displayName = 'proto.event_store.client.streams.DeleteResp';
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
proto.event_store.client.streams.DeleteResp.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.DeleteResp.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.DeleteResp.Position.displayName = 'proto.event_store.client.streams.DeleteResp.Position';
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
proto.event_store.client.streams.TombstoneReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.TombstoneReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.TombstoneReq.displayName = 'proto.event_store.client.streams.TombstoneReq';
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
proto.event_store.client.streams.TombstoneReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.TombstoneReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.TombstoneReq.Options.displayName = 'proto.event_store.client.streams.TombstoneReq.Options';
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
proto.event_store.client.streams.TombstoneResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.streams.TombstoneResp.oneofGroups_);
};
goog.inherits(proto.event_store.client.streams.TombstoneResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.TombstoneResp.displayName = 'proto.event_store.client.streams.TombstoneResp';
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
proto.event_store.client.streams.TombstoneResp.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.streams.TombstoneResp.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.streams.TombstoneResp.Position.displayName = 'proto.event_store.client.streams.TombstoneResp.Position';
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
proto.event_store.client.streams.ReadReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.streams.ReadReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadReq}
 */
proto.event_store.client.streams.ReadReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq;
  return proto.event_store.client.streams.ReadReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq}
 */
proto.event_store.client.streams.ReadReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.ReadReq.Options;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.streams.ReadReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.ReadReq.Options.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.ReadReq.Options.oneofGroups_ = [[1,2],[5,6],[7,8]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM: 1,
  ALL: 2
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.StreamOptionCase}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.CountOptionCase = {
  COUNT_OPTION_NOT_SET: 0,
  COUNT: 5,
  SUBSCRIPTION: 6
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.CountOptionCase}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getCountOptionCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.CountOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[1]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptionCase = {
  FILTER_OPTION_NOT_SET: 0,
  FILTER: 7,
  NO_FILTER: 8
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.FilterOptionCase}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getFilterOptionCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.FilterOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[2]));
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
proto.event_store.client.streams.ReadReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    stream: (f = msg.getStream()) && proto.event_store.client.streams.ReadReq.Options.StreamOptions.toObject(includeInstance, f),
    all: (f = msg.getAll()) && proto.event_store.client.streams.ReadReq.Options.AllOptions.toObject(includeInstance, f),
    readDirection: jspb.Message.getFieldWithDefault(msg, 3, 0),
    resolveLinks: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    count: jspb.Message.getFieldWithDefault(msg, 5, "0"),
    subscription: (f = msg.getSubscription()) && proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.toObject(includeInstance, f),
    filter: (f = msg.getFilter()) && proto.event_store.client.streams.ReadReq.Options.FilterOptions.toObject(includeInstance, f),
    noFilter: (f = msg.getNoFilter()) && shared_pb.Empty.toObject(includeInstance, f),
    uuidOption: (f = msg.getUuidOption()) && proto.event_store.client.streams.ReadReq.Options.UUIDOption.toObject(includeInstance, f),
    controlOption: (f = msg.getControlOption()) && proto.event_store.client.streams.ReadReq.Options.ControlOption.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadReq.Options}
 */
proto.event_store.client.streams.ReadReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options;
  return proto.event_store.client.streams.ReadReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options}
 */
proto.event_store.client.streams.ReadReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.ReadReq.Options.StreamOptions;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.StreamOptions.deserializeBinaryFromReader);
      msg.setStream(value);
      break;
    case 2:
      var value = new proto.event_store.client.streams.ReadReq.Options.AllOptions;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.AllOptions.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 3:
      var value = /** @type {!proto.event_store.client.streams.ReadReq.Options.ReadDirection} */ (reader.readEnum());
      msg.setReadDirection(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setResolveLinks(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCount(value);
      break;
    case 6:
      var value = new proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.deserializeBinaryFromReader);
      msg.setSubscription(value);
      break;
    case 7:
      var value = new proto.event_store.client.streams.ReadReq.Options.FilterOptions;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.FilterOptions.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    case 8:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoFilter(value);
      break;
    case 9:
      var value = new proto.event_store.client.streams.ReadReq.Options.UUIDOption;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.UUIDOption.deserializeBinaryFromReader);
      msg.setUuidOption(value);
      break;
    case 10:
      var value = new proto.event_store.client.streams.ReadReq.Options.ControlOption;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.ControlOption.deserializeBinaryFromReader);
      msg.setControlOption(value);
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
proto.event_store.client.streams.ReadReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStream();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.ReadReq.Options.StreamOptions.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.streams.ReadReq.Options.AllOptions.serializeBinaryToWriter
    );
  }
  f = message.getReadDirection();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getResolveLinks();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeUint64String(
      5,
      f
    );
  }
  f = message.getSubscription();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.serializeBinaryToWriter
    );
  }
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.event_store.client.streams.ReadReq.Options.FilterOptions.serializeBinaryToWriter
    );
  }
  f = message.getNoFilter();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getUuidOption();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.event_store.client.streams.ReadReq.Options.UUIDOption.serializeBinaryToWriter
    );
  }
  f = message.getControlOption();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.event_store.client.streams.ReadReq.Options.ControlOption.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.ReadDirection = {
  FORWARDS: 0,
  BACKWARDS: 1
};


/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.oneofGroups_ = [[2,3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.RevisionOptionCase = {
  REVISION_OPTION_NOT_SET: 0,
  REVISION: 2,
  START: 3,
  END: 4
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.StreamOptions.RevisionOptionCase}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.getRevisionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.StreamOptions.RevisionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.StreamOptions.oneofGroups_[0]));
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
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.StreamOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    revision: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    start: (f = msg.getStart()) && shared_pb.Empty.toObject(includeInstance, f),
    end: (f = msg.getEnd()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.StreamOptions;
  return proto.event_store.client.streams.ReadReq.Options.StreamOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setRevision(value);
      break;
    case 3:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setStart(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setEnd(value);
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
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.StreamOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64String(
      2,
      f
    );
  }
  f = message.getStart();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getEnd();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.setRevision = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.ReadReq.Options.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.clearRevision = function() {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.ReadReq.Options.StreamOptions.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty start = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.setStart = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.ReadReq.Options.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.clearStart = function() {
  return this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.hasStart = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty end = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.getEnd = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.setEnd = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.ReadReq.Options.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.StreamOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.clearEnd = function() {
  return this.setEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.StreamOptions.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.AllOptionCase = {
  ALL_OPTION_NOT_SET: 0,
  POSITION: 1,
  START: 2,
  END: 3
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.AllOptions.AllOptionCase}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.getAllOptionCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.AllOptions.AllOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.AllOptions.oneofGroups_[0]));
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
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.AllOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.AllOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.client.streams.ReadReq.Options.Position.toObject(includeInstance, f),
    start: (f = msg.getStart()) && shared_pb.Empty.toObject(includeInstance, f),
    end: (f = msg.getEnd()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.AllOptions;
  return proto.event_store.client.streams.ReadReq.Options.AllOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.AllOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.ReadReq.Options.Position;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 2:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setStart(value);
      break;
    case 3:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setEnd(value);
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
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.AllOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.AllOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.ReadReq.Options.Position.serializeBinaryToWriter
    );
  }
  f = message.getStart();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getEnd();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional Position position = 1;
 * @return {?proto.event_store.client.streams.ReadReq.Options.Position}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.getPosition = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.Position, 1));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.Position|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.setPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.ReadReq.Options.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty start = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.setStart = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.ReadReq.Options.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.clearStart = function() {
  return this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.hasStart = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty end = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.getEnd = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.setEnd = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.ReadReq.Options.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.AllOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.clearEnd = function() {
  return this.setEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.AllOptions.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 3) != null;
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
proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions}
 */
proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions;
  return proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions}
 */
proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.event_store.client.streams.ReadReq.Options.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, "0")
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
 * @return {!proto.event_store.client.streams.ReadReq.Options.Position}
 */
proto.event_store.client.streams.ReadReq.Options.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.Position;
  return proto.event_store.client.streams.ReadReq.Options.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.Position}
 */
proto.event_store.client.streams.ReadReq.Options.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setPreparePosition(value);
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
proto.event_store.client.streams.ReadReq.Options.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {string}
 */
proto.event_store.client.streams.ReadReq.Options.Position.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.Position} returns this
 */
proto.event_store.client.streams.ReadReq.Options.Position.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {string}
 */
proto.event_store.client.streams.ReadReq.Options.Position.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.Position} returns this
 */
proto.event_store.client.streams.ReadReq.Options.Position.prototype.setPreparePosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_ = [[1,2],[3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.FilterCase = {
  FILTER_NOT_SET: 0,
  STREAM_IDENTIFIER: 1,
  EVENT_TYPE: 2
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.FilterOptions.FilterCase}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.getFilterCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.FilterOptions.FilterCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.WindowCase = {
  WINDOW_NOT_SET: 0,
  MAX: 3,
  COUNT: 4
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.FilterOptions.WindowCase}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.getWindowCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.FilterOptions.WindowCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_[1]));
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
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.FilterOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.toObject(includeInstance, f),
    eventType: (f = msg.getEventType()) && proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.toObject(includeInstance, f),
    max: jspb.Message.getFieldWithDefault(msg, 3, 0),
    count: (f = msg.getCount()) && shared_pb.Empty.toObject(includeInstance, f),
    checkpointintervalmultiplier: jspb.Message.getFieldWithDefault(msg, 5, 0)
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
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.FilterOptions;
  return proto.event_store.client.streams.ReadReq.Options.FilterOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = new proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression;
      reader.readMessage(value,proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader);
      msg.setEventType(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMax(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setCount(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCheckpointintervalmultiplier(value);
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
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.FilterOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter
    );
  }
  f = message.getEventType();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getCount();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getCheckpointintervalmultiplier();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.repeatedFields_ = [2];



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
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.toObject = function(includeInstance, msg) {
  var f, obj = {
    regex: jspb.Message.getFieldWithDefault(msg, 1, ""),
    prefixList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression;
  return proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRegex(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addPrefix(value);
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
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRegex();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPrefixList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string regex = 1;
 * @return {string}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.getRegex = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.setRegex = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string prefix = 2;
 * @return {!Array<string>}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.getPrefixList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.setPrefixList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.addPrefix = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression.prototype.clearPrefixList = function() {
  return this.setPrefixList([]);
};


/**
 * optional Expression stream_identifier = 1;
 * @return {?proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression, 1));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Expression event_type = 2;
 * @return {?proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.getEventType = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression, 2));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.FilterOptions.Expression|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.setEventType = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.clearEventType = function() {
  return this.setEventType(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.hasEventType = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint32 max = 3;
 * @return {number}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.getMax = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.setMax = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.clearMax = function() {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.hasMax = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty count = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.getCount = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
*/
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.setCount = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.ReadReq.Options.FilterOptions.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.clearCount = function() {
  return this.setCount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.hasCount = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint32 checkpointIntervalMultiplier = 5;
 * @return {number}
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.getCheckpointintervalmultiplier = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.FilterOptions} returns this
 */
proto.event_store.client.streams.ReadReq.Options.FilterOptions.prototype.setCheckpointintervalmultiplier = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.ContentCase = {
  CONTENT_NOT_SET: 0,
  STRUCTURED: 1,
  STRING: 2
};

/**
 * @return {proto.event_store.client.streams.ReadReq.Options.UUIDOption.ContentCase}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.getContentCase = function() {
  return /** @type {proto.event_store.client.streams.ReadReq.Options.UUIDOption.ContentCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadReq.Options.UUIDOption.oneofGroups_[0]));
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
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.UUIDOption.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.UUIDOption} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.toObject = function(includeInstance, msg) {
  var f, obj = {
    structured: (f = msg.getStructured()) && shared_pb.Empty.toObject(includeInstance, f),
    string: (f = msg.getString()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadReq.Options.UUIDOption}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.UUIDOption;
  return proto.event_store.client.streams.ReadReq.Options.UUIDOption.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.UUIDOption} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.UUIDOption}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setStructured(value);
      break;
    case 2:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setString(value);
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
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.UUIDOption.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.UUIDOption} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStructured();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getString();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.Empty structured = 1;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.getStructured = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 1));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.UUIDOption} returns this
*/
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.setStructured = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.ReadReq.Options.UUIDOption.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.UUIDOption} returns this
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.clearStructured = function() {
  return this.setStructured(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.hasStructured = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty string = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.getString = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.UUIDOption} returns this
*/
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.setString = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.ReadReq.Options.UUIDOption.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options.UUIDOption} returns this
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.clearString = function() {
  return this.setString(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.UUIDOption.prototype.hasString = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.event_store.client.streams.ReadReq.Options.ControlOption.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadReq.Options.ControlOption.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadReq.Options.ControlOption} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.ControlOption.toObject = function(includeInstance, msg) {
  var f, obj = {
    compatibility: jspb.Message.getFieldWithDefault(msg, 1, 0)
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
 * @return {!proto.event_store.client.streams.ReadReq.Options.ControlOption}
 */
proto.event_store.client.streams.ReadReq.Options.ControlOption.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadReq.Options.ControlOption;
  return proto.event_store.client.streams.ReadReq.Options.ControlOption.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadReq.Options.ControlOption} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadReq.Options.ControlOption}
 */
proto.event_store.client.streams.ReadReq.Options.ControlOption.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCompatibility(value);
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
proto.event_store.client.streams.ReadReq.Options.ControlOption.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadReq.Options.ControlOption.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadReq.Options.ControlOption} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadReq.Options.ControlOption.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCompatibility();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
};


/**
 * optional uint32 compatibility = 1;
 * @return {number}
 */
proto.event_store.client.streams.ReadReq.Options.ControlOption.prototype.getCompatibility = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.streams.ReadReq.Options.ControlOption} returns this
 */
proto.event_store.client.streams.ReadReq.Options.ControlOption.prototype.setCompatibility = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional StreamOptions stream = 1;
 * @return {?proto.event_store.client.streams.ReadReq.Options.StreamOptions}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getStream = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.StreamOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.StreamOptions, 1));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.StreamOptions|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
*/
proto.event_store.client.streams.ReadReq.Options.prototype.setStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearStream = function() {
  return this.setStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasStream = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional AllOptions all = 2;
 * @return {?proto.event_store.client.streams.ReadReq.Options.AllOptions}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.AllOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.AllOptions, 2));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.AllOptions|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
*/
proto.event_store.client.streams.ReadReq.Options.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ReadDirection read_direction = 3;
 * @return {!proto.event_store.client.streams.ReadReq.Options.ReadDirection}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getReadDirection = function() {
  return /** @type {!proto.event_store.client.streams.ReadReq.Options.ReadDirection} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.event_store.client.streams.ReadReq.Options.ReadDirection} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.setReadDirection = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional bool resolve_links = 4;
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getResolveLinks = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.setResolveLinks = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional uint64 count = 5;
 * @return {string}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getCount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.setCount = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearCount = function() {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasCount = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SubscriptionOptions subscription = 6;
 * @return {?proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getSubscription = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions, 6));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.SubscriptionOptions|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
*/
proto.event_store.client.streams.ReadReq.Options.prototype.setSubscription = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearSubscription = function() {
  return this.setSubscription(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasSubscription = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional FilterOptions filter = 7;
 * @return {?proto.event_store.client.streams.ReadReq.Options.FilterOptions}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getFilter = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.FilterOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.FilterOptions, 7));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.FilterOptions|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
*/
proto.event_store.client.streams.ReadReq.Options.prototype.setFilter = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[2], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional event_store.client.Empty no_filter = 8;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getNoFilter = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 8));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
*/
proto.event_store.client.streams.ReadReq.Options.prototype.setNoFilter = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.event_store.client.streams.ReadReq.Options.oneofGroups_[2], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearNoFilter = function() {
  return this.setNoFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasNoFilter = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional UUIDOption uuid_option = 9;
 * @return {?proto.event_store.client.streams.ReadReq.Options.UUIDOption}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getUuidOption = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.UUIDOption} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.UUIDOption, 9));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.UUIDOption|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
*/
proto.event_store.client.streams.ReadReq.Options.prototype.setUuidOption = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearUuidOption = function() {
  return this.setUuidOption(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasUuidOption = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional ControlOption control_option = 10;
 * @return {?proto.event_store.client.streams.ReadReq.Options.ControlOption}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.getControlOption = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options.ControlOption} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options.ControlOption, 10));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options.ControlOption|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
*/
proto.event_store.client.streams.ReadReq.Options.prototype.setControlOption = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq.Options} returns this
 */
proto.event_store.client.streams.ReadReq.Options.prototype.clearControlOption = function() {
  return this.setControlOption(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.Options.prototype.hasControlOption = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.streams.ReadReq.Options}
 */
proto.event_store.client.streams.ReadReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.streams.ReadReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.streams.ReadReq.Options|undefined} value
 * @return {!proto.event_store.client.streams.ReadReq} returns this
*/
proto.event_store.client.streams.ReadReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadReq} returns this
 */
proto.event_store.client.streams.ReadReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.ReadResp.oneofGroups_ = [[1,2,3,4,5,6,7,8,9]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadResp.ContentCase = {
  CONTENT_NOT_SET: 0,
  EVENT: 1,
  CONFIRMATION: 2,
  CHECKPOINT: 3,
  STREAM_NOT_FOUND: 4,
  FIRST_STREAM_POSITION: 5,
  LAST_STREAM_POSITION: 6,
  LAST_ALL_STREAM_POSITION: 7,
  CAUGHT_UP: 8,
  FELL_BEHIND: 9
};

/**
 * @return {proto.event_store.client.streams.ReadResp.ContentCase}
 */
proto.event_store.client.streams.ReadResp.prototype.getContentCase = function() {
  return /** @type {proto.event_store.client.streams.ReadResp.ContentCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadResp.oneofGroups_[0]));
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
proto.event_store.client.streams.ReadResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    event: (f = msg.getEvent()) && proto.event_store.client.streams.ReadResp.ReadEvent.toObject(includeInstance, f),
    confirmation: (f = msg.getConfirmation()) && proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.toObject(includeInstance, f),
    checkpoint: (f = msg.getCheckpoint()) && proto.event_store.client.streams.ReadResp.Checkpoint.toObject(includeInstance, f),
    streamNotFound: (f = msg.getStreamNotFound()) && proto.event_store.client.streams.ReadResp.StreamNotFound.toObject(includeInstance, f),
    firstStreamPosition: jspb.Message.getFieldWithDefault(msg, 5, "0"),
    lastStreamPosition: jspb.Message.getFieldWithDefault(msg, 6, "0"),
    lastAllStreamPosition: (f = msg.getLastAllStreamPosition()) && shared_pb.AllStreamPosition.toObject(includeInstance, f),
    caughtUp: (f = msg.getCaughtUp()) && proto.event_store.client.streams.ReadResp.CaughtUp.toObject(includeInstance, f),
    fellBehind: (f = msg.getFellBehind()) && proto.event_store.client.streams.ReadResp.FellBehind.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadResp}
 */
proto.event_store.client.streams.ReadResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp;
  return proto.event_store.client.streams.ReadResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp}
 */
proto.event_store.client.streams.ReadResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.ReadResp.ReadEvent;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.ReadEvent.deserializeBinaryFromReader);
      msg.setEvent(value);
      break;
    case 2:
      var value = new proto.event_store.client.streams.ReadResp.SubscriptionConfirmation;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.deserializeBinaryFromReader);
      msg.setConfirmation(value);
      break;
    case 3:
      var value = new proto.event_store.client.streams.ReadResp.Checkpoint;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.Checkpoint.deserializeBinaryFromReader);
      msg.setCheckpoint(value);
      break;
    case 4:
      var value = new proto.event_store.client.streams.ReadResp.StreamNotFound;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.StreamNotFound.deserializeBinaryFromReader);
      msg.setStreamNotFound(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setFirstStreamPosition(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setLastStreamPosition(value);
      break;
    case 7:
      var value = new shared_pb.AllStreamPosition;
      reader.readMessage(value,shared_pb.AllStreamPosition.deserializeBinaryFromReader);
      msg.setLastAllStreamPosition(value);
      break;
    case 8:
      var value = new proto.event_store.client.streams.ReadResp.CaughtUp;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.CaughtUp.deserializeBinaryFromReader);
      msg.setCaughtUp(value);
      break;
    case 9:
      var value = new proto.event_store.client.streams.ReadResp.FellBehind;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.FellBehind.deserializeBinaryFromReader);
      msg.setFellBehind(value);
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
proto.event_store.client.streams.ReadResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvent();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.ReadResp.ReadEvent.serializeBinaryToWriter
    );
  }
  f = message.getConfirmation();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.serializeBinaryToWriter
    );
  }
  f = message.getCheckpoint();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.client.streams.ReadResp.Checkpoint.serializeBinaryToWriter
    );
  }
  f = message.getStreamNotFound();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.client.streams.ReadResp.StreamNotFound.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeUint64String(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeUint64String(
      6,
      f
    );
  }
  f = message.getLastAllStreamPosition();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      shared_pb.AllStreamPosition.serializeBinaryToWriter
    );
  }
  f = message.getCaughtUp();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.event_store.client.streams.ReadResp.CaughtUp.serializeBinaryToWriter
    );
  }
  f = message.getFellBehind();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.event_store.client.streams.ReadResp.FellBehind.serializeBinaryToWriter
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
proto.event_store.client.streams.ReadResp.CaughtUp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.CaughtUp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp.CaughtUp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.CaughtUp.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.event_store.client.streams.ReadResp.CaughtUp}
 */
proto.event_store.client.streams.ReadResp.CaughtUp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp.CaughtUp;
  return proto.event_store.client.streams.ReadResp.CaughtUp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp.CaughtUp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp.CaughtUp}
 */
proto.event_store.client.streams.ReadResp.CaughtUp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.event_store.client.streams.ReadResp.CaughtUp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.CaughtUp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp.CaughtUp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.CaughtUp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.event_store.client.streams.ReadResp.FellBehind.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.FellBehind.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp.FellBehind} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.FellBehind.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.event_store.client.streams.ReadResp.FellBehind}
 */
proto.event_store.client.streams.ReadResp.FellBehind.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp.FellBehind;
  return proto.event_store.client.streams.ReadResp.FellBehind.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp.FellBehind} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp.FellBehind}
 */
proto.event_store.client.streams.ReadResp.FellBehind.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.event_store.client.streams.ReadResp.FellBehind.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.FellBehind.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp.FellBehind} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.FellBehind.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.ReadResp.ReadEvent.oneofGroups_ = [[3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.PositionCase = {
  POSITION_NOT_SET: 0,
  COMMIT_POSITION: 3,
  NO_POSITION: 4
};

/**
 * @return {proto.event_store.client.streams.ReadResp.ReadEvent.PositionCase}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.getPositionCase = function() {
  return /** @type {proto.event_store.client.streams.ReadResp.ReadEvent.PositionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.ReadResp.ReadEvent.oneofGroups_[0]));
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
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.ReadEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp.ReadEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.ReadEvent.toObject = function(includeInstance, msg) {
  var f, obj = {
    event: (f = msg.getEvent()) && proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.toObject(includeInstance, f),
    link: (f = msg.getLink()) && proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.toObject(includeInstance, f),
    commitPosition: jspb.Message.getFieldWithDefault(msg, 3, "0"),
    noPosition: (f = msg.getNoPosition()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp.ReadEvent;
  return proto.event_store.client.streams.ReadResp.ReadEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp.ReadEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader);
      msg.setEvent(value);
      break;
    case 2:
      var value = new proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent;
      reader.readMessage(value,proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader);
      msg.setLink(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCommitPosition(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoPosition(value);
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
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.ReadEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp.ReadEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.ReadEvent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvent();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter
    );
  }
  f = message.getLink();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeUint64String(
      3,
      f
    );
  }
  f = message.getNoPosition();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
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
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && shared_pb.UUID.toObject(includeInstance, f),
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    streamRevision: jspb.Message.getFieldWithDefault(msg, 3, "0"),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 4, "0"),
    commitPosition: jspb.Message.getFieldWithDefault(msg, 5, "0"),
    metadataMap: (f = msg.getMetadataMap()) ? f.toObject(includeInstance, undefined) : [],
    customMetadata: msg.getCustomMetadata_asB64(),
    data: msg.getData_asB64()
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
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent;
  return proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.UUID;
      reader.readMessage(value,shared_pb.UUID.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setStreamRevision(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setPreparePosition(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCommitPosition(value);
      break;
    case 6:
      var value = msg.getMetadataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 7:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCustomMetadata(value);
      break;
    case 8:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
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
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.UUID.serializeBinaryToWriter
    );
  }
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = message.getStreamRevision();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      3,
      f
    );
  }
  f = message.getPreparePosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      4,
      f
    );
  }
  f = message.getCommitPosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      5,
      f
    );
  }
  f = message.getMetadataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(6, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getCustomMetadata_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      7,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      8,
      f
    );
  }
};


/**
 * optional event_store.client.UUID id = 1;
 * @return {?proto.event_store.client.UUID}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getId = function() {
  return /** @type{?proto.event_store.client.UUID} */ (
    jspb.Message.getWrapperField(this, shared_pb.UUID, 1));
};


/**
 * @param {?proto.event_store.client.UUID|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
*/
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 2;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 2));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
*/
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 stream_revision = 3;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getStreamRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setStreamRevision = function(value) {
  return jspb.Message.setProto3StringIntField(this, 3, value);
};


/**
 * optional uint64 prepare_position = 4;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setPreparePosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 4, value);
};


/**
 * optional uint64 commit_position = 5;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 5, value);
};


/**
 * map<string, string> metadata = 6;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.clearMetadataMap = function() {
  this.getMetadataMap().clear();
  return this;};


/**
 * optional bytes custom_metadata = 7;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * optional bytes custom_metadata = 7;
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCustomMetadata()));
};


/**
 * optional bytes custom_metadata = 7;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {!Uint8Array}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCustomMetadata()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setCustomMetadata = function(value) {
  return jspb.Message.setProto3BytesField(this, 7, value);
};


/**
 * optional bytes data = 8;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * optional bytes data = 8;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 8;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 8, value);
};


/**
 * optional RecordedEvent event = 1;
 * @return {?proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.getEvent = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent, 1));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
*/
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.setEvent = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.clearEvent = function() {
  return this.setEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.hasEvent = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional RecordedEvent link = 2;
 * @return {?proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.getLink = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent, 2));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.ReadEvent.RecordedEvent|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
*/
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.setLink = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.clearLink = function() {
  return this.setLink(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.hasLink = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 commit_position = 3;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.setCommitPosition = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.streams.ReadResp.ReadEvent.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.clearCommitPosition = function() {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.streams.ReadResp.ReadEvent.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.hasCommitPosition = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty no_position = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.getNoPosition = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
*/
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.setNoPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.ReadResp.ReadEvent.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.clearNoPosition = function() {
  return this.setNoPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.ReadEvent.prototype.hasNoPosition = function() {
  return jspb.Message.getField(this, 4) != null;
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
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp.SubscriptionConfirmation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscriptionId: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.event_store.client.streams.ReadResp.SubscriptionConfirmation}
 */
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp.SubscriptionConfirmation;
  return proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp.SubscriptionConfirmation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp.SubscriptionConfirmation}
 */
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSubscriptionId(value);
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
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp.SubscriptionConfirmation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscriptionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string subscription_id = 1;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.prototype.getSubscriptionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp.SubscriptionConfirmation} returns this
 */
proto.event_store.client.streams.ReadResp.SubscriptionConfirmation.prototype.setSubscriptionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
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
proto.event_store.client.streams.ReadResp.Checkpoint.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.Checkpoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp.Checkpoint} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.Checkpoint.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, "0")
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
 * @return {!proto.event_store.client.streams.ReadResp.Checkpoint}
 */
proto.event_store.client.streams.ReadResp.Checkpoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp.Checkpoint;
  return proto.event_store.client.streams.ReadResp.Checkpoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp.Checkpoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp.Checkpoint}
 */
proto.event_store.client.streams.ReadResp.Checkpoint.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setPreparePosition(value);
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
proto.event_store.client.streams.ReadResp.Checkpoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.Checkpoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp.Checkpoint} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.Checkpoint.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.Checkpoint.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp.Checkpoint} returns this
 */
proto.event_store.client.streams.ReadResp.Checkpoint.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.Checkpoint.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp.Checkpoint} returns this
 */
proto.event_store.client.streams.ReadResp.Checkpoint.prototype.setPreparePosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
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
proto.event_store.client.streams.ReadResp.StreamNotFound.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.ReadResp.StreamNotFound.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.ReadResp.StreamNotFound} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.StreamNotFound.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.ReadResp.StreamNotFound}
 */
proto.event_store.client.streams.ReadResp.StreamNotFound.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.ReadResp.StreamNotFound;
  return proto.event_store.client.streams.ReadResp.StreamNotFound.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.ReadResp.StreamNotFound} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.ReadResp.StreamNotFound}
 */
proto.event_store.client.streams.ReadResp.StreamNotFound.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
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
proto.event_store.client.streams.ReadResp.StreamNotFound.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.ReadResp.StreamNotFound.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.ReadResp.StreamNotFound} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.ReadResp.StreamNotFound.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.ReadResp.StreamNotFound.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp.StreamNotFound} returns this
*/
proto.event_store.client.streams.ReadResp.StreamNotFound.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp.StreamNotFound} returns this
 */
proto.event_store.client.streams.ReadResp.StreamNotFound.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.StreamNotFound.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ReadEvent event = 1;
 * @return {?proto.event_store.client.streams.ReadResp.ReadEvent}
 */
proto.event_store.client.streams.ReadResp.prototype.getEvent = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.ReadEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.ReadEvent, 1));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.ReadEvent|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
*/
proto.event_store.client.streams.ReadResp.prototype.setEvent = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearEvent = function() {
  return this.setEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasEvent = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional SubscriptionConfirmation confirmation = 2;
 * @return {?proto.event_store.client.streams.ReadResp.SubscriptionConfirmation}
 */
proto.event_store.client.streams.ReadResp.prototype.getConfirmation = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.SubscriptionConfirmation} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.SubscriptionConfirmation, 2));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.SubscriptionConfirmation|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
*/
proto.event_store.client.streams.ReadResp.prototype.setConfirmation = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearConfirmation = function() {
  return this.setConfirmation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasConfirmation = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Checkpoint checkpoint = 3;
 * @return {?proto.event_store.client.streams.ReadResp.Checkpoint}
 */
proto.event_store.client.streams.ReadResp.prototype.getCheckpoint = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.Checkpoint} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.Checkpoint, 3));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.Checkpoint|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
*/
proto.event_store.client.streams.ReadResp.prototype.setCheckpoint = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearCheckpoint = function() {
  return this.setCheckpoint(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasCheckpoint = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional StreamNotFound stream_not_found = 4;
 * @return {?proto.event_store.client.streams.ReadResp.StreamNotFound}
 */
proto.event_store.client.streams.ReadResp.prototype.getStreamNotFound = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.StreamNotFound} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.StreamNotFound, 4));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.StreamNotFound|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
*/
proto.event_store.client.streams.ReadResp.prototype.setStreamNotFound = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearStreamNotFound = function() {
  return this.setStreamNotFound(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasStreamNotFound = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint64 first_stream_position = 5;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.prototype.getFirstStreamPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.setFirstStreamPosition = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearFirstStreamPosition = function() {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.streams.ReadResp.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasFirstStreamPosition = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional uint64 last_stream_position = 6;
 * @return {string}
 */
proto.event_store.client.streams.ReadResp.prototype.getLastStreamPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.setLastStreamPosition = function(value) {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearLastStreamPosition = function() {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.streams.ReadResp.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasLastStreamPosition = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional event_store.client.AllStreamPosition last_all_stream_position = 7;
 * @return {?proto.event_store.client.AllStreamPosition}
 */
proto.event_store.client.streams.ReadResp.prototype.getLastAllStreamPosition = function() {
  return /** @type{?proto.event_store.client.AllStreamPosition} */ (
    jspb.Message.getWrapperField(this, shared_pb.AllStreamPosition, 7));
};


/**
 * @param {?proto.event_store.client.AllStreamPosition|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
*/
proto.event_store.client.streams.ReadResp.prototype.setLastAllStreamPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearLastAllStreamPosition = function() {
  return this.setLastAllStreamPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasLastAllStreamPosition = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional CaughtUp caught_up = 8;
 * @return {?proto.event_store.client.streams.ReadResp.CaughtUp}
 */
proto.event_store.client.streams.ReadResp.prototype.getCaughtUp = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.CaughtUp} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.CaughtUp, 8));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.CaughtUp|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
*/
proto.event_store.client.streams.ReadResp.prototype.setCaughtUp = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearCaughtUp = function() {
  return this.setCaughtUp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasCaughtUp = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional FellBehind fell_behind = 9;
 * @return {?proto.event_store.client.streams.ReadResp.FellBehind}
 */
proto.event_store.client.streams.ReadResp.prototype.getFellBehind = function() {
  return /** @type{?proto.event_store.client.streams.ReadResp.FellBehind} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.ReadResp.FellBehind, 9));
};


/**
 * @param {?proto.event_store.client.streams.ReadResp.FellBehind|undefined} value
 * @return {!proto.event_store.client.streams.ReadResp} returns this
*/
proto.event_store.client.streams.ReadResp.prototype.setFellBehind = function(value) {
  return jspb.Message.setOneofWrapperField(this, 9, proto.event_store.client.streams.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.ReadResp} returns this
 */
proto.event_store.client.streams.ReadResp.prototype.clearFellBehind = function() {
  return this.setFellBehind(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.ReadResp.prototype.hasFellBehind = function() {
  return jspb.Message.getField(this, 9) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.AppendReq.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendReq.ContentCase = {
  CONTENT_NOT_SET: 0,
  OPTIONS: 1,
  PROPOSED_MESSAGE: 2
};

/**
 * @return {proto.event_store.client.streams.AppendReq.ContentCase}
 */
proto.event_store.client.streams.AppendReq.prototype.getContentCase = function() {
  return /** @type {proto.event_store.client.streams.AppendReq.ContentCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendReq.oneofGroups_[0]));
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
proto.event_store.client.streams.AppendReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.AppendReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.AppendReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.streams.AppendReq.Options.toObject(includeInstance, f),
    proposedMessage: (f = msg.getProposedMessage()) && proto.event_store.client.streams.AppendReq.ProposedMessage.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.AppendReq}
 */
proto.event_store.client.streams.AppendReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.AppendReq;
  return proto.event_store.client.streams.AppendReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.AppendReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.AppendReq}
 */
proto.event_store.client.streams.AppendReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.AppendReq.Options;
      reader.readMessage(value,proto.event_store.client.streams.AppendReq.Options.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 2:
      var value = new proto.event_store.client.streams.AppendReq.ProposedMessage;
      reader.readMessage(value,proto.event_store.client.streams.AppendReq.ProposedMessage.deserializeBinaryFromReader);
      msg.setProposedMessage(value);
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
proto.event_store.client.streams.AppendReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.AppendReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.AppendReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.AppendReq.Options.serializeBinaryToWriter
    );
  }
  f = message.getProposedMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.streams.AppendReq.ProposedMessage.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.AppendReq.Options.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendReq.Options.ExpectedStreamRevisionCase = {
  EXPECTED_STREAM_REVISION_NOT_SET: 0,
  REVISION: 2,
  NO_STREAM: 3,
  ANY: 4,
  STREAM_EXISTS: 5
};

/**
 * @return {proto.event_store.client.streams.AppendReq.Options.ExpectedStreamRevisionCase}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.getExpectedStreamRevisionCase = function() {
  return /** @type {proto.event_store.client.streams.AppendReq.Options.ExpectedStreamRevisionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendReq.Options.oneofGroups_[0]));
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
proto.event_store.client.streams.AppendReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.AppendReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.AppendReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    revision: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    noStream: (f = msg.getNoStream()) && shared_pb.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && shared_pb.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.AppendReq.Options}
 */
proto.event_store.client.streams.AppendReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.AppendReq.Options;
  return proto.event_store.client.streams.AppendReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.AppendReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.AppendReq.Options}
 */
proto.event_store.client.streams.AppendReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setRevision(value);
      break;
    case 3:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 5:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setStreamExists(value);
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
proto.event_store.client.streams.AppendReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.AppendReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.AppendReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64String(
      2,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
*/
proto.event_store.client.streams.AppendReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
 */
proto.event_store.client.streams.AppendReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
 */
proto.event_store.client.streams.AppendReq.Options.prototype.setRevision = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
 */
proto.event_store.client.streams.AppendReq.Options.prototype.clearRevision = function() {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.AppendReq.Options.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty no_stream = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
*/
proto.event_store.client.streams.AppendReq.Options.prototype.setNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
 */
proto.event_store.client.streams.AppendReq.Options.prototype.clearNoStream = function() {
  return this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty any = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.getAny = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
*/
proto.event_store.client.streams.AppendReq.Options.prototype.setAny = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
 */
proto.event_store.client.streams.AppendReq.Options.prototype.clearAny = function() {
  return this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.hasAny = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional event_store.client.Empty stream_exists = 5;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.getStreamExists = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 5));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
*/
proto.event_store.client.streams.AppendReq.Options.prototype.setStreamExists = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq.Options} returns this
 */
proto.event_store.client.streams.AppendReq.Options.prototype.clearStreamExists = function() {
  return this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.Options.prototype.hasStreamExists = function() {
  return jspb.Message.getField(this, 5) != null;
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
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.AppendReq.ProposedMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.AppendReq.ProposedMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && shared_pb.UUID.toObject(includeInstance, f),
    metadataMap: (f = msg.getMetadataMap()) ? f.toObject(includeInstance, undefined) : [],
    customMetadata: msg.getCustomMetadata_asB64(),
    data: msg.getData_asB64()
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
 * @return {!proto.event_store.client.streams.AppendReq.ProposedMessage}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.AppendReq.ProposedMessage;
  return proto.event_store.client.streams.AppendReq.ProposedMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.AppendReq.ProposedMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.AppendReq.ProposedMessage}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.UUID;
      reader.readMessage(value,shared_pb.UUID.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = msg.getMetadataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCustomMetadata(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
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
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.AppendReq.ProposedMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.AppendReq.ProposedMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.UUID.serializeBinaryToWriter
    );
  }
  f = message.getMetadataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getCustomMetadata_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * optional event_store.client.UUID id = 1;
 * @return {?proto.event_store.client.UUID}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getId = function() {
  return /** @type{?proto.event_store.client.UUID} */ (
    jspb.Message.getWrapperField(this, shared_pb.UUID, 1));
};


/**
 * @param {?proto.event_store.client.UUID|undefined} value
 * @return {!proto.event_store.client.streams.AppendReq.ProposedMessage} returns this
*/
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * map<string, string> metadata = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.event_store.client.streams.AppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.clearMetadataMap = function() {
  this.getMetadataMap().clear();
  return this;};


/**
 * optional bytes custom_metadata = 3;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getCustomMetadata = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes custom_metadata = 3;
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {string}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getCustomMetadata_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCustomMetadata()));
};


/**
 * optional bytes custom_metadata = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {!Uint8Array}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getCustomMetadata_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCustomMetadata()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.streams.AppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.setCustomMetadata = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional bytes data = 4;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes data = 4;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.streams.AppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.AppendReq.ProposedMessage.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.streams.AppendReq.Options}
 */
proto.event_store.client.streams.AppendReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.streams.AppendReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.AppendReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.streams.AppendReq.Options|undefined} value
 * @return {!proto.event_store.client.streams.AppendReq} returns this
*/
proto.event_store.client.streams.AppendReq.prototype.setOptions = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.AppendReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq} returns this
 */
proto.event_store.client.streams.AppendReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ProposedMessage proposed_message = 2;
 * @return {?proto.event_store.client.streams.AppendReq.ProposedMessage}
 */
proto.event_store.client.streams.AppendReq.prototype.getProposedMessage = function() {
  return /** @type{?proto.event_store.client.streams.AppendReq.ProposedMessage} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.AppendReq.ProposedMessage, 2));
};


/**
 * @param {?proto.event_store.client.streams.AppendReq.ProposedMessage|undefined} value
 * @return {!proto.event_store.client.streams.AppendReq} returns this
*/
proto.event_store.client.streams.AppendReq.prototype.setProposedMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.AppendReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendReq} returns this
 */
proto.event_store.client.streams.AppendReq.prototype.clearProposedMessage = function() {
  return this.setProposedMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendReq.prototype.hasProposedMessage = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.AppendResp.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendResp.ResultCase = {
  RESULT_NOT_SET: 0,
  SUCCESS: 1,
  WRONG_EXPECTED_VERSION: 2
};

/**
 * @return {proto.event_store.client.streams.AppendResp.ResultCase}
 */
proto.event_store.client.streams.AppendResp.prototype.getResultCase = function() {
  return /** @type {proto.event_store.client.streams.AppendResp.ResultCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendResp.oneofGroups_[0]));
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
proto.event_store.client.streams.AppendResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.AppendResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.AppendResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: (f = msg.getSuccess()) && proto.event_store.client.streams.AppendResp.Success.toObject(includeInstance, f),
    wrongExpectedVersion: (f = msg.getWrongExpectedVersion()) && proto.event_store.client.streams.AppendResp.WrongExpectedVersion.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.AppendResp}
 */
proto.event_store.client.streams.AppendResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.AppendResp;
  return proto.event_store.client.streams.AppendResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.AppendResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.AppendResp}
 */
proto.event_store.client.streams.AppendResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.AppendResp.Success;
      reader.readMessage(value,proto.event_store.client.streams.AppendResp.Success.deserializeBinaryFromReader);
      msg.setSuccess(value);
      break;
    case 2:
      var value = new proto.event_store.client.streams.AppendResp.WrongExpectedVersion;
      reader.readMessage(value,proto.event_store.client.streams.AppendResp.WrongExpectedVersion.deserializeBinaryFromReader);
      msg.setWrongExpectedVersion(value);
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
proto.event_store.client.streams.AppendResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.AppendResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.AppendResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.AppendResp.Success.serializeBinaryToWriter
    );
  }
  f = message.getWrongExpectedVersion();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.streams.AppendResp.WrongExpectedVersion.serializeBinaryToWriter
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
proto.event_store.client.streams.AppendResp.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.AppendResp.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.AppendResp.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, "0")
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
 * @return {!proto.event_store.client.streams.AppendResp.Position}
 */
proto.event_store.client.streams.AppendResp.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.AppendResp.Position;
  return proto.event_store.client.streams.AppendResp.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.AppendResp.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.AppendResp.Position}
 */
proto.event_store.client.streams.AppendResp.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setPreparePosition(value);
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
proto.event_store.client.streams.AppendResp.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.AppendResp.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.AppendResp.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {string}
 */
proto.event_store.client.streams.AppendResp.Position.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.AppendResp.Position} returns this
 */
proto.event_store.client.streams.AppendResp.Position.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {string}
 */
proto.event_store.client.streams.AppendResp.Position.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.AppendResp.Position} returns this
 */
proto.event_store.client.streams.AppendResp.Position.prototype.setPreparePosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.AppendResp.Success.oneofGroups_ = [[1,2],[3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendResp.Success.CurrentRevisionOptionCase = {
  CURRENT_REVISION_OPTION_NOT_SET: 0,
  CURRENT_REVISION: 1,
  NO_STREAM: 2
};

/**
 * @return {proto.event_store.client.streams.AppendResp.Success.CurrentRevisionOptionCase}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.getCurrentRevisionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.AppendResp.Success.CurrentRevisionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendResp.Success.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendResp.Success.PositionOptionCase = {
  POSITION_OPTION_NOT_SET: 0,
  POSITION: 3,
  NO_POSITION: 4
};

/**
 * @return {proto.event_store.client.streams.AppendResp.Success.PositionOptionCase}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.getPositionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.AppendResp.Success.PositionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendResp.Success.oneofGroups_[1]));
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
proto.event_store.client.streams.AppendResp.Success.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.AppendResp.Success.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.AppendResp.Success} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.Success.toObject = function(includeInstance, msg) {
  var f, obj = {
    currentRevision: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    noStream: (f = msg.getNoStream()) && shared_pb.Empty.toObject(includeInstance, f),
    position: (f = msg.getPosition()) && proto.event_store.client.streams.AppendResp.Position.toObject(includeInstance, f),
    noPosition: (f = msg.getNoPosition()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.AppendResp.Success}
 */
proto.event_store.client.streams.AppendResp.Success.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.AppendResp.Success;
  return proto.event_store.client.streams.AppendResp.Success.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.AppendResp.Success} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.AppendResp.Success}
 */
proto.event_store.client.streams.AppendResp.Success.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCurrentRevision(value);
      break;
    case 2:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 3:
      var value = new proto.event_store.client.streams.AppendResp.Position;
      reader.readMessage(value,proto.event_store.client.streams.AppendResp.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoPosition(value);
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
proto.event_store.client.streams.AppendResp.Success.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.AppendResp.Success.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.AppendResp.Success} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.Success.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.client.streams.AppendResp.Position.serializeBinaryToWriter
    );
  }
  f = message.getNoPosition();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 current_revision = 1;
 * @return {string}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.getCurrentRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
 */
proto.event_store.client.streams.AppendResp.Success.prototype.setCurrentRevision = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.event_store.client.streams.AppendResp.Success.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
 */
proto.event_store.client.streams.AppendResp.Success.prototype.clearCurrentRevision = function() {
  return jspb.Message.setOneofField(this, 1, proto.event_store.client.streams.AppendResp.Success.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.hasCurrentRevision = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty no_stream = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
*/
proto.event_store.client.streams.AppendResp.Success.prototype.setNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.AppendResp.Success.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
 */
proto.event_store.client.streams.AppendResp.Success.prototype.clearNoStream = function() {
  return this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Position position = 3;
 * @return {?proto.event_store.client.streams.AppendResp.Position}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.getPosition = function() {
  return /** @type{?proto.event_store.client.streams.AppendResp.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.AppendResp.Position, 3));
};


/**
 * @param {?proto.event_store.client.streams.AppendResp.Position|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
*/
proto.event_store.client.streams.AppendResp.Success.prototype.setPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.AppendResp.Success.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
 */
proto.event_store.client.streams.AppendResp.Success.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty no_position = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.getNoPosition = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
*/
proto.event_store.client.streams.AppendResp.Success.prototype.setNoPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.AppendResp.Success.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.Success} returns this
 */
proto.event_store.client.streams.AppendResp.Success.prototype.clearNoPosition = function() {
  return this.setNoPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.Success.prototype.hasNoPosition = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_ = [[1,2],[3,4,5],[6,7],[8,9,10,11]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOption2060Case = {
  CURRENT_REVISION_OPTION_20_6_0_NOT_SET: 0,
  CURRENT_REVISION_20_6_0: 1,
  NO_STREAM_20_6_0: 2
};

/**
 * @return {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOption2060Case}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getCurrentRevisionOption2060Case = function() {
  return /** @type {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOption2060Case} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOption2060Case = {
  EXPECTED_REVISION_OPTION_20_6_0_NOT_SET: 0,
  EXPECTED_REVISION_20_6_0: 3,
  ANY_20_6_0: 4,
  STREAM_EXISTS_20_6_0: 5
};

/**
 * @return {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOption2060Case}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getExpectedRevisionOption2060Case = function() {
  return /** @type {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOption2060Case} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[1]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOptionCase = {
  CURRENT_REVISION_OPTION_NOT_SET: 0,
  CURRENT_REVISION: 6,
  CURRENT_NO_STREAM: 7
};

/**
 * @return {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOptionCase}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getCurrentRevisionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.CurrentRevisionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[2]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOptionCase = {
  EXPECTED_REVISION_OPTION_NOT_SET: 0,
  EXPECTED_REVISION: 8,
  EXPECTED_ANY: 9,
  EXPECTED_STREAM_EXISTS: 10,
  EXPECTED_NO_STREAM: 11
};

/**
 * @return {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOptionCase}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getExpectedRevisionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.AppendResp.WrongExpectedVersion.ExpectedRevisionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[3]));
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
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.AppendResp.WrongExpectedVersion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.toObject = function(includeInstance, msg) {
  var f, obj = {
    currentRevision2060: jspb.Message.getFieldWithDefault(msg, 1, 0),
    noStream2060: (f = msg.getNoStream2060()) && shared_pb.Empty.toObject(includeInstance, f),
    expectedRevision2060: jspb.Message.getFieldWithDefault(msg, 3, 0),
    any2060: (f = msg.getAny2060()) && shared_pb.Empty.toObject(includeInstance, f),
    streamExists2060: (f = msg.getStreamExists2060()) && shared_pb.Empty.toObject(includeInstance, f),
    currentRevision: jspb.Message.getFieldWithDefault(msg, 6, "0"),
    currentNoStream: (f = msg.getCurrentNoStream()) && shared_pb.Empty.toObject(includeInstance, f),
    expectedRevision: jspb.Message.getFieldWithDefault(msg, 8, "0"),
    expectedAny: (f = msg.getExpectedAny()) && shared_pb.Empty.toObject(includeInstance, f),
    expectedStreamExists: (f = msg.getExpectedStreamExists()) && shared_pb.Empty.toObject(includeInstance, f),
    expectedNoStream: (f = msg.getExpectedNoStream()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.AppendResp.WrongExpectedVersion;
  return proto.event_store.client.streams.AppendResp.WrongExpectedVersion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCurrentRevision2060(value);
      break;
    case 2:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream2060(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setExpectedRevision2060(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAny2060(value);
      break;
    case 5:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setStreamExists2060(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCurrentRevision(value);
      break;
    case 7:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setCurrentNoStream(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setExpectedRevision(value);
      break;
    case 9:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setExpectedAny(value);
      break;
    case 10:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setExpectedStreamExists(value);
      break;
    case 11:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setExpectedNoStream(value);
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
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.AppendResp.WrongExpectedVersion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getNoStream2060();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getAny2060();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists2060();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeUint64String(
      6,
      f
    );
  }
  f = message.getCurrentNoStream();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeUint64String(
      8,
      f
    );
  }
  f = message.getExpectedAny();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getExpectedStreamExists();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getExpectedNoStream();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 current_revision_20_6_0 = 1;
 * @return {number}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getCurrentRevision2060 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setCurrentRevision2060 = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearCurrentRevision2060 = function() {
  return jspb.Message.setOneofField(this, 1, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasCurrentRevision2060 = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty no_stream_20_6_0 = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getNoStream2060 = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
*/
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setNoStream2060 = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearNoStream2060 = function() {
  return this.setNoStream2060(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasNoStream2060 = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 expected_revision_20_6_0 = 3;
 * @return {number}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getExpectedRevision2060 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setExpectedRevision2060 = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearExpectedRevision2060 = function() {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasExpectedRevision2060 = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty any_20_6_0 = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getAny2060 = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
*/
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setAny2060 = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearAny2060 = function() {
  return this.setAny2060(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasAny2060 = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional event_store.client.Empty stream_exists_20_6_0 = 5;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getStreamExists2060 = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 5));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
*/
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setStreamExists2060 = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearStreamExists2060 = function() {
  return this.setStreamExists2060(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasStreamExists2060 = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional uint64 current_revision = 6;
 * @return {string}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getCurrentRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setCurrentRevision = function(value) {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[2], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearCurrentRevision = function() {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[2], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasCurrentRevision = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional event_store.client.Empty current_no_stream = 7;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getCurrentNoStream = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 7));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
*/
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setCurrentNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[2], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearCurrentNoStream = function() {
  return this.setCurrentNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasCurrentNoStream = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional uint64 expected_revision = 8;
 * @return {string}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getExpectedRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setExpectedRevision = function(value) {
  return jspb.Message.setOneofField(this, 8, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[3], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearExpectedRevision = function() {
  return jspb.Message.setOneofField(this, 8, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[3], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasExpectedRevision = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional event_store.client.Empty expected_any = 9;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getExpectedAny = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 9));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
*/
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setExpectedAny = function(value) {
  return jspb.Message.setOneofWrapperField(this, 9, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[3], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearExpectedAny = function() {
  return this.setExpectedAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasExpectedAny = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional event_store.client.Empty expected_stream_exists = 10;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getExpectedStreamExists = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 10));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
*/
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setExpectedStreamExists = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[3], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearExpectedStreamExists = function() {
  return this.setExpectedStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasExpectedStreamExists = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional event_store.client.Empty expected_no_stream = 11;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.getExpectedNoStream = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 11));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
*/
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.setExpectedNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.event_store.client.streams.AppendResp.WrongExpectedVersion.oneofGroups_[3], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp.WrongExpectedVersion} returns this
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.clearExpectedNoStream = function() {
  return this.setExpectedNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.WrongExpectedVersion.prototype.hasExpectedNoStream = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional Success success = 1;
 * @return {?proto.event_store.client.streams.AppendResp.Success}
 */
proto.event_store.client.streams.AppendResp.prototype.getSuccess = function() {
  return /** @type{?proto.event_store.client.streams.AppendResp.Success} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.AppendResp.Success, 1));
};


/**
 * @param {?proto.event_store.client.streams.AppendResp.Success|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp} returns this
*/
proto.event_store.client.streams.AppendResp.prototype.setSuccess = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.AppendResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp} returns this
 */
proto.event_store.client.streams.AppendResp.prototype.clearSuccess = function() {
  return this.setSuccess(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.prototype.hasSuccess = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional WrongExpectedVersion wrong_expected_version = 2;
 * @return {?proto.event_store.client.streams.AppendResp.WrongExpectedVersion}
 */
proto.event_store.client.streams.AppendResp.prototype.getWrongExpectedVersion = function() {
  return /** @type{?proto.event_store.client.streams.AppendResp.WrongExpectedVersion} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.AppendResp.WrongExpectedVersion, 2));
};


/**
 * @param {?proto.event_store.client.streams.AppendResp.WrongExpectedVersion|undefined} value
 * @return {!proto.event_store.client.streams.AppendResp} returns this
*/
proto.event_store.client.streams.AppendResp.prototype.setWrongExpectedVersion = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.AppendResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.AppendResp} returns this
 */
proto.event_store.client.streams.AppendResp.prototype.clearWrongExpectedVersion = function() {
  return this.setWrongExpectedVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.AppendResp.prototype.hasWrongExpectedVersion = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.client.streams.BatchAppendReq.repeatedFields_ = [3];



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
proto.event_store.client.streams.BatchAppendReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.BatchAppendReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.BatchAppendReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    correlationId: (f = msg.getCorrelationId()) && shared_pb.UUID.toObject(includeInstance, f),
    options: (f = msg.getOptions()) && proto.event_store.client.streams.BatchAppendReq.Options.toObject(includeInstance, f),
    proposedMessagesList: jspb.Message.toObjectList(msg.getProposedMessagesList(),
    proto.event_store.client.streams.BatchAppendReq.ProposedMessage.toObject, includeInstance),
    isFinal: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.event_store.client.streams.BatchAppendReq}
 */
proto.event_store.client.streams.BatchAppendReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.BatchAppendReq;
  return proto.event_store.client.streams.BatchAppendReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.BatchAppendReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.BatchAppendReq}
 */
proto.event_store.client.streams.BatchAppendReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.UUID;
      reader.readMessage(value,shared_pb.UUID.deserializeBinaryFromReader);
      msg.setCorrelationId(value);
      break;
    case 2:
      var value = new proto.event_store.client.streams.BatchAppendReq.Options;
      reader.readMessage(value,proto.event_store.client.streams.BatchAppendReq.Options.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 3:
      var value = new proto.event_store.client.streams.BatchAppendReq.ProposedMessage;
      reader.readMessage(value,proto.event_store.client.streams.BatchAppendReq.ProposedMessage.deserializeBinaryFromReader);
      msg.addProposedMessages(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsFinal(value);
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
proto.event_store.client.streams.BatchAppendReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.BatchAppendReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.BatchAppendReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCorrelationId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.UUID.serializeBinaryToWriter
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.streams.BatchAppendReq.Options.serializeBinaryToWriter
    );
  }
  f = message.getProposedMessagesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.event_store.client.streams.BatchAppendReq.ProposedMessage.serializeBinaryToWriter
    );
  }
  f = message.getIsFinal();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.BatchAppendReq.Options.ExpectedStreamPositionCase = {
  EXPECTED_STREAM_POSITION_NOT_SET: 0,
  STREAM_POSITION: 2,
  NO_STREAM: 3,
  ANY: 4,
  STREAM_EXISTS: 5
};

/**
 * @return {proto.event_store.client.streams.BatchAppendReq.Options.ExpectedStreamPositionCase}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.getExpectedStreamPositionCase = function() {
  return /** @type {proto.event_store.client.streams.BatchAppendReq.Options.ExpectedStreamPositionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_[0]));
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
proto.event_store.client.streams.BatchAppendReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.BatchAppendReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.BatchAppendReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    streamPosition: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    noStream: (f = msg.getNoStream()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f),
    deadline: (f = msg.getDeadline()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options}
 */
proto.event_store.client.streams.BatchAppendReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.BatchAppendReq.Options;
  return proto.event_store.client.streams.BatchAppendReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.BatchAppendReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options}
 */
proto.event_store.client.streams.BatchAppendReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setStreamPosition(value);
      break;
    case 3:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 4:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 5:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setStreamExists(value);
      break;
    case 6:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setDeadline(value);
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
proto.event_store.client.streams.BatchAppendReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.BatchAppendReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.BatchAppendReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64String(
      2,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getDeadline();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
*/
proto.event_store.client.streams.BatchAppendReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 stream_position = 2;
 * @return {string}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.getStreamPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.setStreamPosition = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.clearStreamPosition = function() {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.hasStreamPosition = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.Empty no_stream = 3;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.getNoStream = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 3));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
*/
proto.event_store.client.streams.BatchAppendReq.Options.prototype.setNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.clearNoStream = function() {
  return this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Empty any = 4;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.getAny = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 4));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
*/
proto.event_store.client.streams.BatchAppendReq.Options.prototype.setAny = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.clearAny = function() {
  return this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.hasAny = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.Empty stream_exists = 5;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.getStreamExists = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 5));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
*/
proto.event_store.client.streams.BatchAppendReq.Options.prototype.setStreamExists = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.streams.BatchAppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.clearStreamExists = function() {
  return this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.hasStreamExists = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.Timestamp deadline = 6;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.getDeadline = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 6));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
*/
proto.event_store.client.streams.BatchAppendReq.Options.prototype.setDeadline = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq.Options} returns this
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.clearDeadline = function() {
  return this.setDeadline(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.Options.prototype.hasDeadline = function() {
  return jspb.Message.getField(this, 6) != null;
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
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.BatchAppendReq.ProposedMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && shared_pb.UUID.toObject(includeInstance, f),
    metadataMap: (f = msg.getMetadataMap()) ? f.toObject(includeInstance, undefined) : [],
    customMetadata: msg.getCustomMetadata_asB64(),
    data: msg.getData_asB64()
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
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.BatchAppendReq.ProposedMessage;
  return proto.event_store.client.streams.BatchAppendReq.ProposedMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.UUID;
      reader.readMessage(value,shared_pb.UUID.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = msg.getMetadataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCustomMetadata(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
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
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.BatchAppendReq.ProposedMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.UUID.serializeBinaryToWriter
    );
  }
  f = message.getMetadataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
  f = message.getCustomMetadata_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * optional event_store.client.UUID id = 1;
 * @return {?proto.event_store.client.UUID}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getId = function() {
  return /** @type{?proto.event_store.client.UUID} */ (
    jspb.Message.getWrapperField(this, shared_pb.UUID, 1));
};


/**
 * @param {?proto.event_store.client.UUID|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} returns this
*/
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * map<string, string> metadata = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.clearMetadataMap = function() {
  this.getMetadataMap().clear();
  return this;};


/**
 * optional bytes custom_metadata = 3;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getCustomMetadata = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes custom_metadata = 3;
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {string}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getCustomMetadata_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCustomMetadata()));
};


/**
 * optional bytes custom_metadata = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {!Uint8Array}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getCustomMetadata_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCustomMetadata()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.setCustomMetadata = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional bytes data = 4;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes data = 4;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage} returns this
 */
proto.event_store.client.streams.BatchAppendReq.ProposedMessage.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional event_store.client.UUID correlation_id = 1;
 * @return {?proto.event_store.client.UUID}
 */
proto.event_store.client.streams.BatchAppendReq.prototype.getCorrelationId = function() {
  return /** @type{?proto.event_store.client.UUID} */ (
    jspb.Message.getWrapperField(this, shared_pb.UUID, 1));
};


/**
 * @param {?proto.event_store.client.UUID|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq} returns this
*/
proto.event_store.client.streams.BatchAppendReq.prototype.setCorrelationId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq} returns this
 */
proto.event_store.client.streams.BatchAppendReq.prototype.clearCorrelationId = function() {
  return this.setCorrelationId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.prototype.hasCorrelationId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Options options = 2;
 * @return {?proto.event_store.client.streams.BatchAppendReq.Options}
 */
proto.event_store.client.streams.BatchAppendReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.streams.BatchAppendReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.BatchAppendReq.Options, 2));
};


/**
 * @param {?proto.event_store.client.streams.BatchAppendReq.Options|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendReq} returns this
*/
proto.event_store.client.streams.BatchAppendReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendReq} returns this
 */
proto.event_store.client.streams.BatchAppendReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated ProposedMessage proposed_messages = 3;
 * @return {!Array<!proto.event_store.client.streams.BatchAppendReq.ProposedMessage>}
 */
proto.event_store.client.streams.BatchAppendReq.prototype.getProposedMessagesList = function() {
  return /** @type{!Array<!proto.event_store.client.streams.BatchAppendReq.ProposedMessage>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.event_store.client.streams.BatchAppendReq.ProposedMessage, 3));
};


/**
 * @param {!Array<!proto.event_store.client.streams.BatchAppendReq.ProposedMessage>} value
 * @return {!proto.event_store.client.streams.BatchAppendReq} returns this
*/
proto.event_store.client.streams.BatchAppendReq.prototype.setProposedMessagesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage=} opt_value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.streams.BatchAppendReq.ProposedMessage}
 */
proto.event_store.client.streams.BatchAppendReq.prototype.addProposedMessages = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.event_store.client.streams.BatchAppendReq.ProposedMessage, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.streams.BatchAppendReq} returns this
 */
proto.event_store.client.streams.BatchAppendReq.prototype.clearProposedMessagesList = function() {
  return this.setProposedMessagesList([]);
};


/**
 * optional bool is_final = 4;
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendReq.prototype.getIsFinal = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.streams.BatchAppendReq} returns this
 */
proto.event_store.client.streams.BatchAppendReq.prototype.setIsFinal = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.BatchAppendResp.oneofGroups_ = [[2,3],[5,6,7,8]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.BatchAppendResp.ResultCase = {
  RESULT_NOT_SET: 0,
  ERROR: 2,
  SUCCESS: 3
};

/**
 * @return {proto.event_store.client.streams.BatchAppendResp.ResultCase}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getResultCase = function() {
  return /** @type {proto.event_store.client.streams.BatchAppendResp.ResultCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.BatchAppendResp.ExpectedStreamPositionCase = {
  EXPECTED_STREAM_POSITION_NOT_SET: 0,
  STREAM_POSITION: 5,
  NO_STREAM: 6,
  ANY: 7,
  STREAM_EXISTS: 8
};

/**
 * @return {proto.event_store.client.streams.BatchAppendResp.ExpectedStreamPositionCase}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getExpectedStreamPositionCase = function() {
  return /** @type {proto.event_store.client.streams.BatchAppendResp.ExpectedStreamPositionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[1]));
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
proto.event_store.client.streams.BatchAppendResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.BatchAppendResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.BatchAppendResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    correlationId: (f = msg.getCorrelationId()) && shared_pb.UUID.toObject(includeInstance, f),
    error: (f = msg.getError()) && status_pb.Status.toObject(includeInstance, f),
    success: (f = msg.getSuccess()) && proto.event_store.client.streams.BatchAppendResp.Success.toObject(includeInstance, f),
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    streamPosition: jspb.Message.getFieldWithDefault(msg, 5, "0"),
    noStream: (f = msg.getNoStream()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.BatchAppendResp}
 */
proto.event_store.client.streams.BatchAppendResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.BatchAppendResp;
  return proto.event_store.client.streams.BatchAppendResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.BatchAppendResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.BatchAppendResp}
 */
proto.event_store.client.streams.BatchAppendResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.UUID;
      reader.readMessage(value,shared_pb.UUID.deserializeBinaryFromReader);
      msg.setCorrelationId(value);
      break;
    case 2:
      var value = new status_pb.Status;
      reader.readMessage(value,status_pb.Status.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    case 3:
      var value = new proto.event_store.client.streams.BatchAppendResp.Success;
      reader.readMessage(value,proto.event_store.client.streams.BatchAppendResp.Success.deserializeBinaryFromReader);
      msg.setSuccess(value);
      break;
    case 4:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setStreamPosition(value);
      break;
    case 6:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 7:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 8:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setStreamExists(value);
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
proto.event_store.client.streams.BatchAppendResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.BatchAppendResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.BatchAppendResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCorrelationId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.UUID.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      status_pb.Status.serializeBinaryToWriter
    );
  }
  f = message.getSuccess();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.client.streams.BatchAppendResp.Success.serializeBinaryToWriter
    );
  }
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeUint64String(
      5,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_ = [[1,2],[3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.BatchAppendResp.Success.CurrentRevisionOptionCase = {
  CURRENT_REVISION_OPTION_NOT_SET: 0,
  CURRENT_REVISION: 1,
  NO_STREAM: 2
};

/**
 * @return {proto.event_store.client.streams.BatchAppendResp.Success.CurrentRevisionOptionCase}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.getCurrentRevisionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.BatchAppendResp.Success.CurrentRevisionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.streams.BatchAppendResp.Success.PositionOptionCase = {
  POSITION_OPTION_NOT_SET: 0,
  POSITION: 3,
  NO_POSITION: 4
};

/**
 * @return {proto.event_store.client.streams.BatchAppendResp.Success.PositionOptionCase}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.getPositionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.BatchAppendResp.Success.PositionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_[1]));
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
proto.event_store.client.streams.BatchAppendResp.Success.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.BatchAppendResp.Success.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.BatchAppendResp.Success} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendResp.Success.toObject = function(includeInstance, msg) {
  var f, obj = {
    currentRevision: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    noStream: (f = msg.getNoStream()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f),
    position: (f = msg.getPosition()) && shared_pb.AllStreamPosition.toObject(includeInstance, f),
    noPosition: (f = msg.getNoPosition()) && google_protobuf_empty_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success}
 */
proto.event_store.client.streams.BatchAppendResp.Success.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.BatchAppendResp.Success;
  return proto.event_store.client.streams.BatchAppendResp.Success.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.BatchAppendResp.Success} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success}
 */
proto.event_store.client.streams.BatchAppendResp.Success.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCurrentRevision(value);
      break;
    case 2:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 3:
      var value = new shared_pb.AllStreamPosition;
      reader.readMessage(value,shared_pb.AllStreamPosition.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 4:
      var value = new google_protobuf_empty_pb.Empty;
      reader.readMessage(value,google_protobuf_empty_pb.Empty.deserializeBinaryFromReader);
      msg.setNoPosition(value);
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
proto.event_store.client.streams.BatchAppendResp.Success.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.BatchAppendResp.Success.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.BatchAppendResp.Success} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.BatchAppendResp.Success.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.AllStreamPosition.serializeBinaryToWriter
    );
  }
  f = message.getNoPosition();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_empty_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 current_revision = 1;
 * @return {string}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.getCurrentRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.setCurrentRevision = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.clearCurrentRevision = function() {
  return jspb.Message.setOneofField(this, 1, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.hasCurrentRevision = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.Empty no_stream = 2;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.getNoStream = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 2));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
*/
proto.event_store.client.streams.BatchAppendResp.Success.prototype.setNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.clearNoStream = function() {
  return this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.AllStreamPosition position = 3;
 * @return {?proto.event_store.client.AllStreamPosition}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.getPosition = function() {
  return /** @type{?proto.event_store.client.AllStreamPosition} */ (
    jspb.Message.getWrapperField(this, shared_pb.AllStreamPosition, 3));
};


/**
 * @param {?proto.event_store.client.AllStreamPosition|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
*/
proto.event_store.client.streams.BatchAppendResp.Success.prototype.setPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Empty no_position = 4;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.getNoPosition = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 4));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
*/
proto.event_store.client.streams.BatchAppendResp.Success.prototype.setNoPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.BatchAppendResp.Success.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp.Success} returns this
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.clearNoPosition = function() {
  return this.setNoPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.Success.prototype.hasNoPosition = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional event_store.client.UUID correlation_id = 1;
 * @return {?proto.event_store.client.UUID}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getCorrelationId = function() {
  return /** @type{?proto.event_store.client.UUID} */ (
    jspb.Message.getWrapperField(this, shared_pb.UUID, 1));
};


/**
 * @param {?proto.event_store.client.UUID|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
*/
proto.event_store.client.streams.BatchAppendResp.prototype.setCorrelationId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearCorrelationId = function() {
  return this.setCorrelationId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasCorrelationId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.rpc.Status error = 2;
 * @return {?proto.google.rpc.Status}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getError = function() {
  return /** @type{?proto.google.rpc.Status} */ (
    jspb.Message.getWrapperField(this, status_pb.Status, 2));
};


/**
 * @param {?proto.google.rpc.Status|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
*/
proto.event_store.client.streams.BatchAppendResp.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Success success = 3;
 * @return {?proto.event_store.client.streams.BatchAppendResp.Success}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getSuccess = function() {
  return /** @type{?proto.event_store.client.streams.BatchAppendResp.Success} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.BatchAppendResp.Success, 3));
};


/**
 * @param {?proto.event_store.client.streams.BatchAppendResp.Success|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
*/
proto.event_store.client.streams.BatchAppendResp.prototype.setSuccess = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearSuccess = function() {
  return this.setSuccess(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasSuccess = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 4;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 4));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
*/
proto.event_store.client.streams.BatchAppendResp.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint64 stream_position = 5;
 * @return {string}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getStreamPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.setStreamPosition = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearStreamPosition = function() {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasStreamPosition = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.Empty no_stream = 6;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getNoStream = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 6));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
*/
proto.event_store.client.streams.BatchAppendResp.prototype.setNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearNoStream = function() {
  return this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.Empty any = 7;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getAny = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 7));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
*/
proto.event_store.client.streams.BatchAppendResp.prototype.setAny = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearAny = function() {
  return this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasAny = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional google.protobuf.Empty stream_exists = 8;
 * @return {?proto.google.protobuf.Empty}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.getStreamExists = function() {
  return /** @type{?proto.google.protobuf.Empty} */ (
    jspb.Message.getWrapperField(this, google_protobuf_empty_pb.Empty, 8));
};


/**
 * @param {?proto.google.protobuf.Empty|undefined} value
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
*/
proto.event_store.client.streams.BatchAppendResp.prototype.setStreamExists = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.event_store.client.streams.BatchAppendResp.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.BatchAppendResp} returns this
 */
proto.event_store.client.streams.BatchAppendResp.prototype.clearStreamExists = function() {
  return this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.BatchAppendResp.prototype.hasStreamExists = function() {
  return jspb.Message.getField(this, 8) != null;
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
proto.event_store.client.streams.DeleteReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.DeleteReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.DeleteReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.streams.DeleteReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.DeleteReq}
 */
proto.event_store.client.streams.DeleteReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.DeleteReq;
  return proto.event_store.client.streams.DeleteReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.DeleteReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.DeleteReq}
 */
proto.event_store.client.streams.DeleteReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.DeleteReq.Options;
      reader.readMessage(value,proto.event_store.client.streams.DeleteReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.streams.DeleteReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.DeleteReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.DeleteReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.DeleteReq.Options.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.DeleteReq.Options.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.DeleteReq.Options.ExpectedStreamRevisionCase = {
  EXPECTED_STREAM_REVISION_NOT_SET: 0,
  REVISION: 2,
  NO_STREAM: 3,
  ANY: 4,
  STREAM_EXISTS: 5
};

/**
 * @return {proto.event_store.client.streams.DeleteReq.Options.ExpectedStreamRevisionCase}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.getExpectedStreamRevisionCase = function() {
  return /** @type {proto.event_store.client.streams.DeleteReq.Options.ExpectedStreamRevisionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.DeleteReq.Options.oneofGroups_[0]));
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
proto.event_store.client.streams.DeleteReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.DeleteReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.DeleteReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    revision: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    noStream: (f = msg.getNoStream()) && shared_pb.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && shared_pb.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.DeleteReq.Options}
 */
proto.event_store.client.streams.DeleteReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.DeleteReq.Options;
  return proto.event_store.client.streams.DeleteReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.DeleteReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.DeleteReq.Options}
 */
proto.event_store.client.streams.DeleteReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setRevision(value);
      break;
    case 3:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 5:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setStreamExists(value);
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
proto.event_store.client.streams.DeleteReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.DeleteReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.DeleteReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64String(
      2,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
*/
proto.event_store.client.streams.DeleteReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.setRevision = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.clearRevision = function() {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.DeleteReq.Options.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty no_stream = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
*/
proto.event_store.client.streams.DeleteReq.Options.prototype.setNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.clearNoStream = function() {
  return this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty any = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.getAny = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
*/
proto.event_store.client.streams.DeleteReq.Options.prototype.setAny = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.clearAny = function() {
  return this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.hasAny = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional event_store.client.Empty stream_exists = 5;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.getStreamExists = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 5));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
*/
proto.event_store.client.streams.DeleteReq.Options.prototype.setStreamExists = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteReq.Options} returns this
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.clearStreamExists = function() {
  return this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteReq.Options.prototype.hasStreamExists = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.streams.DeleteReq.Options}
 */
proto.event_store.client.streams.DeleteReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.streams.DeleteReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.DeleteReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.streams.DeleteReq.Options|undefined} value
 * @return {!proto.event_store.client.streams.DeleteReq} returns this
*/
proto.event_store.client.streams.DeleteReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteReq} returns this
 */
proto.event_store.client.streams.DeleteReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.DeleteResp.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.DeleteResp.PositionOptionCase = {
  POSITION_OPTION_NOT_SET: 0,
  POSITION: 1,
  NO_POSITION: 2
};

/**
 * @return {proto.event_store.client.streams.DeleteResp.PositionOptionCase}
 */
proto.event_store.client.streams.DeleteResp.prototype.getPositionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.DeleteResp.PositionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.DeleteResp.oneofGroups_[0]));
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
proto.event_store.client.streams.DeleteResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.DeleteResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.DeleteResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.client.streams.DeleteResp.Position.toObject(includeInstance, f),
    noPosition: (f = msg.getNoPosition()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.DeleteResp}
 */
proto.event_store.client.streams.DeleteResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.DeleteResp;
  return proto.event_store.client.streams.DeleteResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.DeleteResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.DeleteResp}
 */
proto.event_store.client.streams.DeleteResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.DeleteResp.Position;
      reader.readMessage(value,proto.event_store.client.streams.DeleteResp.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 2:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoPosition(value);
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
proto.event_store.client.streams.DeleteResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.DeleteResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.DeleteResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.DeleteResp.Position.serializeBinaryToWriter
    );
  }
  f = message.getNoPosition();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
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
proto.event_store.client.streams.DeleteResp.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.DeleteResp.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.DeleteResp.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteResp.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, "0")
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
 * @return {!proto.event_store.client.streams.DeleteResp.Position}
 */
proto.event_store.client.streams.DeleteResp.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.DeleteResp.Position;
  return proto.event_store.client.streams.DeleteResp.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.DeleteResp.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.DeleteResp.Position}
 */
proto.event_store.client.streams.DeleteResp.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setPreparePosition(value);
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
proto.event_store.client.streams.DeleteResp.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.DeleteResp.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.DeleteResp.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.DeleteResp.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {string}
 */
proto.event_store.client.streams.DeleteResp.Position.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.DeleteResp.Position} returns this
 */
proto.event_store.client.streams.DeleteResp.Position.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {string}
 */
proto.event_store.client.streams.DeleteResp.Position.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.DeleteResp.Position} returns this
 */
proto.event_store.client.streams.DeleteResp.Position.prototype.setPreparePosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
};


/**
 * optional Position position = 1;
 * @return {?proto.event_store.client.streams.DeleteResp.Position}
 */
proto.event_store.client.streams.DeleteResp.prototype.getPosition = function() {
  return /** @type{?proto.event_store.client.streams.DeleteResp.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.DeleteResp.Position, 1));
};


/**
 * @param {?proto.event_store.client.streams.DeleteResp.Position|undefined} value
 * @return {!proto.event_store.client.streams.DeleteResp} returns this
*/
proto.event_store.client.streams.DeleteResp.prototype.setPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.DeleteResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteResp} returns this
 */
proto.event_store.client.streams.DeleteResp.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteResp.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty no_position = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.DeleteResp.prototype.getNoPosition = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.DeleteResp} returns this
*/
proto.event_store.client.streams.DeleteResp.prototype.setNoPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.DeleteResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.DeleteResp} returns this
 */
proto.event_store.client.streams.DeleteResp.prototype.clearNoPosition = function() {
  return this.setNoPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.DeleteResp.prototype.hasNoPosition = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.event_store.client.streams.TombstoneReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.TombstoneReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.TombstoneReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.streams.TombstoneReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.TombstoneReq}
 */
proto.event_store.client.streams.TombstoneReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.TombstoneReq;
  return proto.event_store.client.streams.TombstoneReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.TombstoneReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.TombstoneReq}
 */
proto.event_store.client.streams.TombstoneReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.TombstoneReq.Options;
      reader.readMessage(value,proto.event_store.client.streams.TombstoneReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.streams.TombstoneReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.TombstoneReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.TombstoneReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.TombstoneReq.Options.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.TombstoneReq.Options.ExpectedStreamRevisionCase = {
  EXPECTED_STREAM_REVISION_NOT_SET: 0,
  REVISION: 2,
  NO_STREAM: 3,
  ANY: 4,
  STREAM_EXISTS: 5
};

/**
 * @return {proto.event_store.client.streams.TombstoneReq.Options.ExpectedStreamRevisionCase}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.getExpectedStreamRevisionCase = function() {
  return /** @type {proto.event_store.client.streams.TombstoneReq.Options.ExpectedStreamRevisionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_[0]));
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
proto.event_store.client.streams.TombstoneReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.TombstoneReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.TombstoneReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    revision: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    noStream: (f = msg.getNoStream()) && shared_pb.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && shared_pb.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.TombstoneReq.Options}
 */
proto.event_store.client.streams.TombstoneReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.TombstoneReq.Options;
  return proto.event_store.client.streams.TombstoneReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.TombstoneReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.TombstoneReq.Options}
 */
proto.event_store.client.streams.TombstoneReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setRevision(value);
      break;
    case 3:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 4:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 5:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setStreamExists(value);
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
proto.event_store.client.streams.TombstoneReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.TombstoneReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.TombstoneReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64String(
      2,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
*/
proto.event_store.client.streams.TombstoneReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.setRevision = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.clearRevision = function() {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty no_stream = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
*/
proto.event_store.client.streams.TombstoneReq.Options.prototype.setNoStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.clearNoStream = function() {
  return this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty any = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.getAny = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
*/
proto.event_store.client.streams.TombstoneReq.Options.prototype.setAny = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.clearAny = function() {
  return this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.hasAny = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional event_store.client.Empty stream_exists = 5;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.getStreamExists = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 5));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
*/
proto.event_store.client.streams.TombstoneReq.Options.prototype.setStreamExists = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneReq.Options} returns this
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.clearStreamExists = function() {
  return this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneReq.Options.prototype.hasStreamExists = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.streams.TombstoneReq.Options}
 */
proto.event_store.client.streams.TombstoneReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.streams.TombstoneReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.TombstoneReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.streams.TombstoneReq.Options|undefined} value
 * @return {!proto.event_store.client.streams.TombstoneReq} returns this
*/
proto.event_store.client.streams.TombstoneReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneReq} returns this
 */
proto.event_store.client.streams.TombstoneReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.streams.TombstoneResp.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.streams.TombstoneResp.PositionOptionCase = {
  POSITION_OPTION_NOT_SET: 0,
  POSITION: 1,
  NO_POSITION: 2
};

/**
 * @return {proto.event_store.client.streams.TombstoneResp.PositionOptionCase}
 */
proto.event_store.client.streams.TombstoneResp.prototype.getPositionOptionCase = function() {
  return /** @type {proto.event_store.client.streams.TombstoneResp.PositionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.streams.TombstoneResp.oneofGroups_[0]));
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
proto.event_store.client.streams.TombstoneResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.TombstoneResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.TombstoneResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.client.streams.TombstoneResp.Position.toObject(includeInstance, f),
    noPosition: (f = msg.getNoPosition()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.streams.TombstoneResp}
 */
proto.event_store.client.streams.TombstoneResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.TombstoneResp;
  return proto.event_store.client.streams.TombstoneResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.TombstoneResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.TombstoneResp}
 */
proto.event_store.client.streams.TombstoneResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.streams.TombstoneResp.Position;
      reader.readMessage(value,proto.event_store.client.streams.TombstoneResp.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 2:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoPosition(value);
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
proto.event_store.client.streams.TombstoneResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.TombstoneResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.TombstoneResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.streams.TombstoneResp.Position.serializeBinaryToWriter
    );
  }
  f = message.getNoPosition();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
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
proto.event_store.client.streams.TombstoneResp.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.streams.TombstoneResp.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.streams.TombstoneResp.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneResp.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, "0")
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
 * @return {!proto.event_store.client.streams.TombstoneResp.Position}
 */
proto.event_store.client.streams.TombstoneResp.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.streams.TombstoneResp.Position;
  return proto.event_store.client.streams.TombstoneResp.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.streams.TombstoneResp.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.streams.TombstoneResp.Position}
 */
proto.event_store.client.streams.TombstoneResp.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setPreparePosition(value);
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
proto.event_store.client.streams.TombstoneResp.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.streams.TombstoneResp.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.streams.TombstoneResp.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.streams.TombstoneResp.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {string}
 */
proto.event_store.client.streams.TombstoneResp.Position.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.TombstoneResp.Position} returns this
 */
proto.event_store.client.streams.TombstoneResp.Position.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {string}
 */
proto.event_store.client.streams.TombstoneResp.Position.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.streams.TombstoneResp.Position} returns this
 */
proto.event_store.client.streams.TombstoneResp.Position.prototype.setPreparePosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
};


/**
 * optional Position position = 1;
 * @return {?proto.event_store.client.streams.TombstoneResp.Position}
 */
proto.event_store.client.streams.TombstoneResp.prototype.getPosition = function() {
  return /** @type{?proto.event_store.client.streams.TombstoneResp.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.streams.TombstoneResp.Position, 1));
};


/**
 * @param {?proto.event_store.client.streams.TombstoneResp.Position|undefined} value
 * @return {!proto.event_store.client.streams.TombstoneResp} returns this
*/
proto.event_store.client.streams.TombstoneResp.prototype.setPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.streams.TombstoneResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneResp} returns this
 */
proto.event_store.client.streams.TombstoneResp.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneResp.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty no_position = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.streams.TombstoneResp.prototype.getNoPosition = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.streams.TombstoneResp} returns this
*/
proto.event_store.client.streams.TombstoneResp.prototype.setNoPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.streams.TombstoneResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.streams.TombstoneResp} returns this
 */
proto.event_store.client.streams.TombstoneResp.prototype.clearNoPosition = function() {
  return this.setNoPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.streams.TombstoneResp.prototype.hasNoPosition = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.event_store.client.streams);
