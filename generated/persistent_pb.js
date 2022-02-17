// source: persistent.proto
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
var global = Function('return this')();

var shared_pb = require('./shared_pb.js');
goog.object.extend(proto, shared_pb);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.AllOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.FilterCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.WindowCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.ConsumerStrategy', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.Options.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.Position', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.Settings', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.Settings.CheckpointAfterCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.Settings.MessageTimeoutCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.RevisionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.CreateResp', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.DeleteReq', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.DeleteReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.DeleteReq.Options.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.DeleteResp', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.GetInfoReq', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.GetInfoReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.GetInfoResp', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ListReq', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ListReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ListReq.Options.ListOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ListReq.StreamOption', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ListResp', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.Ack', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.ContentCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.Nack', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.Nack.Action', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.Options.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.ContentCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadResp', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadResp.ContentCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.CountCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.PositionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReplayParkedReq', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StopAtOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.ReplayParkedResp', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.SubscriptionInfo', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.AllOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.ConsumerStrategy', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.Options', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.Options.StreamOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.Position', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.Settings', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.CheckpointAfterCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.MessageTimeoutCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.RevisionOptionCase', null, global);
goog.exportSymbol('proto.event_store.client.persistent_subscriptions.UpdateResp', null, global);
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
proto.event_store.client.persistent_subscriptions.ReadReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ReadReq.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadReq.displayName = 'proto.event_store.client.persistent_subscriptions.ReadReq';
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ReadReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadReq.Options.displayName = 'proto.event_store.client.persistent_subscriptions.ReadReq.Options';
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.displayName = 'proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption';
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
proto.event_store.client.persistent_subscriptions.ReadReq.Ack = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.persistent_subscriptions.ReadReq.Ack.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadReq.Ack, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadReq.Ack.displayName = 'proto.event_store.client.persistent_subscriptions.ReadReq.Ack';
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
proto.event_store.client.persistent_subscriptions.ReadReq.Nack = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.persistent_subscriptions.ReadReq.Nack.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadReq.Nack, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadReq.Nack.displayName = 'proto.event_store.client.persistent_subscriptions.ReadReq.Nack';
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
proto.event_store.client.persistent_subscriptions.ReadResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ReadResp.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadResp.displayName = 'proto.event_store.client.persistent_subscriptions.ReadResp';
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.displayName = 'proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent';
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.displayName = 'proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent';
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
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.displayName = 'proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation';
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
proto.event_store.client.persistent_subscriptions.CreateReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq';
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
proto.event_store.client.persistent_subscriptions.CreateReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.CreateReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.Options.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq.Options';
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
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions';
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions';
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions';
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression';
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
proto.event_store.client.persistent_subscriptions.CreateReq.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.Position.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq.Position';
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
proto.event_store.client.persistent_subscriptions.CreateReq.Settings = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateReq.Settings, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateReq.Settings.displayName = 'proto.event_store.client.persistent_subscriptions.CreateReq.Settings';
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
proto.event_store.client.persistent_subscriptions.CreateResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.CreateResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.CreateResp.displayName = 'proto.event_store.client.persistent_subscriptions.CreateResp';
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
proto.event_store.client.persistent_subscriptions.UpdateReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.UpdateReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.UpdateReq.displayName = 'proto.event_store.client.persistent_subscriptions.UpdateReq';
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.UpdateReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.UpdateReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.UpdateReq.Options.displayName = 'proto.event_store.client.persistent_subscriptions.UpdateReq.Options';
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
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.displayName = 'proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions';
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
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.displayName = 'proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions';
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.UpdateReq.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.UpdateReq.Position.displayName = 'proto.event_store.client.persistent_subscriptions.UpdateReq.Position';
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.UpdateReq.Settings, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.displayName = 'proto.event_store.client.persistent_subscriptions.UpdateReq.Settings';
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
proto.event_store.client.persistent_subscriptions.UpdateResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.UpdateResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.UpdateResp.displayName = 'proto.event_store.client.persistent_subscriptions.UpdateResp';
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
proto.event_store.client.persistent_subscriptions.DeleteReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.DeleteReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.DeleteReq.displayName = 'proto.event_store.client.persistent_subscriptions.DeleteReq';
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
proto.event_store.client.persistent_subscriptions.DeleteReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.DeleteReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.DeleteReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.DeleteReq.Options.displayName = 'proto.event_store.client.persistent_subscriptions.DeleteReq.Options';
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
proto.event_store.client.persistent_subscriptions.DeleteResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.DeleteResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.DeleteResp.displayName = 'proto.event_store.client.persistent_subscriptions.DeleteResp';
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
proto.event_store.client.persistent_subscriptions.GetInfoReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.GetInfoReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.GetInfoReq.displayName = 'proto.event_store.client.persistent_subscriptions.GetInfoReq';
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
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.GetInfoReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.displayName = 'proto.event_store.client.persistent_subscriptions.GetInfoReq.Options';
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
proto.event_store.client.persistent_subscriptions.GetInfoResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.GetInfoResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.GetInfoResp.displayName = 'proto.event_store.client.persistent_subscriptions.GetInfoResp';
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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.persistent_subscriptions.SubscriptionInfo.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.SubscriptionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.SubscriptionInfo.displayName = 'proto.event_store.client.persistent_subscriptions.SubscriptionInfo';
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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.displayName = 'proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo';
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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.displayName = 'proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement';
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
proto.event_store.client.persistent_subscriptions.ReplayParkedReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReplayParkedReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReplayParkedReq.displayName = 'proto.event_store.client.persistent_subscriptions.ReplayParkedReq';
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
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.displayName = 'proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options';
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
proto.event_store.client.persistent_subscriptions.ReplayParkedResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ReplayParkedResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ReplayParkedResp.displayName = 'proto.event_store.client.persistent_subscriptions.ReplayParkedResp';
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
proto.event_store.client.persistent_subscriptions.ListReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ListReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ListReq.displayName = 'proto.event_store.client.persistent_subscriptions.ListReq';
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
proto.event_store.client.persistent_subscriptions.ListReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ListReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ListReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ListReq.Options.displayName = 'proto.event_store.client.persistent_subscriptions.ListReq.Options';
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
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.oneofGroups_);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ListReq.StreamOption, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.displayName = 'proto.event_store.client.persistent_subscriptions.ListReq.StreamOption';
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
proto.event_store.client.persistent_subscriptions.ListResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.client.persistent_subscriptions.ListResp.repeatedFields_, null);
};
goog.inherits(proto.event_store.client.persistent_subscriptions.ListResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.client.persistent_subscriptions.ListResp.displayName = 'proto.event_store.client.persistent_subscriptions.ListResp';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.ReadReq.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.ContentCase = {
  CONTENT_NOT_SET: 0,
  OPTIONS: 1,
  ACK: 2,
  NACK: 3
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReadReq.ContentCase}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.getContentCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReadReq.ContentCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReadReq.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.persistent_subscriptions.ReadReq.Options.toObject(includeInstance, f),
    ack: (f = msg.getAck()) && proto.event_store.client.persistent_subscriptions.ReadReq.Ack.toObject(includeInstance, f),
    nack: (f = msg.getNack()) && proto.event_store.client.persistent_subscriptions.ReadReq.Nack.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadReq;
  return proto.event_store.client.persistent_subscriptions.ReadReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.ReadReq.Options;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadReq.Options.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 2:
      var value = new proto.event_store.client.persistent_subscriptions.ReadReq.Ack;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadReq.Ack.deserializeBinaryFromReader);
      msg.setAck(value);
      break;
    case 3:
      var value = new proto.event_store.client.persistent_subscriptions.ReadReq.Nack;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadReq.Nack.deserializeBinaryFromReader);
      msg.setNack(value);
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
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.ReadReq.Options.serializeBinaryToWriter
    );
  }
  f = message.getAck();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.persistent_subscriptions.ReadReq.Ack.serializeBinaryToWriter
    );
  }
  f = message.getNack();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.client.persistent_subscriptions.ReadReq.Nack.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.oneofGroups_ = [[1,5]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM_IDENTIFIER: 1,
  ALL: 5
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReadReq.Options.StreamOptionCase}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReadReq.Options.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReadReq.Options.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    all: (f = msg.getAll()) && shared_pb.Empty.toObject(includeInstance, f),
    groupName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    bufferSize: jspb.Message.getFieldWithDefault(msg, 3, 0),
    uuidOption: (f = msg.getUuidOption()) && proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadReq.Options;
  return proto.event_store.client.persistent_subscriptions.ReadReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.deserializeBinaryFromReader = function(msg, reader) {
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
    case 5:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupName(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBufferSize(value);
      break;
    case 4:
      var value = new proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.deserializeBinaryFromReader);
      msg.setUuidOption(value);
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getGroupName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getUuidOption();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.ContentCase = {
  CONTENT_NOT_SET: 0,
  STRUCTURED: 1,
  STRING: 2
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.ContentCase}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.getContentCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.ContentCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption;
  return proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.getStructured = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 1));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.setStructured = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.clearStructured = function() {
  return this.setStructured(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.hasStructured = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty string = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.getString = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.setString = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.clearString = function() {
  return this.setString(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption.prototype.hasString = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.ReadReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty all = 5;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 5));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.persistent_subscriptions.ReadReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string group_name = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.getGroupName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.setGroupName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 buffer_size = 3;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.getBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.setBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional UUIDOption uuid_option = 4;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.getUuidOption = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption, 4));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadReq.Options.UUIDOption|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.setUuidOption = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.clearUuidOption = function() {
  return this.setUuidOption(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Options.prototype.hasUuidOption = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.repeatedFields_ = [2];



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
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadReq.Ack.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: msg.getId_asB64(),
    idsList: jspb.Message.toObjectList(msg.getIdsList(),
    shared_pb.UUID.toObject, includeInstance)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadReq.Ack;
  return proto.event_store.client.persistent_subscriptions.ReadReq.Ack.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setId(value);
      break;
    case 2:
      var value = new shared_pb.UUID;
      reader.readMessage(value,shared_pb.UUID.deserializeBinaryFromReader);
      msg.addIds(value);
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
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadReq.Ack.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      shared_pb.UUID.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.getId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes id = 1;
 * This is a type-conversion wrapper around `getId()`
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.getId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getId()));
};


/**
 * optional bytes id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getId()`
 * @return {!Uint8Array}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.getId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.setId = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated event_store.client.UUID ids = 2;
 * @return {!Array<!proto.event_store.client.UUID>}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.getIdsList = function() {
  return /** @type{!Array<!proto.event_store.client.UUID>} */ (
    jspb.Message.getRepeatedWrapperField(this, shared_pb.UUID, 2));
};


/**
 * @param {!Array<!proto.event_store.client.UUID>} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.setIdsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.event_store.client.UUID=} opt_value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.UUID}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.addIds = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.event_store.client.UUID, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Ack} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Ack.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.repeatedFields_ = [2];



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
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadReq.Nack.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: msg.getId_asB64(),
    idsList: jspb.Message.toObjectList(msg.getIdsList(),
    shared_pb.UUID.toObject, includeInstance),
    action: jspb.Message.getFieldWithDefault(msg, 3, 0),
    reason: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadReq.Nack;
  return proto.event_store.client.persistent_subscriptions.ReadReq.Nack.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setId(value);
      break;
    case 2:
      var value = new shared_pb.UUID;
      reader.readMessage(value,shared_pb.UUID.deserializeBinaryFromReader);
      msg.addIds(value);
      break;
    case 3:
      var value = /** @type {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack.Action} */ (reader.readEnum());
      msg.setAction(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setReason(value);
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
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadReq.Nack.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      shared_pb.UUID.serializeBinaryToWriter
    );
  }
  f = message.getAction();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getReason();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.Action = {
  UNKNOWN: 0,
  PARK: 1,
  RETRY: 2,
  SKIP: 3,
  STOP: 4
};

/**
 * optional bytes id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.getId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes id = 1;
 * This is a type-conversion wrapper around `getId()`
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.getId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getId()));
};


/**
 * optional bytes id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getId()`
 * @return {!Uint8Array}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.getId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.setId = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated event_store.client.UUID ids = 2;
 * @return {!Array<!proto.event_store.client.UUID>}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.getIdsList = function() {
  return /** @type{!Array<!proto.event_store.client.UUID>} */ (
    jspb.Message.getRepeatedWrapperField(this, shared_pb.UUID, 2));
};


/**
 * @param {!Array<!proto.event_store.client.UUID>} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.setIdsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.event_store.client.UUID=} opt_value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.UUID}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.addIds = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.event_store.client.UUID, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};


/**
 * optional Action action = 3;
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack.Action}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.getAction = function() {
  return /** @type {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack.Action} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack.Action} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.setAction = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional string reason = 4;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.getReason = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq.Nack} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.Nack.prototype.setReason = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadReq.Options|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.setOptions = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.ReadReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Ack ack = 2;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadReq.Ack}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.getAck = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadReq.Ack} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadReq.Ack, 2));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadReq.Ack|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.setAck = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.ReadReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.clearAck = function() {
  return this.setAck(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.hasAck = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Nack nack = 3;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadReq.Nack}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.getNack = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadReq.Nack} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadReq.Nack, 3));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadReq.Nack|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.setNack = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.persistent_subscriptions.ReadReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadReq} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.clearNack = function() {
  return this.setNack(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadReq.prototype.hasNack = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.ReadResp.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ContentCase = {
  CONTENT_NOT_SET: 0,
  EVENT: 1,
  SUBSCRIPTION_CONFIRMATION: 2
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReadResp.ContentCase}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.getContentCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReadResp.ContentCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReadResp.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    event: (f = msg.getEvent()) && proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.toObject(includeInstance, f),
    subscriptionConfirmation: (f = msg.getSubscriptionConfirmation()) && proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadResp;
  return proto.event_store.client.persistent_subscriptions.ReadResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.deserializeBinaryFromReader);
      msg.setEvent(value);
      break;
    case 2:
      var value = new proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.deserializeBinaryFromReader);
      msg.setSubscriptionConfirmation(value);
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
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvent();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.serializeBinaryToWriter
    );
  }
  f = message.getSubscriptionConfirmation();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_ = [[3,4],[5,6]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.PositionCase = {
  POSITION_NOT_SET: 0,
  COMMIT_POSITION: 3,
  NO_POSITION: 4
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.PositionCase}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getPositionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.PositionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.CountCase = {
  COUNT_NOT_SET: 0,
  RETRY_COUNT: 5,
  NO_RETRY_COUNT: 6
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.CountCase}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getCountCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.CountCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[1]));
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.toObject = function(includeInstance, msg) {
  var f, obj = {
    event: (f = msg.getEvent()) && proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.toObject(includeInstance, f),
    link: (f = msg.getLink()) && proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.toObject(includeInstance, f),
    commitPosition: jspb.Message.getFieldWithDefault(msg, 3, "0"),
    noPosition: (f = msg.getNoPosition()) && shared_pb.Empty.toObject(includeInstance, f),
    retryCount: jspb.Message.getFieldWithDefault(msg, 5, 0),
    noRetryCount: (f = msg.getNoRetryCount()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent;
  return proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader);
      msg.setEvent(value);
      break;
    case 2:
      var value = new proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader);
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
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setRetryCount(value);
      break;
    case 6:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoRetryCount(value);
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvent();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter
    );
  }
  f = message.getLink();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter
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
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getNoRetryCount();
  if (f != null) {
    writer.writeMessage(
      6,
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent;
  return proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getId = function() {
  return /** @type{?proto.event_store.client.UUID} */ (
    jspb.Message.getWrapperField(this, shared_pb.UUID, 1));
};


/**
 * @param {?proto.event_store.client.UUID|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 2;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 2));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 stream_revision = 3;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getStreamRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.setStreamRevision = function(value) {
  return jspb.Message.setProto3StringIntField(this, 3, value);
};


/**
 * optional uint64 prepare_position = 4;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.setPreparePosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 4, value);
};


/**
 * optional uint64 commit_position = 5;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 5, value);
};


/**
 * map<string, string> metadata = 6;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.clearMetadataMap = function() {
  this.getMetadataMap().clear();
  return this;};


/**
 * optional bytes custom_metadata = 7;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * optional bytes custom_metadata = 7;
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata_asB64 = function() {
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCustomMetadata()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.setCustomMetadata = function(value) {
  return jspb.Message.setProto3BytesField(this, 7, value);
};


/**
 * optional bytes data = 8;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * optional bytes data = 8;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getData_asB64 = function() {
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
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 8, value);
};


/**
 * optional RecordedEvent event = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getEvent = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.setEvent = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.clearEvent = function() {
  return this.setEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.hasEvent = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional RecordedEvent link = 2;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getLink = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent, 2));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.RecordedEvent|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.setLink = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.clearLink = function() {
  return this.setLink(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.hasLink = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 commit_position = 3;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.setCommitPosition = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.clearCommitPosition = function() {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.hasCommitPosition = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty no_position = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getNoPosition = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.setNoPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.clearNoPosition = function() {
  return this.setNoPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.hasNoPosition = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int32 retry_count = 5;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getRetryCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.setRetryCount = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.clearRetryCount = function() {
  return jspb.Message.setOneofField(this, 5, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.hasRetryCount = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional event_store.client.Empty no_retry_count = 6;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.getNoRetryCount = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 6));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.setNoRetryCount = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.clearNoRetryCount = function() {
  return this.setNoRetryCount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent.prototype.hasNoRetryCount = function() {
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
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation;
  return proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.prototype.getSubscriptionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation.prototype.setSubscriptionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional ReadEvent event = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.getEvent = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadResp.ReadEvent|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.setEvent = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.clearEvent = function() {
  return this.setEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.hasEvent = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional SubscriptionConfirmation subscription_confirmation = 2;
 * @return {?proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.getSubscriptionConfirmation = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation, 2));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReadResp.SubscriptionConfirmation|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp} returns this
*/
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.setSubscriptionConfirmation = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.ReadResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReadResp} returns this
 */
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.clearSubscriptionConfirmation = function() {
  return this.setSubscriptionConfirmation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReadResp.prototype.hasSubscriptionConfirmation = function() {
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
proto.event_store.client.persistent_subscriptions.CreateReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.persistent_subscriptions.CreateReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq;
  return proto.event_store.client.persistent_subscriptions.CreateReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.Options;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.CreateReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.Options.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.ConsumerStrategy = {
  DISPATCHTOSINGLE: 0,
  ROUNDROBIN: 1,
  PINNED: 2
};


/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.oneofGroups_ = [[4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM: 4,
  ALL: 5
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.Options.StreamOptionCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.Options.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.Options.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    stream: (f = msg.getStream()) && proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.toObject(includeInstance, f),
    all: (f = msg.getAll()) && proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.toObject(includeInstance, f),
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    groupName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    settings: (f = msg.getSettings()) && proto.event_store.client.persistent_subscriptions.CreateReq.Settings.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq.Options;
  return proto.event_store.client.persistent_subscriptions.CreateReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 4:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.deserializeBinaryFromReader);
      msg.setStream(value);
      break;
    case 5:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupName(value);
      break;
    case 3:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.Settings;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.Settings.deserializeBinaryFromReader);
      msg.setSettings(value);
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
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStream();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.serializeBinaryToWriter
    );
  }
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = message.getGroupName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSettings();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.Settings.serializeBinaryToWriter
    );
  }
};


/**
 * optional StreamOptions stream = 4;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.getStream = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions, 4));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.setStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.persistent_subscriptions.CreateReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.clearStream = function() {
  return this.setStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.hasStream = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional AllOptions all = 5;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions, 5));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.persistent_subscriptions.CreateReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string group_name = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.getGroupName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.setGroupName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Settings settings = 3;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.Settings}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.getSettings = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.Settings} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.Settings, 3));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.Settings|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.setSettings = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.clearSettings = function() {
  return this.setSettings(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Options.prototype.hasSettings = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.oneofGroups_ = [[2,3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.RevisionOptionCase = {
  REVISION_OPTION_NOT_SET: 0,
  REVISION: 2,
  START: 3,
  END: 4
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.RevisionOptionCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.getRevisionOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.RevisionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions;
  return proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.setRevision = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.clearRevision = function() {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty start = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.setStart = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.clearStart = function() {
  return this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.hasStart = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty end = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.getEnd = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.setEnd = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.clearEnd = function() {
  return this.setEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.StreamOptions.prototype.hasEnd = function() {
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_ = [[1,2,3],[4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.AllOptionCase = {
  ALL_OPTION_NOT_SET: 0,
  POSITION: 1,
  START: 2,
  END: 3
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.AllOptionCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.getAllOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.AllOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptionCase = {
  FILTER_OPTION_NOT_SET: 0,
  FILTER: 4,
  NO_FILTER: 5
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptionCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.getFilterOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_[1]));
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.client.persistent_subscriptions.CreateReq.Position.toObject(includeInstance, f),
    start: (f = msg.getStart()) && shared_pb.Empty.toObject(includeInstance, f),
    end: (f = msg.getEnd()) && shared_pb.Empty.toObject(includeInstance, f),
    filter: (f = msg.getFilter()) && proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.toObject(includeInstance, f),
    noFilter: (f = msg.getNoFilter()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions;
  return proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.Position;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.Position.deserializeBinaryFromReader);
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
    case 4:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    case 5:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoFilter(value);
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.Position.serializeBinaryToWriter
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
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.serializeBinaryToWriter
    );
  }
  f = message.getNoFilter();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      shared_pb.Empty.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_ = [[1,2],[3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.FilterCase = {
  FILTER_NOT_SET: 0,
  STREAM_IDENTIFIER: 1,
  EVENT_TYPE: 2
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.FilterCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.getFilterCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.FilterCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.WindowCase = {
  WINDOW_NOT_SET: 0,
  MAX: 3,
  COUNT: 4
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.WindowCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.getWindowCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.WindowCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_[1]));
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.toObject(includeInstance, f),
    eventType: (f = msg.getEventType()) && proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.toObject(includeInstance, f),
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions;
  return proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = new proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.serializeBinaryToWriter
    );
  }
  f = message.getEventType();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.repeatedFields_ = [2];



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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression;
  return proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.getRegex = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.setRegex = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string prefix = 2;
 * @return {!Array<string>}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.getPrefixList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.setPrefixList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.addPrefix = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression.prototype.clearPrefixList = function() {
  return this.setPrefixList([]);
};


/**
 * optional Expression stream_identifier = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Expression event_type = 2;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.getEventType = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression, 2));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.Expression|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.setEventType = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.clearEventType = function() {
  return this.setEventType(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.hasEventType = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint32 max = 3;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.getMax = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.setMax = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.clearMax = function() {
  return jspb.Message.setOneofField(this, 3, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.hasMax = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty count = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.getCount = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.setCount = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.clearCount = function() {
  return this.setCount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.hasCount = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint32 checkpointIntervalMultiplier = 5;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.getCheckpointintervalmultiplier = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions.prototype.setCheckpointintervalmultiplier = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional Position position = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.Position}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.getPosition = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.Position, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.Position|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.setPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty start = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.setStart = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.clearStart = function() {
  return this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.hasStart = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty end = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.getEnd = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.setEnd = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.clearEnd = function() {
  return this.setEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional FilterOptions filter = 4;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.getFilter = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions, 4));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.FilterOptions|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.setFilter = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional event_store.client.Empty no_filter = 5;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.getNoFilter = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 5));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.setNoFilter = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.clearNoFilter = function() {
  return this.setNoFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.AllOptions.prototype.hasNoFilter = function() {
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
proto.event_store.client.persistent_subscriptions.CreateReq.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Position.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Position}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq.Position;
  return proto.event_store.client.persistent_subscriptions.CreateReq.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Position}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Position.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.CreateReq.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Position.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.CreateReq.Position.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Position} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Position.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Position.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Position} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Position.prototype.setPreparePosition = function(value) {
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
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_ = [[4,14],[6,15]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.MessageTimeoutCase = {
  MESSAGE_TIMEOUT_NOT_SET: 0,
  MESSAGE_TIMEOUT_TICKS: 4,
  MESSAGE_TIMEOUT_MS: 14
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.Settings.MessageTimeoutCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getMessageTimeoutCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.Settings.MessageTimeoutCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.CheckpointAfterCase = {
  CHECKPOINT_AFTER_NOT_SET: 0,
  CHECKPOINT_AFTER_TICKS: 6,
  CHECKPOINT_AFTER_MS: 15
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.CreateReq.Settings.CheckpointAfterCase}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getCheckpointAfterCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.CreateReq.Settings.CheckpointAfterCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[1]));
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
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateReq.Settings.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.toObject = function(includeInstance, msg) {
  var f, obj = {
    resolveLinks: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    revision: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    extraStatistics: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    maxRetryCount: jspb.Message.getFieldWithDefault(msg, 5, 0),
    minCheckpointCount: jspb.Message.getFieldWithDefault(msg, 7, 0),
    maxCheckpointCount: jspb.Message.getFieldWithDefault(msg, 8, 0),
    maxSubscriberCount: jspb.Message.getFieldWithDefault(msg, 9, 0),
    liveBufferSize: jspb.Message.getFieldWithDefault(msg, 10, 0),
    readBatchSize: jspb.Message.getFieldWithDefault(msg, 11, 0),
    historyBufferSize: jspb.Message.getFieldWithDefault(msg, 12, 0),
    namedConsumerStrategy: jspb.Message.getFieldWithDefault(msg, 13, 0),
    messageTimeoutTicks: jspb.Message.getFieldWithDefault(msg, 4, "0"),
    messageTimeoutMs: jspb.Message.getFieldWithDefault(msg, 14, 0),
    checkpointAfterTicks: jspb.Message.getFieldWithDefault(msg, 6, "0"),
    checkpointAfterMs: jspb.Message.getFieldWithDefault(msg, 15, 0),
    consumerStrategy: jspb.Message.getFieldWithDefault(msg, 16, "")
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateReq.Settings;
  return proto.event_store.client.persistent_subscriptions.CreateReq.Settings.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setResolveLinks(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setRevision(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExtraStatistics(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxRetryCount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMinCheckpointCount(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxCheckpointCount(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxSubscriberCount(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLiveBufferSize(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setReadBatchSize(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHistoryBufferSize(value);
      break;
    case 13:
      var value = /** @type {!proto.event_store.client.persistent_subscriptions.CreateReq.ConsumerStrategy} */ (reader.readEnum());
      msg.setNamedConsumerStrategy(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setMessageTimeoutTicks(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMessageTimeoutMs(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setCheckpointAfterTicks(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCheckpointAfterMs(value);
      break;
    case 16:
      var value = /** @type {string} */ (reader.readString());
      msg.setConsumerStrategy(value);
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
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateReq.Settings.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResolveLinks();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getRevision();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      2,
      f
    );
  }
  f = message.getExtraStatistics();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getMaxRetryCount();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getMinCheckpointCount();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getMaxCheckpointCount();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getMaxSubscriberCount();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getLiveBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getReadBatchSize();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
  f = message.getHistoryBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getNamedConsumerStrategy();
  if (f !== 0.0) {
    writer.writeEnum(
      13,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt64String(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 14));
  if (f != null) {
    writer.writeInt32(
      14,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeInt64String(
      6,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 15));
  if (f != null) {
    writer.writeInt32(
      15,
      f
    );
  }
  f = message.getConsumerStrategy();
  if (f.length > 0) {
    writer.writeString(
      16,
      f
    );
  }
};


/**
 * optional bool resolve_links = 1;
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getResolveLinks = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setResolveLinks = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setRevision = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
};


/**
 * optional bool extra_statistics = 3;
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getExtraStatistics = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setExtraStatistics = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional int32 max_retry_count = 5;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getMaxRetryCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setMaxRetryCount = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 min_checkpoint_count = 7;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getMinCheckpointCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setMinCheckpointCount = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 max_checkpoint_count = 8;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getMaxCheckpointCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setMaxCheckpointCount = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 max_subscriber_count = 9;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getMaxSubscriberCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setMaxSubscriberCount = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 live_buffer_size = 10;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getLiveBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setLiveBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int32 read_batch_size = 11;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getReadBatchSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setReadBatchSize = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional int32 history_buffer_size = 12;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getHistoryBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setHistoryBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional ConsumerStrategy named_consumer_strategy = 13;
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.ConsumerStrategy}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getNamedConsumerStrategy = function() {
  return /** @type {!proto.event_store.client.persistent_subscriptions.CreateReq.ConsumerStrategy} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {!proto.event_store.client.persistent_subscriptions.CreateReq.ConsumerStrategy} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setNamedConsumerStrategy = function(value) {
  return jspb.Message.setProto3EnumField(this, 13, value);
};


/**
 * optional int64 message_timeout_ticks = 4;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getMessageTimeoutTicks = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setMessageTimeoutTicks = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.clearMessageTimeoutTicks = function() {
  return jspb.Message.setOneofField(this, 4, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.hasMessageTimeoutTicks = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int32 message_timeout_ms = 14;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getMessageTimeoutMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setMessageTimeoutMs = function(value) {
  return jspb.Message.setOneofField(this, 14, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.clearMessageTimeoutMs = function() {
  return jspb.Message.setOneofField(this, 14, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.hasMessageTimeoutMs = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional int64 checkpoint_after_ticks = 6;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getCheckpointAfterTicks = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setCheckpointAfterTicks = function(value) {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.clearCheckpointAfterTicks = function() {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.hasCheckpointAfterTicks = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional int32 checkpoint_after_ms = 15;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getCheckpointAfterMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setCheckpointAfterMs = function(value) {
  return jspb.Message.setOneofField(this, 15, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.clearCheckpointAfterMs = function() {
  return jspb.Message.setOneofField(this, 15, proto.event_store.client.persistent_subscriptions.CreateReq.Settings.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.hasCheckpointAfterMs = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional string consumer_strategy = 16;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.getConsumerStrategy = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 16, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.Settings.prototype.setConsumerStrategy = function(value) {
  return jspb.Message.setProto3StringField(this, 16, value);
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.CreateReq.Options}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.CreateReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.CreateReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.CreateReq.Options|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq} returns this
*/
proto.event_store.client.persistent_subscriptions.CreateReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateReq} returns this
 */
proto.event_store.client.persistent_subscriptions.CreateReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.CreateReq.prototype.hasOptions = function() {
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
proto.event_store.client.persistent_subscriptions.CreateResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.CreateResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.CreateResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateResp.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.CreateResp}
 */
proto.event_store.client.persistent_subscriptions.CreateResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.CreateResp;
  return proto.event_store.client.persistent_subscriptions.CreateResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.CreateResp}
 */
proto.event_store.client.persistent_subscriptions.CreateResp.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.CreateResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.CreateResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.CreateResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.CreateResp.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.UpdateReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.persistent_subscriptions.UpdateReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.UpdateReq;
  return proto.event_store.client.persistent_subscriptions.UpdateReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.UpdateReq.Options;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.UpdateReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.UpdateReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.UpdateReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.UpdateReq.Options.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.ConsumerStrategy = {
  DISPATCHTOSINGLE: 0,
  ROUNDROBIN: 1,
  PINNED: 2
};


/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.oneofGroups_ = [[4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM: 4,
  ALL: 5
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.UpdateReq.Options.StreamOptionCase}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.UpdateReq.Options.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.UpdateReq.Options.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.UpdateReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    stream: (f = msg.getStream()) && proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.toObject(includeInstance, f),
    all: (f = msg.getAll()) && proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.toObject(includeInstance, f),
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    groupName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    settings: (f = msg.getSettings()) && proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.UpdateReq.Options;
  return proto.event_store.client.persistent_subscriptions.UpdateReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 4:
      var value = new proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.deserializeBinaryFromReader);
      msg.setStream(value);
      break;
    case 5:
      var value = new proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupName(value);
      break;
    case 3:
      var value = new proto.event_store.client.persistent_subscriptions.UpdateReq.Settings;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.deserializeBinaryFromReader);
      msg.setSettings(value);
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.UpdateReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStream();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.serializeBinaryToWriter
    );
  }
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = message.getGroupName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSettings();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.serializeBinaryToWriter
    );
  }
};


/**
 * optional StreamOptions stream = 4;
 * @return {?proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.getStream = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions, 4));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.setStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.persistent_subscriptions.UpdateReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.clearStream = function() {
  return this.setStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.hasStream = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional AllOptions all = 5;
 * @return {?proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions, 5));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.persistent_subscriptions.UpdateReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string group_name = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.getGroupName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.setGroupName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Settings settings = 3;
 * @return {?proto.event_store.client.persistent_subscriptions.UpdateReq.Settings}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.getSettings = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings, 3));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.UpdateReq.Settings|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.setSettings = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.clearSettings = function() {
  return this.setSettings(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Options.prototype.hasSettings = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.oneofGroups_ = [[2,3,4]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.RevisionOptionCase = {
  REVISION_OPTION_NOT_SET: 0,
  REVISION: 2,
  START: 3,
  END: 4
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.RevisionOptionCase}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.getRevisionOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.RevisionOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions;
  return proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.setRevision = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.clearRevision = function() {
  return jspb.Message.setOneofField(this, 2, proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty start = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.setStart = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.clearStart = function() {
  return this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.hasStart = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional event_store.client.Empty end = 4;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.getEnd = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 4));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.setEnd = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.clearEnd = function() {
  return this.setEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.StreamOptions.prototype.hasEnd = function() {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.AllOptionCase = {
  ALL_OPTION_NOT_SET: 0,
  POSITION: 1,
  START: 2,
  END: 3
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.AllOptionCase}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.getAllOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.AllOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.client.persistent_subscriptions.UpdateReq.Position.toObject(includeInstance, f),
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
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions;
  return proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.UpdateReq.Position;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.UpdateReq.Position.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.UpdateReq.Position.serializeBinaryToWriter
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
 * @return {?proto.event_store.client.persistent_subscriptions.UpdateReq.Position}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.getPosition = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.UpdateReq.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.UpdateReq.Position, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.UpdateReq.Position|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.setPosition = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty start = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.setStart = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.clearStart = function() {
  return this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.hasStart = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty end = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.getEnd = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.setEnd = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.clearEnd = function() {
  return this.setEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.AllOptions.prototype.hasEnd = function() {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.UpdateReq.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Position}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.UpdateReq.Position;
  return proto.event_store.client.persistent_subscriptions.UpdateReq.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Position}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.UpdateReq.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.prototype.getCommitPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Position} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.prototype.setCommitPosition = function(value) {
  return jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.prototype.getPreparePosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Position} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Position.prototype.setPreparePosition = function(value) {
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_ = [[4,14],[6,15]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.MessageTimeoutCase = {
  MESSAGE_TIMEOUT_NOT_SET: 0,
  MESSAGE_TIMEOUT_TICKS: 4,
  MESSAGE_TIMEOUT_MS: 14
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.MessageTimeoutCase}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getMessageTimeoutCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.MessageTimeoutCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.CheckpointAfterCase = {
  CHECKPOINT_AFTER_NOT_SET: 0,
  CHECKPOINT_AFTER_TICKS: 6,
  CHECKPOINT_AFTER_MS: 15
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.CheckpointAfterCase}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getCheckpointAfterCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.CheckpointAfterCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[1]));
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.toObject = function(includeInstance, msg) {
  var f, obj = {
    resolveLinks: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    revision: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    extraStatistics: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    maxRetryCount: jspb.Message.getFieldWithDefault(msg, 5, 0),
    minCheckpointCount: jspb.Message.getFieldWithDefault(msg, 7, 0),
    maxCheckpointCount: jspb.Message.getFieldWithDefault(msg, 8, 0),
    maxSubscriberCount: jspb.Message.getFieldWithDefault(msg, 9, 0),
    liveBufferSize: jspb.Message.getFieldWithDefault(msg, 10, 0),
    readBatchSize: jspb.Message.getFieldWithDefault(msg, 11, 0),
    historyBufferSize: jspb.Message.getFieldWithDefault(msg, 12, 0),
    namedConsumerStrategy: jspb.Message.getFieldWithDefault(msg, 13, 0),
    messageTimeoutTicks: jspb.Message.getFieldWithDefault(msg, 4, "0"),
    messageTimeoutMs: jspb.Message.getFieldWithDefault(msg, 14, 0),
    checkpointAfterTicks: jspb.Message.getFieldWithDefault(msg, 6, "0"),
    checkpointAfterMs: jspb.Message.getFieldWithDefault(msg, 15, 0)
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
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.UpdateReq.Settings;
  return proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setResolveLinks(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setRevision(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExtraStatistics(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxRetryCount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMinCheckpointCount(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxCheckpointCount(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxSubscriberCount(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLiveBufferSize(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setReadBatchSize(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHistoryBufferSize(value);
      break;
    case 13:
      var value = /** @type {!proto.event_store.client.persistent_subscriptions.UpdateReq.ConsumerStrategy} */ (reader.readEnum());
      msg.setNamedConsumerStrategy(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setMessageTimeoutTicks(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMessageTimeoutMs(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setCheckpointAfterTicks(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCheckpointAfterMs(value);
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
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResolveLinks();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getRevision();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      2,
      f
    );
  }
  f = message.getExtraStatistics();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getMaxRetryCount();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getMinCheckpointCount();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getMaxCheckpointCount();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getMaxSubscriberCount();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getLiveBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getReadBatchSize();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
  f = message.getHistoryBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getNamedConsumerStrategy();
  if (f !== 0.0) {
    writer.writeEnum(
      13,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt64String(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 14));
  if (f != null) {
    writer.writeInt32(
      14,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeInt64String(
      6,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 15));
  if (f != null) {
    writer.writeInt32(
      15,
      f
    );
  }
};


/**
 * optional bool resolve_links = 1;
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getResolveLinks = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setResolveLinks = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional uint64 revision = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getRevision = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setRevision = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
};


/**
 * optional bool extra_statistics = 3;
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getExtraStatistics = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setExtraStatistics = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional int32 max_retry_count = 5;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getMaxRetryCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setMaxRetryCount = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 min_checkpoint_count = 7;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getMinCheckpointCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setMinCheckpointCount = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 max_checkpoint_count = 8;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getMaxCheckpointCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setMaxCheckpointCount = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 max_subscriber_count = 9;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getMaxSubscriberCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setMaxSubscriberCount = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 live_buffer_size = 10;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getLiveBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setLiveBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int32 read_batch_size = 11;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getReadBatchSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setReadBatchSize = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional int32 history_buffer_size = 12;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getHistoryBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setHistoryBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional ConsumerStrategy named_consumer_strategy = 13;
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.ConsumerStrategy}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getNamedConsumerStrategy = function() {
  return /** @type {!proto.event_store.client.persistent_subscriptions.UpdateReq.ConsumerStrategy} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateReq.ConsumerStrategy} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setNamedConsumerStrategy = function(value) {
  return jspb.Message.setProto3EnumField(this, 13, value);
};


/**
 * optional int64 message_timeout_ticks = 4;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getMessageTimeoutTicks = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setMessageTimeoutTicks = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.clearMessageTimeoutTicks = function() {
  return jspb.Message.setOneofField(this, 4, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.hasMessageTimeoutTicks = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int32 message_timeout_ms = 14;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getMessageTimeoutMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setMessageTimeoutMs = function(value) {
  return jspb.Message.setOneofField(this, 14, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.clearMessageTimeoutMs = function() {
  return jspb.Message.setOneofField(this, 14, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.hasMessageTimeoutMs = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional int64 checkpoint_after_ticks = 6;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getCheckpointAfterTicks = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setCheckpointAfterTicks = function(value) {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.clearCheckpointAfterTicks = function() {
  return jspb.Message.setOneofField(this, 6, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.hasCheckpointAfterTicks = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional int32 checkpoint_after_ms = 15;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.getCheckpointAfterMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.setCheckpointAfterMs = function(value) {
  return jspb.Message.setOneofField(this, 15, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq.Settings} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.clearCheckpointAfterMs = function() {
  return jspb.Message.setOneofField(this, 15, proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.Settings.prototype.hasCheckpointAfterMs = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.UpdateReq.Options}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.UpdateReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.UpdateReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.UpdateReq.Options|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq} returns this
*/
proto.event_store.client.persistent_subscriptions.UpdateReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateReq} returns this
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.UpdateReq.prototype.hasOptions = function() {
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
proto.event_store.client.persistent_subscriptions.UpdateResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.UpdateResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateResp.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateResp}
 */
proto.event_store.client.persistent_subscriptions.UpdateResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.UpdateResp;
  return proto.event_store.client.persistent_subscriptions.UpdateResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.UpdateResp}
 */
proto.event_store.client.persistent_subscriptions.UpdateResp.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.UpdateResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.UpdateResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.UpdateResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.UpdateResp.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.DeleteReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.DeleteReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.persistent_subscriptions.DeleteReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.DeleteReq;
  return proto.event_store.client.persistent_subscriptions.DeleteReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.DeleteReq.Options;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.DeleteReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.DeleteReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.DeleteReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.DeleteReq.Options.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.oneofGroups_ = [[1,3]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM_IDENTIFIER: 1,
  ALL: 3
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.DeleteReq.Options.StreamOptionCase}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.DeleteReq.Options.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.DeleteReq.Options.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.DeleteReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    all: (f = msg.getAll()) && shared_pb.Empty.toObject(includeInstance, f),
    groupName: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.DeleteReq.Options;
  return proto.event_store.client.persistent_subscriptions.DeleteReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.deserializeBinaryFromReader = function(msg, reader) {
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
    case 3:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupName(value);
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
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.DeleteReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getGroupName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty all = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.persistent_subscriptions.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string group_name = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.getGroupName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.Options.prototype.setGroupName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.DeleteReq.Options}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.DeleteReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.DeleteReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.DeleteReq.Options|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq} returns this
*/
proto.event_store.client.persistent_subscriptions.DeleteReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteReq} returns this
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.DeleteReq.prototype.hasOptions = function() {
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
proto.event_store.client.persistent_subscriptions.DeleteResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.DeleteResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.DeleteResp.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteResp}
 */
proto.event_store.client.persistent_subscriptions.DeleteResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.DeleteResp;
  return proto.event_store.client.persistent_subscriptions.DeleteResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.DeleteResp}
 */
proto.event_store.client.persistent_subscriptions.DeleteResp.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.DeleteResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.DeleteResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.DeleteResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.DeleteResp.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.GetInfoReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.GetInfoReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.GetInfoReq;
  return proto.event_store.client.persistent_subscriptions.GetInfoReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.GetInfoReq.Options;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.GetInfoReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.GetInfoReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM_IDENTIFIER: 1,
  ALL: 2
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.StreamOptionCase}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    all: (f = msg.getAll()) && shared_pb.Empty.toObject(includeInstance, f),
    groupName: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.GetInfoReq.Options;
  return proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupName(value);
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
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamIdentifier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getGroupName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty all = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string group_name = 3;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.getGroupName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.Options.prototype.setGroupName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.GetInfoReq.Options}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.GetInfoReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.GetInfoReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.GetInfoReq.Options|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq} returns this
*/
proto.event_store.client.persistent_subscriptions.GetInfoReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoReq} returns this
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.GetInfoReq.prototype.hasOptions = function() {
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
proto.event_store.client.persistent_subscriptions.GetInfoResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.GetInfoResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.GetInfoResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscriptionInfo: (f = msg.getSubscriptionInfo()) && proto.event_store.client.persistent_subscriptions.SubscriptionInfo.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoResp}
 */
proto.event_store.client.persistent_subscriptions.GetInfoResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.GetInfoResp;
  return proto.event_store.client.persistent_subscriptions.GetInfoResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoResp}
 */
proto.event_store.client.persistent_subscriptions.GetInfoResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.SubscriptionInfo;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.SubscriptionInfo.deserializeBinaryFromReader);
      msg.setSubscriptionInfo(value);
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
proto.event_store.client.persistent_subscriptions.GetInfoResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.GetInfoResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.GetInfoResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.GetInfoResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscriptionInfo();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.SubscriptionInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional SubscriptionInfo subscription_info = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.SubscriptionInfo}
 */
proto.event_store.client.persistent_subscriptions.GetInfoResp.prototype.getSubscriptionInfo = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.SubscriptionInfo} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.SubscriptionInfo, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.SubscriptionInfo|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoResp} returns this
*/
proto.event_store.client.persistent_subscriptions.GetInfoResp.prototype.setSubscriptionInfo = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.GetInfoResp} returns this
 */
proto.event_store.client.persistent_subscriptions.GetInfoResp.prototype.clearSubscriptionInfo = function() {
  return this.setSubscriptionInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.GetInfoResp.prototype.hasSubscriptionInfo = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.repeatedFields_ = [4];



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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.SubscriptionInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    eventSource: jspb.Message.getFieldWithDefault(msg, 1, ""),
    groupName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, ""),
    connectionsList: jspb.Message.toObjectList(msg.getConnectionsList(),
    proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.toObject, includeInstance),
    averagePerSecond: jspb.Message.getFieldWithDefault(msg, 5, 0),
    totalItems: jspb.Message.getFieldWithDefault(msg, 6, "0"),
    countSinceLastMeasurement: jspb.Message.getFieldWithDefault(msg, 7, "0"),
    lastCheckpointedEventPosition: jspb.Message.getFieldWithDefault(msg, 8, ""),
    lastKnownEventPosition: jspb.Message.getFieldWithDefault(msg, 9, ""),
    resolveLinkTos: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    startFrom: jspb.Message.getFieldWithDefault(msg, 11, ""),
    messageTimeoutMilliseconds: jspb.Message.getFieldWithDefault(msg, 12, 0),
    extraStatistics: jspb.Message.getBooleanFieldWithDefault(msg, 13, false),
    maxRetryCount: jspb.Message.getFieldWithDefault(msg, 14, 0),
    liveBufferSize: jspb.Message.getFieldWithDefault(msg, 15, 0),
    bufferSize: jspb.Message.getFieldWithDefault(msg, 16, 0),
    readBatchSize: jspb.Message.getFieldWithDefault(msg, 17, 0),
    checkPointAfterMilliseconds: jspb.Message.getFieldWithDefault(msg, 18, 0),
    minCheckPointCount: jspb.Message.getFieldWithDefault(msg, 19, 0),
    maxCheckPointCount: jspb.Message.getFieldWithDefault(msg, 20, 0),
    readBufferCount: jspb.Message.getFieldWithDefault(msg, 21, 0),
    liveBufferCount: jspb.Message.getFieldWithDefault(msg, 22, "0"),
    retryBufferCount: jspb.Message.getFieldWithDefault(msg, 23, 0),
    totalInFlightMessages: jspb.Message.getFieldWithDefault(msg, 24, 0),
    outstandingMessagesCount: jspb.Message.getFieldWithDefault(msg, 25, 0),
    namedConsumerStrategy: jspb.Message.getFieldWithDefault(msg, 26, ""),
    maxSubscriberCount: jspb.Message.getFieldWithDefault(msg, 27, 0),
    parkedMessageCount: jspb.Message.getFieldWithDefault(msg, 28, "0")
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
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.SubscriptionInfo;
  return proto.event_store.client.persistent_subscriptions.SubscriptionInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEventSource(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 4:
      var value = new proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.deserializeBinaryFromReader);
      msg.addConnections(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAveragePerSecond(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setTotalItems(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setCountSinceLastMeasurement(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastCheckpointedEventPosition(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastKnownEventPosition(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setResolveLinkTos(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setStartFrom(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMessageTimeoutMilliseconds(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExtraStatistics(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxRetryCount(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLiveBufferSize(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBufferSize(value);
      break;
    case 17:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setReadBatchSize(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCheckPointAfterMilliseconds(value);
      break;
    case 19:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMinCheckPointCount(value);
      break;
    case 20:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxCheckPointCount(value);
      break;
    case 21:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setReadBufferCount(value);
      break;
    case 22:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setLiveBufferCount(value);
      break;
    case 23:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setRetryBufferCount(value);
      break;
    case 24:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalInFlightMessages(value);
      break;
    case 25:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOutstandingMessagesCount(value);
      break;
    case 26:
      var value = /** @type {string} */ (reader.readString());
      msg.setNamedConsumerStrategy(value);
      break;
    case 27:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxSubscriberCount(value);
      break;
    case 28:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setParkedMessageCount(value);
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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.SubscriptionInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEventSource();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getGroupName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getConnectionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.serializeBinaryToWriter
    );
  }
  f = message.getAveragePerSecond();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getTotalItems();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      6,
      f
    );
  }
  f = message.getCountSinceLastMeasurement();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      7,
      f
    );
  }
  f = message.getLastCheckpointedEventPosition();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getLastKnownEventPosition();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getResolveLinkTos();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getStartFrom();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getMessageTimeoutMilliseconds();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getExtraStatistics();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
  f = message.getMaxRetryCount();
  if (f !== 0) {
    writer.writeInt32(
      14,
      f
    );
  }
  f = message.getLiveBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      15,
      f
    );
  }
  f = message.getBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      16,
      f
    );
  }
  f = message.getReadBatchSize();
  if (f !== 0) {
    writer.writeInt32(
      17,
      f
    );
  }
  f = message.getCheckPointAfterMilliseconds();
  if (f !== 0) {
    writer.writeInt32(
      18,
      f
    );
  }
  f = message.getMinCheckPointCount();
  if (f !== 0) {
    writer.writeInt32(
      19,
      f
    );
  }
  f = message.getMaxCheckPointCount();
  if (f !== 0) {
    writer.writeInt32(
      20,
      f
    );
  }
  f = message.getReadBufferCount();
  if (f !== 0) {
    writer.writeInt32(
      21,
      f
    );
  }
  f = message.getLiveBufferCount();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      22,
      f
    );
  }
  f = message.getRetryBufferCount();
  if (f !== 0) {
    writer.writeInt32(
      23,
      f
    );
  }
  f = message.getTotalInFlightMessages();
  if (f !== 0) {
    writer.writeInt32(
      24,
      f
    );
  }
  f = message.getOutstandingMessagesCount();
  if (f !== 0) {
    writer.writeInt32(
      25,
      f
    );
  }
  f = message.getNamedConsumerStrategy();
  if (f.length > 0) {
    writer.writeString(
      26,
      f
    );
  }
  f = message.getMaxSubscriberCount();
  if (f !== 0) {
    writer.writeInt32(
      27,
      f
    );
  }
  f = message.getParkedMessageCount();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      28,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.repeatedFields_ = [6];



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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    from: jspb.Message.getFieldWithDefault(msg, 1, ""),
    username: jspb.Message.getFieldWithDefault(msg, 2, ""),
    averageItemsPerSecond: jspb.Message.getFieldWithDefault(msg, 3, 0),
    totalItems: jspb.Message.getFieldWithDefault(msg, 4, "0"),
    countSinceLastMeasurement: jspb.Message.getFieldWithDefault(msg, 5, "0"),
    observedMeasurementsList: jspb.Message.toObjectList(msg.getObservedMeasurementsList(),
    proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.toObject, includeInstance),
    availableSlots: jspb.Message.getFieldWithDefault(msg, 7, 0),
    inFlightMessages: jspb.Message.getFieldWithDefault(msg, 8, 0),
    connectionName: jspb.Message.getFieldWithDefault(msg, 9, "")
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
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo;
  return proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFrom(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAverageItemsPerSecond(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setTotalItems(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setCountSinceLastMeasurement(value);
      break;
    case 6:
      var value = new proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.deserializeBinaryFromReader);
      msg.addObservedMeasurements(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAvailableSlots(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInFlightMessages(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setConnectionName(value);
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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFrom();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAverageItemsPerSecond();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getTotalItems();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      4,
      f
    );
  }
  f = message.getCountSinceLastMeasurement();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      5,
      f
    );
  }
  f = message.getObservedMeasurementsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.serializeBinaryToWriter
    );
  }
  f = message.getAvailableSlots();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getInFlightMessages();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getConnectionName();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
};


/**
 * optional string from = 1;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getFrom = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setFrom = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string username = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 average_items_per_second = 3;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getAverageItemsPerSecond = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setAverageItemsPerSecond = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 total_items = 4;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getTotalItems = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setTotalItems = function(value) {
  return jspb.Message.setProto3StringIntField(this, 4, value);
};


/**
 * optional int64 count_since_last_measurement = 5;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getCountSinceLastMeasurement = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setCountSinceLastMeasurement = function(value) {
  return jspb.Message.setProto3StringIntField(this, 5, value);
};


/**
 * repeated Measurement observed_measurements = 6;
 * @return {!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement>}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getObservedMeasurementsList = function() {
  return /** @type{!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement, 6));
};


/**
 * @param {!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement>} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
*/
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setObservedMeasurementsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement=} opt_value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.addObservedMeasurements = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.clearObservedMeasurementsList = function() {
  return this.setObservedMeasurementsList([]);
};


/**
 * optional int32 available_slots = 7;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getAvailableSlots = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setAvailableSlots = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 in_flight_messages = 8;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getInFlightMessages = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setInFlightMessages = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional string connection_name = 9;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.getConnectionName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo.prototype.setConnectionName = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: jspb.Message.getFieldWithDefault(msg, 1, ""),
    value: jspb.Message.getFieldWithDefault(msg, 2, "0")
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
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement;
  return proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setValue(value);
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
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      2,
      f
    );
  }
};


/**
 * optional string key = 1;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.prototype.setKey = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 value = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.Measurement.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringIntField(this, 2, value);
};


/**
 * optional string event_source = 1;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getEventSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setEventSource = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string group_name = 2;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getGroupName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setGroupName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string status = 3;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated ConnectionInfo connections = 4;
 * @return {!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo>}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getConnectionsList = function() {
  return /** @type{!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo, 4));
};


/**
 * @param {!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo>} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
*/
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setConnectionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.addConnections = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.event_store.client.persistent_subscriptions.SubscriptionInfo.ConnectionInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.clearConnectionsList = function() {
  return this.setConnectionsList([]);
};


/**
 * optional int32 average_per_second = 5;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getAveragePerSecond = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setAveragePerSecond = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 total_items = 6;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getTotalItems = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setTotalItems = function(value) {
  return jspb.Message.setProto3StringIntField(this, 6, value);
};


/**
 * optional int64 count_since_last_measurement = 7;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getCountSinceLastMeasurement = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setCountSinceLastMeasurement = function(value) {
  return jspb.Message.setProto3StringIntField(this, 7, value);
};


/**
 * optional string last_checkpointed_event_position = 8;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getLastCheckpointedEventPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setLastCheckpointedEventPosition = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string last_known_event_position = 9;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getLastKnownEventPosition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setLastKnownEventPosition = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional bool resolve_link_tos = 10;
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getResolveLinkTos = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setResolveLinkTos = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional string start_from = 11;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getStartFrom = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setStartFrom = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional int32 message_timeout_milliseconds = 12;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getMessageTimeoutMilliseconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setMessageTimeoutMilliseconds = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional bool extra_statistics = 13;
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getExtraStatistics = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setExtraStatistics = function(value) {
  return jspb.Message.setProto3BooleanField(this, 13, value);
};


/**
 * optional int32 max_retry_count = 14;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getMaxRetryCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setMaxRetryCount = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional int32 live_buffer_size = 15;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getLiveBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setLiveBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 15, value);
};


/**
 * optional int32 buffer_size = 16;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 16, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 16, value);
};


/**
 * optional int32 read_batch_size = 17;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getReadBatchSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 17, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setReadBatchSize = function(value) {
  return jspb.Message.setProto3IntField(this, 17, value);
};


/**
 * optional int32 check_point_after_milliseconds = 18;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getCheckPointAfterMilliseconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 18, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setCheckPointAfterMilliseconds = function(value) {
  return jspb.Message.setProto3IntField(this, 18, value);
};


/**
 * optional int32 min_check_point_count = 19;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getMinCheckPointCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 19, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setMinCheckPointCount = function(value) {
  return jspb.Message.setProto3IntField(this, 19, value);
};


/**
 * optional int32 max_check_point_count = 20;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getMaxCheckPointCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 20, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setMaxCheckPointCount = function(value) {
  return jspb.Message.setProto3IntField(this, 20, value);
};


/**
 * optional int32 read_buffer_count = 21;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getReadBufferCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 21, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setReadBufferCount = function(value) {
  return jspb.Message.setProto3IntField(this, 21, value);
};


/**
 * optional int64 live_buffer_count = 22;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getLiveBufferCount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 22, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setLiveBufferCount = function(value) {
  return jspb.Message.setProto3StringIntField(this, 22, value);
};


/**
 * optional int32 retry_buffer_count = 23;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getRetryBufferCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 23, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setRetryBufferCount = function(value) {
  return jspb.Message.setProto3IntField(this, 23, value);
};


/**
 * optional int32 total_in_flight_messages = 24;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getTotalInFlightMessages = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 24, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setTotalInFlightMessages = function(value) {
  return jspb.Message.setProto3IntField(this, 24, value);
};


/**
 * optional int32 outstanding_messages_count = 25;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getOutstandingMessagesCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 25, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setOutstandingMessagesCount = function(value) {
  return jspb.Message.setProto3IntField(this, 25, value);
};


/**
 * optional string named_consumer_strategy = 26;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getNamedConsumerStrategy = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 26, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setNamedConsumerStrategy = function(value) {
  return jspb.Message.setProto3StringField(this, 26, value);
};


/**
 * optional int32 max_subscriber_count = 27;
 * @return {number}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getMaxSubscriberCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 27, 0));
};


/**
 * @param {number} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setMaxSubscriberCount = function(value) {
  return jspb.Message.setProto3IntField(this, 27, value);
};


/**
 * optional int64 parked_message_count = 28;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.getParkedMessageCount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 28, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo} returns this
 */
proto.event_store.client.persistent_subscriptions.SubscriptionInfo.prototype.setParkedMessageCount = function(value) {
  return jspb.Message.setProto3StringIntField(this, 28, value);
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
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReplayParkedReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReplayParkedReq;
  return proto.event_store.client.persistent_subscriptions.ReplayParkedReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReplayParkedReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_ = [[2,3],[4,5]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM_IDENTIFIER: 2,
  ALL: 3
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StreamOptionCase}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StopAtOptionCase = {
  STOP_AT_OPTION_NOT_SET: 0,
  STOP_AT: 4,
  NO_LIMIT: 5
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StopAtOptionCase}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.getStopAtOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.StopAtOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_[1]));
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
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    groupName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    streamIdentifier: (f = msg.getStreamIdentifier()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    all: (f = msg.getAll()) && shared_pb.Empty.toObject(includeInstance, f),
    stopAt: jspb.Message.getFieldWithDefault(msg, 4, "0"),
    noLimit: (f = msg.getNoLimit()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options;
  return proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupName(value);
      break;
    case 2:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStreamIdentifier(value);
      break;
    case 3:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setStopAt(value);
      break;
    case 5:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setNoLimit(value);
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
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGroupName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
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
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt64String(
      4,
      f
    );
  }
  f = message.getNoLimit();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional string group_name = 1;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.getGroupName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.setGroupName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional event_store.client.StreamIdentifier stream_identifier = 2;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.getStreamIdentifier = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 2));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.setStreamIdentifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.clearStreamIdentifier = function() {
  return this.setStreamIdentifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.hasStreamIdentifier = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional event_store.client.Empty all = 3;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 3));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional int64 stop_at = 4;
 * @return {string}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.getStopAt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
};


/**
 * @param {string} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.setStopAt = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.clearStopAt = function() {
  return jspb.Message.setOneofField(this, 4, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.hasStopAt = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional event_store.client.Empty no_limit = 5;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.getNoLimit = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 5));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.setNoLimit = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.clearNoLimit = function() {
  return this.setNoLimit(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options.prototype.hasNoLimit = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ReplayParkedReq.Options|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq} returns this
*/
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedReq} returns this
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedReq.prototype.hasOptions = function() {
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
proto.event_store.client.persistent_subscriptions.ReplayParkedResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ReplayParkedResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedResp.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedResp}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ReplayParkedResp;
  return proto.event_store.client.persistent_subscriptions.ReplayParkedResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ReplayParkedResp}
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedResp.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.client.persistent_subscriptions.ReplayParkedResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ReplayParkedResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ReplayParkedResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ReplayParkedResp.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.client.persistent_subscriptions.ListReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ListReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.client.persistent_subscriptions.ListReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq}
 */
proto.event_store.client.persistent_subscriptions.ListReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ListReq;
  return proto.event_store.client.persistent_subscriptions.ListReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq}
 */
proto.event_store.client.persistent_subscriptions.ListReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.ListReq.Options;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ListReq.Options.deserializeBinaryFromReader);
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
proto.event_store.client.persistent_subscriptions.ListReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ListReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.ListReq.Options.serializeBinaryToWriter
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
proto.event_store.client.persistent_subscriptions.ListReq.Options.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.ListOptionCase = {
  LIST_OPTION_NOT_SET: 0,
  LIST_ALL_SUBSCRIPTIONS: 1,
  LIST_FOR_STREAM: 2
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ListReq.Options.ListOptionCase}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.getListOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ListReq.Options.ListOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ListReq.Options.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ListReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    listAllSubscriptions: (f = msg.getListAllSubscriptions()) && shared_pb.Empty.toObject(includeInstance, f),
    listForStream: (f = msg.getListForStream()) && proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ListReq.Options;
  return proto.event_store.client.persistent_subscriptions.ListReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setListAllSubscriptions(value);
      break;
    case 2:
      var value = new proto.event_store.client.persistent_subscriptions.ListReq.StreamOption;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.deserializeBinaryFromReader);
      msg.setListForStream(value);
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
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ListReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getListAllSubscriptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
  f = message.getListForStream();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.Empty list_all_subscriptions = 1;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.getListAllSubscriptions = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 1));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.setListAllSubscriptions = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.ListReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.clearListAllSubscriptions = function() {
  return this.setListAllSubscriptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.hasListAllSubscriptions = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional StreamOption list_for_stream = 2;
 * @return {?proto.event_store.client.persistent_subscriptions.ListReq.StreamOption}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.getListForStream = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ListReq.StreamOption, 2));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ListReq.StreamOption|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.Options} returns this
*/
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.setListForStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.ListReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.Options} returns this
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.clearListForStream = function() {
  return this.setListForStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ListReq.Options.prototype.hasListForStream = function() {
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
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.StreamOptionCase = {
  STREAM_OPTION_NOT_SET: 0,
  STREAM: 1,
  ALL: 2
};

/**
 * @return {proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.StreamOptionCase}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.getStreamOptionCase = function() {
  return /** @type {proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.StreamOptionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.oneofGroups_[0]));
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
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.toObject = function(includeInstance, msg) {
  var f, obj = {
    stream: (f = msg.getStream()) && shared_pb.StreamIdentifier.toObject(includeInstance, f),
    all: (f = msg.getAll()) && shared_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ListReq.StreamOption;
  return proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new shared_pb.StreamIdentifier;
      reader.readMessage(value,shared_pb.StreamIdentifier.deserializeBinaryFromReader);
      msg.setStream(value);
      break;
    case 2:
      var value = new shared_pb.Empty;
      reader.readMessage(value,shared_pb.Empty.deserializeBinaryFromReader);
      msg.setAll(value);
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
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStream();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      shared_pb.StreamIdentifier.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      shared_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional event_store.client.StreamIdentifier stream = 1;
 * @return {?proto.event_store.client.StreamIdentifier}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.getStream = function() {
  return /** @type{?proto.event_store.client.StreamIdentifier} */ (
    jspb.Message.getWrapperField(this, shared_pb.StreamIdentifier, 1));
};


/**
 * @param {?proto.event_store.client.StreamIdentifier|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} returns this
*/
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.setStream = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} returns this
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.clearStream = function() {
  return this.setStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.hasStream = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional event_store.client.Empty all = 2;
 * @return {?proto.event_store.client.Empty}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.getAll = function() {
  return /** @type{?proto.event_store.client.Empty} */ (
    jspb.Message.getWrapperField(this, shared_pb.Empty, 2));
};


/**
 * @param {?proto.event_store.client.Empty|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} returns this
*/
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.setAll = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq.StreamOption} returns this
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.clearAll = function() {
  return this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ListReq.StreamOption.prototype.hasAll = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.client.persistent_subscriptions.ListReq.Options}
 */
proto.event_store.client.persistent_subscriptions.ListReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.client.persistent_subscriptions.ListReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.client.persistent_subscriptions.ListReq.Options, 1));
};


/**
 * @param {?proto.event_store.client.persistent_subscriptions.ListReq.Options|undefined} value
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq} returns this
*/
proto.event_store.client.persistent_subscriptions.ListReq.prototype.setOptions = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.event_store.client.persistent_subscriptions.ListReq} returns this
 */
proto.event_store.client.persistent_subscriptions.ListReq.prototype.clearOptions = function() {
  return this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.client.persistent_subscriptions.ListReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.client.persistent_subscriptions.ListResp.repeatedFields_ = [1];



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
proto.event_store.client.persistent_subscriptions.ListResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.client.persistent_subscriptions.ListResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.client.persistent_subscriptions.ListResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscriptionsList: jspb.Message.toObjectList(msg.getSubscriptionsList(),
    proto.event_store.client.persistent_subscriptions.SubscriptionInfo.toObject, includeInstance)
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
 * @return {!proto.event_store.client.persistent_subscriptions.ListResp}
 */
proto.event_store.client.persistent_subscriptions.ListResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.client.persistent_subscriptions.ListResp;
  return proto.event_store.client.persistent_subscriptions.ListResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.client.persistent_subscriptions.ListResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.client.persistent_subscriptions.ListResp}
 */
proto.event_store.client.persistent_subscriptions.ListResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.client.persistent_subscriptions.SubscriptionInfo;
      reader.readMessage(value,proto.event_store.client.persistent_subscriptions.SubscriptionInfo.deserializeBinaryFromReader);
      msg.addSubscriptions(value);
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
proto.event_store.client.persistent_subscriptions.ListResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.client.persistent_subscriptions.ListResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.client.persistent_subscriptions.ListResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.client.persistent_subscriptions.ListResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscriptionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.event_store.client.persistent_subscriptions.SubscriptionInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated SubscriptionInfo subscriptions = 1;
 * @return {!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo>}
 */
proto.event_store.client.persistent_subscriptions.ListResp.prototype.getSubscriptionsList = function() {
  return /** @type{!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.event_store.client.persistent_subscriptions.SubscriptionInfo, 1));
};


/**
 * @param {!Array<!proto.event_store.client.persistent_subscriptions.SubscriptionInfo>} value
 * @return {!proto.event_store.client.persistent_subscriptions.ListResp} returns this
*/
proto.event_store.client.persistent_subscriptions.ListResp.prototype.setSubscriptionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.event_store.client.persistent_subscriptions.SubscriptionInfo}
 */
proto.event_store.client.persistent_subscriptions.ListResp.prototype.addSubscriptions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.event_store.client.persistent_subscriptions.SubscriptionInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event_store.client.persistent_subscriptions.ListResp} returns this
 */
proto.event_store.client.persistent_subscriptions.ListResp.prototype.clearSubscriptionsList = function() {
  return this.setSubscriptionsList([]);
};


goog.object.extend(exports, proto.event_store.client.persistent_subscriptions);
