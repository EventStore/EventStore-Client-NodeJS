// source: streams.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.event_store.grpc.streams.AppendReq', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendReq.ContentCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendReq.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendReq.Options', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendReq.Options.ExpectedStreamRevisionCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendReq.ProposedMessage', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendResp', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendResp.CurrentRevisionOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendResp.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendResp.Position', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.AppendResp.PositionOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteReq', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteReq.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteReq.Options', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteReq.Options.ExpectedStreamRevisionCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteResp', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteResp.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteResp.Position', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.DeleteResp.PositionOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.AllOptions', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.AllOptions.AllOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.CountOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.FilterOptions', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.FilterCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.WindowCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.FilterOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.Position', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.ReadDirection', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.StreamOptions', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.RevisionOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.StreamOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadResp', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadResp.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadResp.ReadEvent', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadResp.ReadEvent.PositionCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneReq', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneReq.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneReq.Options', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneReq.Options.ExpectedStreamRevisionCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneResp', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneResp.Empty', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneResp.Position', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.TombstoneResp.PositionOptionsCase', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.UUID', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.UUID.Structured', null, global);
goog.exportSymbol('proto.event_store.grpc.streams.UUID.ValueCase', null, global);
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
proto.event_store.grpc.streams.ReadReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.displayName = 'proto.event_store.grpc.streams.ReadReq';
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
proto.event_store.grpc.streams.ReadReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Options.displayName = 'proto.event_store.grpc.streams.ReadReq.Options';
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
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Options.StreamOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.displayName = 'proto.event_store.grpc.streams.ReadReq.Options.StreamOptions';
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
proto.event_store.grpc.streams.ReadReq.Options.AllOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.ReadReq.Options.AllOptions.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Options.AllOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Options.AllOptions.displayName = 'proto.event_store.grpc.streams.ReadReq.Options.AllOptions';
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
proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.displayName = 'proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions';
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
proto.event_store.grpc.streams.ReadReq.Options.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Options.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Options.Position.displayName = 'proto.event_store.grpc.streams.ReadReq.Options.Position';
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
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Options.FilterOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.displayName = 'proto.event_store.grpc.streams.ReadReq.Options.FilterOptions';
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
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.repeatedFields_, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.displayName = 'proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression';
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
proto.event_store.grpc.streams.ReadReq.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadReq.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadReq.Empty.displayName = 'proto.event_store.grpc.streams.ReadReq.Empty';
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
proto.event_store.grpc.streams.ReadResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadResp.displayName = 'proto.event_store.grpc.streams.ReadResp';
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
proto.event_store.grpc.streams.ReadResp.ReadEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.ReadResp.ReadEvent.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.ReadResp.ReadEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadResp.ReadEvent.displayName = 'proto.event_store.grpc.streams.ReadResp.ReadEvent';
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.displayName = 'proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent';
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
proto.event_store.grpc.streams.ReadResp.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.ReadResp.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.ReadResp.Empty.displayName = 'proto.event_store.grpc.streams.ReadResp.Empty';
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
proto.event_store.grpc.streams.AppendReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.AppendReq.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.AppendReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.AppendReq.displayName = 'proto.event_store.grpc.streams.AppendReq';
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
proto.event_store.grpc.streams.AppendReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.AppendReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.AppendReq.Options.displayName = 'proto.event_store.grpc.streams.AppendReq.Options';
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
proto.event_store.grpc.streams.AppendReq.ProposedMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.AppendReq.ProposedMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.AppendReq.ProposedMessage.displayName = 'proto.event_store.grpc.streams.AppendReq.ProposedMessage';
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
proto.event_store.grpc.streams.AppendReq.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.AppendReq.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.AppendReq.Empty.displayName = 'proto.event_store.grpc.streams.AppendReq.Empty';
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
proto.event_store.grpc.streams.AppendResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.AppendResp.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.AppendResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.AppendResp.displayName = 'proto.event_store.grpc.streams.AppendResp';
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
proto.event_store.grpc.streams.AppendResp.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.AppendResp.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.AppendResp.Position.displayName = 'proto.event_store.grpc.streams.AppendResp.Position';
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
proto.event_store.grpc.streams.AppendResp.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.AppendResp.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.AppendResp.Empty.displayName = 'proto.event_store.grpc.streams.AppendResp.Empty';
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
proto.event_store.grpc.streams.DeleteReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.DeleteReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.DeleteReq.displayName = 'proto.event_store.grpc.streams.DeleteReq';
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
proto.event_store.grpc.streams.DeleteReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.DeleteReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.DeleteReq.Options.displayName = 'proto.event_store.grpc.streams.DeleteReq.Options';
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
proto.event_store.grpc.streams.DeleteReq.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.DeleteReq.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.DeleteReq.Empty.displayName = 'proto.event_store.grpc.streams.DeleteReq.Empty';
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
proto.event_store.grpc.streams.DeleteResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.DeleteResp.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.DeleteResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.DeleteResp.displayName = 'proto.event_store.grpc.streams.DeleteResp';
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
proto.event_store.grpc.streams.DeleteResp.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.DeleteResp.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.DeleteResp.Position.displayName = 'proto.event_store.grpc.streams.DeleteResp.Position';
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
proto.event_store.grpc.streams.DeleteResp.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.DeleteResp.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.DeleteResp.Empty.displayName = 'proto.event_store.grpc.streams.DeleteResp.Empty';
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
proto.event_store.grpc.streams.TombstoneReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.TombstoneReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.TombstoneReq.displayName = 'proto.event_store.grpc.streams.TombstoneReq';
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
proto.event_store.grpc.streams.TombstoneReq.Options = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.TombstoneReq.Options, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.TombstoneReq.Options.displayName = 'proto.event_store.grpc.streams.TombstoneReq.Options';
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
proto.event_store.grpc.streams.TombstoneReq.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.TombstoneReq.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.TombstoneReq.Empty.displayName = 'proto.event_store.grpc.streams.TombstoneReq.Empty';
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
proto.event_store.grpc.streams.TombstoneResp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.TombstoneResp.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.TombstoneResp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.TombstoneResp.displayName = 'proto.event_store.grpc.streams.TombstoneResp';
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
proto.event_store.grpc.streams.TombstoneResp.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.TombstoneResp.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.TombstoneResp.Position.displayName = 'proto.event_store.grpc.streams.TombstoneResp.Position';
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
proto.event_store.grpc.streams.TombstoneResp.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.TombstoneResp.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.TombstoneResp.Empty.displayName = 'proto.event_store.grpc.streams.TombstoneResp.Empty';
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
proto.event_store.grpc.streams.UUID = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.event_store.grpc.streams.UUID.oneofGroups_);
};
goog.inherits(proto.event_store.grpc.streams.UUID, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.UUID.displayName = 'proto.event_store.grpc.streams.UUID';
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
proto.event_store.grpc.streams.UUID.Structured = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event_store.grpc.streams.UUID.Structured, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event_store.grpc.streams.UUID.Structured.displayName = 'proto.event_store.grpc.streams.UUID.Structured';
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
proto.event_store.grpc.streams.ReadReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.grpc.streams.ReadReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.ReadReq}
 */
proto.event_store.grpc.streams.ReadReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq;
  return proto.event_store.grpc.streams.ReadReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq}
 */
proto.event_store.grpc.streams.ReadReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.ReadReq.Options;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.ReadReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.serializeBinaryToWriter
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
proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_ = [[1,2],[5,6],[7,8]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptionsCase = {
  STREAM_OPTIONS_NOT_SET: 0,
  STREAM: 1,
  ALL: 2
};

/**
 * @return {proto.event_store.grpc.streams.ReadReq.Options.StreamOptionsCase}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getStreamOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadReq.Options.StreamOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.CountOptionsCase = {
  COUNT_OPTIONS_NOT_SET: 0,
  COUNT: 5,
  SUBSCRIPTION: 6
};

/**
 * @return {proto.event_store.grpc.streams.ReadReq.Options.CountOptionsCase}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getCountOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadReq.Options.CountOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[1]));
};

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptionsCase = {
  FILTER_OPTIONS_NOT_SET: 0,
  FILTER: 7,
  NO_FILTER: 8
};

/**
 * @return {proto.event_store.grpc.streams.ReadReq.Options.FilterOptionsCase}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getFilterOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadReq.Options.FilterOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[2]));
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
proto.event_store.grpc.streams.ReadReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    stream: (f = msg.getStream()) && proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.toObject(includeInstance, f),
    all: (f = msg.getAll()) && proto.event_store.grpc.streams.ReadReq.Options.AllOptions.toObject(includeInstance, f),
    readDirection: jspb.Message.getFieldWithDefault(msg, 3, 0),
    resolveLinks: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    count: jspb.Message.getFieldWithDefault(msg, 5, 0),
    subscription: (f = msg.getSubscription()) && proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.toObject(includeInstance, f),
    filter: (f = msg.getFilter()) && proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.toObject(includeInstance, f),
    noFilter: (f = msg.getNoFilter()) && proto.event_store.grpc.streams.ReadReq.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Options}
 */
proto.event_store.grpc.streams.ReadReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Options;
  return proto.event_store.grpc.streams.ReadReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Options}
 */
proto.event_store.grpc.streams.ReadReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.ReadReq.Options.StreamOptions;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.deserializeBinaryFromReader);
      msg.setStream(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.ReadReq.Options.AllOptions;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.AllOptions.deserializeBinaryFromReader);
      msg.setAll(value);
      break;
    case 3:
      var value = /** @type {!proto.event_store.grpc.streams.ReadReq.Options.ReadDirection} */ (reader.readEnum());
      msg.setReadDirection(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setResolveLinks(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCount(value);
      break;
    case 6:
      var value = new proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.deserializeBinaryFromReader);
      msg.setSubscription(value);
      break;
    case 7:
      var value = new proto.event_store.grpc.streams.ReadReq.Options.FilterOptions;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    case 8:
      var value = new proto.event_store.grpc.streams.ReadReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Empty.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.ReadReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStream();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.serializeBinaryToWriter
    );
  }
  f = message.getAll();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.AllOptions.serializeBinaryToWriter
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
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getSubscription();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.serializeBinaryToWriter
    );
  }
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.serializeBinaryToWriter
    );
  }
  f = message.getNoFilter();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.event_store.grpc.streams.ReadReq.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.ReadDirection = {
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
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.oneofGroups_ = [[2,3]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.RevisionOptionsCase = {
  REVISION_OPTIONS_NOT_SET: 0,
  REVISION: 2,
  START: 3
};

/**
 * @return {proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.RevisionOptionsCase}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.getRevisionOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.RevisionOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.oneofGroups_[0]));
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
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.StreamOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    revision: jspb.Message.getFieldWithDefault(msg, 2, 0),
    start: (f = msg.getStart()) && proto.event_store.grpc.streams.ReadReq.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.StreamOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Options.StreamOptions;
  return proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.StreamOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.StreamOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStreamName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setRevision(value);
      break;
    case 3:
      var value = new proto.event_store.grpc.streams.ReadReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Empty.deserializeBinaryFromReader);
      msg.setStart(value);
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
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.StreamOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getStart();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.grpc.streams.ReadReq.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional string stream_name = 1;
 * @return {string}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.getStreamName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.setStreamName = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 revision = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.getRevision = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.setRevision = function(value) {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.clearRevision = function() {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Empty start = 3;
 * @return {?proto.event_store.grpc.streams.ReadReq.Empty}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Empty, 3));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Empty|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.setStart = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.clearStart = function() {
  this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.StreamOptions.prototype.hasStart = function() {
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
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.AllOptionsCase = {
  ALL_OPTIONS_NOT_SET: 0,
  POSITION: 1,
  START: 2
};

/**
 * @return {proto.event_store.grpc.streams.ReadReq.Options.AllOptions.AllOptionsCase}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.getAllOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadReq.Options.AllOptions.AllOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadReq.Options.AllOptions.oneofGroups_[0]));
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
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Options.AllOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.AllOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.grpc.streams.ReadReq.Options.Position.toObject(includeInstance, f),
    start: (f = msg.getStart()) && proto.event_store.grpc.streams.ReadReq.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.AllOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Options.AllOptions;
  return proto.event_store.grpc.streams.ReadReq.Options.AllOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.AllOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.AllOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.ReadReq.Options.Position;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.ReadReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Empty.deserializeBinaryFromReader);
      msg.setStart(value);
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
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Options.AllOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.AllOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.Position.serializeBinaryToWriter
    );
  }
  f = message.getStart();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.ReadReq.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional Position position = 1;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options.Position}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.getPosition = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options.Position, 1));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options.Position|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.setPosition = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.event_store.grpc.streams.ReadReq.Options.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.clearPosition = function() {
  this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty start = 2;
 * @return {?proto.event_store.grpc.streams.ReadReq.Empty}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.getStart = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Empty, 2));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Empty|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.setStart = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.event_store.grpc.streams.ReadReq.Options.AllOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.clearStart = function() {
  this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.AllOptions.prototype.hasStart = function() {
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
proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions;
  return proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.grpc.streams.ReadReq.Options.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Options.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, 0),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.Position}
 */
proto.event_store.grpc.streams.ReadReq.Options.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Options.Position;
  return proto.event_store.grpc.streams.ReadReq.Options.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.Position}
 */
proto.event_store.grpc.streams.ReadReq.Options.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
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
proto.event_store.grpc.streams.ReadReq.Options.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Options.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.Position.prototype.getCommitPosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadReq.Options.Position.prototype.setCommitPosition = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.Position.prototype.getPreparePosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadReq.Options.Position.prototype.setPreparePosition = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_ = [[1,2],[3,4]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.FilterCase = {
  FILTER_NOT_SET: 0,
  STREAM_NAME: 1,
  EVENT_TYPE: 2
};

/**
 * @return {proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.FilterCase}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.getFilterCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.FilterCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.WindowCase = {
  WINDOW_NOT_SET: 0,
  MAX: 3,
  COUNT: 4
};

/**
 * @return {proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.WindowCase}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.getWindowCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.WindowCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_[1]));
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
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamName: (f = msg.getStreamName()) && proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.toObject(includeInstance, f),
    eventType: (f = msg.getEventType()) && proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.toObject(includeInstance, f),
    max: jspb.Message.getFieldWithDefault(msg, 3, 0),
    count: (f = msg.getCount()) && proto.event_store.grpc.streams.ReadReq.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Options.FilterOptions;
  return proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader);
      msg.setStreamName(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader);
      msg.setEventType(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMax(value);
      break;
    case 4:
      var value = new proto.event_store.grpc.streams.ReadReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadReq.Empty.deserializeBinaryFromReader);
      msg.setCount(value);
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
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamName();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter
    );
  }
  f = message.getEventType();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getCount();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.grpc.streams.ReadReq.Empty.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.repeatedFields_ = [2];



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
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression;
  return proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.serializeBinaryToWriter = function(message, writer) {
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
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.getRegex = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.setRegex = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string prefix = 2;
 * @return {!Array<string>}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.getPrefixList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/** @param {!Array<string>} value */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.setPrefixList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.addPrefix = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression.prototype.clearPrefixList = function() {
  this.setPrefixList([]);
};


/**
 * optional Expression stream_name = 1;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.getStreamName = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression, 1));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.setStreamName = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.clearStreamName = function() {
  this.setStreamName(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.hasStreamName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Expression event_type = 2;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.getEventType = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression, 2));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.Expression|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.setEventType = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.clearEventType = function() {
  this.setEventType(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.hasEventType = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int32 max = 3;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.getMax = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.setMax = function(value) {
  jspb.Message.setOneofField(this, 3, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.clearMax = function() {
  jspb.Message.setOneofField(this, 3, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.hasMax = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Empty count = 4;
 * @return {?proto.event_store.grpc.streams.ReadReq.Empty}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.getCount = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Empty, 4));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Empty|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.setCount = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.clearCount = function() {
  this.setCount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.FilterOptions.prototype.hasCount = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional StreamOptions stream = 1;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options.StreamOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getStream = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options.StreamOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options.StreamOptions, 1));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options.StreamOptions|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setStream = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.clearStream = function() {
  this.setStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.hasStream = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional AllOptions all = 2;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options.AllOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getAll = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options.AllOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options.AllOptions, 2));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options.AllOptions|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setAll = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.clearAll = function() {
  this.setAll(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.hasAll = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ReadDirection read_direction = 3;
 * @return {!proto.event_store.grpc.streams.ReadReq.Options.ReadDirection}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getReadDirection = function() {
  return /** @type {!proto.event_store.grpc.streams.ReadReq.Options.ReadDirection} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {!proto.event_store.grpc.streams.ReadReq.Options.ReadDirection} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setReadDirection = function(value) {
  jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional bool resolve_links = 4;
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getResolveLinks = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/** @param {boolean} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setResolveLinks = function(value) {
  jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int32 count = 5;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setCount = function(value) {
  jspb.Message.setOneofField(this, 5, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[1], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.clearCount = function() {
  jspb.Message.setOneofField(this, 5, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[1], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.hasCount = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SubscriptionOptions subscription = 6;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getSubscription = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions, 6));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options.SubscriptionOptions|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setSubscription = function(value) {
  jspb.Message.setOneofWrapperField(this, 6, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.clearSubscription = function() {
  this.setSubscription(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.hasSubscription = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional FilterOptions filter = 7;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getFilter = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options.FilterOptions, 7));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options.FilterOptions|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setFilter = function(value) {
  jspb.Message.setOneofWrapperField(this, 7, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[2], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.clearFilter = function() {
  this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional Empty no_filter = 8;
 * @return {?proto.event_store.grpc.streams.ReadReq.Empty}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.getNoFilter = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Empty, 8));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Empty|undefined} value */
proto.event_store.grpc.streams.ReadReq.Options.prototype.setNoFilter = function(value) {
  jspb.Message.setOneofWrapperField(this, 8, proto.event_store.grpc.streams.ReadReq.Options.oneofGroups_[2], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.clearNoFilter = function() {
  this.setNoFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.Options.prototype.hasNoFilter = function() {
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
proto.event_store.grpc.streams.ReadReq.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadReq.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadReq.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.ReadReq.Empty}
 */
proto.event_store.grpc.streams.ReadReq.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadReq.Empty;
  return proto.event_store.grpc.streams.ReadReq.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadReq.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadReq.Empty}
 */
proto.event_store.grpc.streams.ReadReq.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.ReadReq.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadReq.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadReq.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadReq.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.grpc.streams.ReadReq.Options}
 */
proto.event_store.grpc.streams.ReadReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadReq.Options, 1));
};


/** @param {?proto.event_store.grpc.streams.ReadReq.Options|undefined} value */
proto.event_store.grpc.streams.ReadReq.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadReq.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadReq.prototype.hasOptions = function() {
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
proto.event_store.grpc.streams.ReadResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    event: (f = msg.getEvent()) && proto.event_store.grpc.streams.ReadResp.ReadEvent.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.ReadResp}
 */
proto.event_store.grpc.streams.ReadResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadResp;
  return proto.event_store.grpc.streams.ReadResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadResp}
 */
proto.event_store.grpc.streams.ReadResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.ReadResp.ReadEvent;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadResp.ReadEvent.deserializeBinaryFromReader);
      msg.setEvent(value);
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
proto.event_store.grpc.streams.ReadResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvent();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.ReadResp.ReadEvent.serializeBinaryToWriter
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.oneofGroups_ = [[3,4]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.PositionCase = {
  POSITION_NOT_SET: 0,
  COMMIT_POSITION: 3,
  NO_POSITION: 4
};

/**
 * @return {proto.event_store.grpc.streams.ReadResp.ReadEvent.PositionCase}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.getPositionCase = function() {
  return /** @type {proto.event_store.grpc.streams.ReadResp.ReadEvent.PositionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.ReadResp.ReadEvent.oneofGroups_[0]));
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadResp.ReadEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadResp.ReadEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.toObject = function(includeInstance, msg) {
  var f, obj = {
    event: (f = msg.getEvent()) && proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.toObject(includeInstance, f),
    link: (f = msg.getLink()) && proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.toObject(includeInstance, f),
    commitPosition: jspb.Message.getFieldWithDefault(msg, 3, 0),
    noPosition: (f = msg.getNoPosition()) && proto.event_store.grpc.streams.ReadResp.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.ReadResp.ReadEvent}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadResp.ReadEvent;
  return proto.event_store.grpc.streams.ReadResp.ReadEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadResp.ReadEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadResp.ReadEvent}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader);
      msg.setEvent(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader);
      msg.setLink(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCommitPosition(value);
      break;
    case 4:
      var value = new proto.event_store.grpc.streams.ReadResp.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.ReadResp.Empty.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadResp.ReadEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadResp.ReadEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEvent();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter
    );
  }
  f = message.getLink();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getNoPosition();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.grpc.streams.ReadResp.Empty.serializeBinaryToWriter
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && proto.event_store.grpc.streams.UUID.toObject(includeInstance, f),
    streamName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    streamRevision: jspb.Message.getFieldWithDefault(msg, 3, 0),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 4, 0),
    commitPosition: jspb.Message.getFieldWithDefault(msg, 5, 0),
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
 * @return {!proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent;
  return proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.UUID;
      reader.readMessage(value,proto.event_store.grpc.streams.UUID.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStreamName(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setStreamRevision(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setPreparePosition(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCommitPosition(value);
      break;
    case 6:
      var value = msg.getMetadataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "");
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.UUID.serializeBinaryToWriter
    );
  }
  f = message.getStreamName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStreamRevision();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getPreparePosition();
  if (f !== 0) {
    writer.writeUint64(
      4,
      f
    );
  }
  f = message.getCommitPosition();
  if (f !== 0) {
    writer.writeUint64(
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
 * optional UUID id = 1;
 * @return {?proto.event_store.grpc.streams.UUID}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getId = function() {
  return /** @type{?proto.event_store.grpc.streams.UUID} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.UUID, 1));
};


/** @param {?proto.event_store.grpc.streams.UUID|undefined} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setId = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.clearId = function() {
  this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string stream_name = 2;
 * @return {string}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getStreamName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setStreamName = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint64 stream_revision = 3;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getStreamRevision = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setStreamRevision = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional uint64 prepare_position = 4;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getPreparePosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setPreparePosition = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint64 commit_position = 5;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCommitPosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setCommitPosition = function(value) {
  jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * map<string, string> metadata = 6;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.clearMetadataMap = function() {
  this.getMetadataMap().clear();
};


/**
 * optional bytes custom_metadata = 7;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * optional bytes custom_metadata = 7;
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {string}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata_asB64 = function() {
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getCustomMetadata_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCustomMetadata()));
};


/** @param {!(string|Uint8Array)} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setCustomMetadata = function(value) {
  jspb.Message.setProto3BytesField(this, 7, value);
};


/**
 * optional bytes data = 8;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * optional bytes data = 8;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getData_asB64 = function() {
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
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/** @param {!(string|Uint8Array)} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent.prototype.setData = function(value) {
  jspb.Message.setProto3BytesField(this, 8, value);
};


/**
 * optional RecordedEvent event = 1;
 * @return {?proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.getEvent = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent, 1));
};


/** @param {?proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent|undefined} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.setEvent = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.clearEvent = function() {
  this.setEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.hasEvent = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional RecordedEvent link = 2;
 * @return {?proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.getLink = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent, 2));
};


/** @param {?proto.event_store.grpc.streams.ReadResp.ReadEvent.RecordedEvent|undefined} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.setLink = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.clearLink = function() {
  this.setLink(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.hasLink = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 commit_position = 3;
 * @return {number}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.getCommitPosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.setCommitPosition = function(value) {
  jspb.Message.setOneofField(this, 3, proto.event_store.grpc.streams.ReadResp.ReadEvent.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.clearCommitPosition = function() {
  jspb.Message.setOneofField(this, 3, proto.event_store.grpc.streams.ReadResp.ReadEvent.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.hasCommitPosition = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Empty no_position = 4;
 * @return {?proto.event_store.grpc.streams.ReadResp.Empty}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.getNoPosition = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadResp.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadResp.Empty, 4));
};


/** @param {?proto.event_store.grpc.streams.ReadResp.Empty|undefined} value */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.setNoPosition = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.event_store.grpc.streams.ReadResp.ReadEvent.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.clearNoPosition = function() {
  this.setNoPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadResp.ReadEvent.prototype.hasNoPosition = function() {
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
proto.event_store.grpc.streams.ReadResp.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.ReadResp.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.ReadResp.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.ReadResp.Empty}
 */
proto.event_store.grpc.streams.ReadResp.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.ReadResp.Empty;
  return proto.event_store.grpc.streams.ReadResp.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.ReadResp.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.ReadResp.Empty}
 */
proto.event_store.grpc.streams.ReadResp.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.ReadResp.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.ReadResp.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.ReadResp.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.ReadResp.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional ReadEvent event = 1;
 * @return {?proto.event_store.grpc.streams.ReadResp.ReadEvent}
 */
proto.event_store.grpc.streams.ReadResp.prototype.getEvent = function() {
  return /** @type{?proto.event_store.grpc.streams.ReadResp.ReadEvent} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.ReadResp.ReadEvent, 1));
};


/** @param {?proto.event_store.grpc.streams.ReadResp.ReadEvent|undefined} value */
proto.event_store.grpc.streams.ReadResp.prototype.setEvent = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.ReadResp.prototype.clearEvent = function() {
  this.setEvent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.ReadResp.prototype.hasEvent = function() {
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
proto.event_store.grpc.streams.AppendReq.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.AppendReq.ContentCase = {
  CONTENT_NOT_SET: 0,
  OPTIONS: 1,
  PROPOSED_MESSAGE: 2
};

/**
 * @return {proto.event_store.grpc.streams.AppendReq.ContentCase}
 */
proto.event_store.grpc.streams.AppendReq.prototype.getContentCase = function() {
  return /** @type {proto.event_store.grpc.streams.AppendReq.ContentCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.AppendReq.oneofGroups_[0]));
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
proto.event_store.grpc.streams.AppendReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.AppendReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.AppendReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.grpc.streams.AppendReq.Options.toObject(includeInstance, f),
    proposedMessage: (f = msg.getProposedMessage()) && proto.event_store.grpc.streams.AppendReq.ProposedMessage.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.AppendReq}
 */
proto.event_store.grpc.streams.AppendReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.AppendReq;
  return proto.event_store.grpc.streams.AppendReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.AppendReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.AppendReq}
 */
proto.event_store.grpc.streams.AppendReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.AppendReq.Options;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendReq.Options.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.AppendReq.ProposedMessage;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendReq.ProposedMessage.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.AppendReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.AppendReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.AppendReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.AppendReq.Options.serializeBinaryToWriter
    );
  }
  f = message.getProposedMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.AppendReq.ProposedMessage.serializeBinaryToWriter
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
proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.AppendReq.Options.ExpectedStreamRevisionCase = {
  EXPECTED_STREAM_REVISION_NOT_SET: 0,
  REVISION: 2,
  NO_STREAM: 3,
  ANY: 4,
  STREAM_EXISTS: 5
};

/**
 * @return {proto.event_store.grpc.streams.AppendReq.Options.ExpectedStreamRevisionCase}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.getExpectedStreamRevisionCase = function() {
  return /** @type {proto.event_store.grpc.streams.AppendReq.Options.ExpectedStreamRevisionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_[0]));
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
proto.event_store.grpc.streams.AppendReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.AppendReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.AppendReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    revision: jspb.Message.getFieldWithDefault(msg, 2, 0),
    noStream: (f = msg.getNoStream()) && proto.event_store.grpc.streams.AppendReq.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && proto.event_store.grpc.streams.AppendReq.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && proto.event_store.grpc.streams.AppendReq.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.AppendReq.Options}
 */
proto.event_store.grpc.streams.AppendReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.AppendReq.Options;
  return proto.event_store.grpc.streams.AppendReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.AppendReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.AppendReq.Options}
 */
proto.event_store.grpc.streams.AppendReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStreamName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setRevision(value);
      break;
    case 3:
      var value = new proto.event_store.grpc.streams.AppendReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendReq.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 4:
      var value = new proto.event_store.grpc.streams.AppendReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendReq.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 5:
      var value = new proto.event_store.grpc.streams.AppendReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendReq.Empty.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.AppendReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.AppendReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.AppendReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.grpc.streams.AppendReq.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.grpc.streams.AppendReq.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.event_store.grpc.streams.AppendReq.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional string stream_name = 1;
 * @return {string}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.getStreamName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.event_store.grpc.streams.AppendReq.Options.prototype.setStreamName = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 revision = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.getRevision = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.AppendReq.Options.prototype.setRevision = function(value) {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.clearRevision = function() {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Empty no_stream = 3;
 * @return {?proto.event_store.grpc.streams.AppendReq.Empty}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendReq.Empty, 3));
};


/** @param {?proto.event_store.grpc.streams.AppendReq.Empty|undefined} value */
proto.event_store.grpc.streams.AppendReq.Options.prototype.setNoStream = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.clearNoStream = function() {
  this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Empty any = 4;
 * @return {?proto.event_store.grpc.streams.AppendReq.Empty}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.getAny = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendReq.Empty, 4));
};


/** @param {?proto.event_store.grpc.streams.AppendReq.Empty|undefined} value */
proto.event_store.grpc.streams.AppendReq.Options.prototype.setAny = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.clearAny = function() {
  this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.hasAny = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Empty stream_exists = 5;
 * @return {?proto.event_store.grpc.streams.AppendReq.Empty}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.getStreamExists = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendReq.Empty, 5));
};


/** @param {?proto.event_store.grpc.streams.AppendReq.Empty|undefined} value */
proto.event_store.grpc.streams.AppendReq.Options.prototype.setStreamExists = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.event_store.grpc.streams.AppendReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.clearStreamExists = function() {
  this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendReq.Options.prototype.hasStreamExists = function() {
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
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.AppendReq.ProposedMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.AppendReq.ProposedMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && proto.event_store.grpc.streams.UUID.toObject(includeInstance, f),
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
 * @return {!proto.event_store.grpc.streams.AppendReq.ProposedMessage}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.AppendReq.ProposedMessage;
  return proto.event_store.grpc.streams.AppendReq.ProposedMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.AppendReq.ProposedMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.AppendReq.ProposedMessage}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.UUID;
      reader.readMessage(value,proto.event_store.grpc.streams.UUID.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = msg.getMetadataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "");
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
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.AppendReq.ProposedMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.AppendReq.ProposedMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.UUID.serializeBinaryToWriter
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
 * optional UUID id = 1;
 * @return {?proto.event_store.grpc.streams.UUID}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getId = function() {
  return /** @type{?proto.event_store.grpc.streams.UUID} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.UUID, 1));
};


/** @param {?proto.event_store.grpc.streams.UUID|undefined} value */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.setId = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.clearId = function() {
  this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * map<string, string> metadata = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.clearMetadataMap = function() {
  this.getMetadataMap().clear();
};


/**
 * optional bytes custom_metadata = 3;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getCustomMetadata = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes custom_metadata = 3;
 * This is a type-conversion wrapper around `getCustomMetadata()`
 * @return {string}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getCustomMetadata_asB64 = function() {
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
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getCustomMetadata_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCustomMetadata()));
};


/** @param {!(string|Uint8Array)} value */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.setCustomMetadata = function(value) {
  jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional bytes data = 4;
 * @return {!(string|Uint8Array)}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes data = 4;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getData_asB64 = function() {
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
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/** @param {!(string|Uint8Array)} value */
proto.event_store.grpc.streams.AppendReq.ProposedMessage.prototype.setData = function(value) {
  jspb.Message.setProto3BytesField(this, 4, value);
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
proto.event_store.grpc.streams.AppendReq.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.AppendReq.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.AppendReq.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.AppendReq.Empty}
 */
proto.event_store.grpc.streams.AppendReq.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.AppendReq.Empty;
  return proto.event_store.grpc.streams.AppendReq.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.AppendReq.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.AppendReq.Empty}
 */
proto.event_store.grpc.streams.AppendReq.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.AppendReq.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.AppendReq.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.AppendReq.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendReq.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.grpc.streams.AppendReq.Options}
 */
proto.event_store.grpc.streams.AppendReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendReq.Options, 1));
};


/** @param {?proto.event_store.grpc.streams.AppendReq.Options|undefined} value */
proto.event_store.grpc.streams.AppendReq.prototype.setOptions = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.event_store.grpc.streams.AppendReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendReq.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendReq.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ProposedMessage proposed_message = 2;
 * @return {?proto.event_store.grpc.streams.AppendReq.ProposedMessage}
 */
proto.event_store.grpc.streams.AppendReq.prototype.getProposedMessage = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendReq.ProposedMessage} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendReq.ProposedMessage, 2));
};


/** @param {?proto.event_store.grpc.streams.AppendReq.ProposedMessage|undefined} value */
proto.event_store.grpc.streams.AppendReq.prototype.setProposedMessage = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.event_store.grpc.streams.AppendReq.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendReq.prototype.clearProposedMessage = function() {
  this.setProposedMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendReq.prototype.hasProposedMessage = function() {
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
proto.event_store.grpc.streams.AppendResp.oneofGroups_ = [[1,2],[3,4]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.AppendResp.CurrentRevisionOptionsCase = {
  CURRENT_REVISION_OPTIONS_NOT_SET: 0,
  CURRENT_REVISION: 1,
  NO_STREAM: 2
};

/**
 * @return {proto.event_store.grpc.streams.AppendResp.CurrentRevisionOptionsCase}
 */
proto.event_store.grpc.streams.AppendResp.prototype.getCurrentRevisionOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.AppendResp.CurrentRevisionOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.AppendResp.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.AppendResp.PositionOptionsCase = {
  POSITION_OPTIONS_NOT_SET: 0,
  POSITION: 3,
  EMPTY: 4
};

/**
 * @return {proto.event_store.grpc.streams.AppendResp.PositionOptionsCase}
 */
proto.event_store.grpc.streams.AppendResp.prototype.getPositionOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.AppendResp.PositionOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.AppendResp.oneofGroups_[1]));
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
proto.event_store.grpc.streams.AppendResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.AppendResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.AppendResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    currentRevision: jspb.Message.getFieldWithDefault(msg, 1, 0),
    noStream: (f = msg.getNoStream()) && proto.event_store.grpc.streams.AppendResp.Empty.toObject(includeInstance, f),
    position: (f = msg.getPosition()) && proto.event_store.grpc.streams.AppendResp.Position.toObject(includeInstance, f),
    empty: (f = msg.getEmpty()) && proto.event_store.grpc.streams.AppendResp.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.AppendResp}
 */
proto.event_store.grpc.streams.AppendResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.AppendResp;
  return proto.event_store.grpc.streams.AppendResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.AppendResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.AppendResp}
 */
proto.event_store.grpc.streams.AppendResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCurrentRevision(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.AppendResp.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendResp.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 3:
      var value = new proto.event_store.grpc.streams.AppendResp.Position;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendResp.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 4:
      var value = new proto.event_store.grpc.streams.AppendResp.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.AppendResp.Empty.deserializeBinaryFromReader);
      msg.setEmpty(value);
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
proto.event_store.grpc.streams.AppendResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.AppendResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.AppendResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.AppendResp.Empty.serializeBinaryToWriter
    );
  }
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.grpc.streams.AppendResp.Position.serializeBinaryToWriter
    );
  }
  f = message.getEmpty();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.grpc.streams.AppendResp.Empty.serializeBinaryToWriter
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
proto.event_store.grpc.streams.AppendResp.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.AppendResp.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.AppendResp.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendResp.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, 0),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.event_store.grpc.streams.AppendResp.Position}
 */
proto.event_store.grpc.streams.AppendResp.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.AppendResp.Position;
  return proto.event_store.grpc.streams.AppendResp.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.AppendResp.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.AppendResp.Position}
 */
proto.event_store.grpc.streams.AppendResp.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
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
proto.event_store.grpc.streams.AppendResp.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.AppendResp.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.AppendResp.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendResp.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {number}
 */
proto.event_store.grpc.streams.AppendResp.Position.prototype.getCommitPosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.AppendResp.Position.prototype.setCommitPosition = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.AppendResp.Position.prototype.getPreparePosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.AppendResp.Position.prototype.setPreparePosition = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
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
proto.event_store.grpc.streams.AppendResp.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.AppendResp.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.AppendResp.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendResp.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.AppendResp.Empty}
 */
proto.event_store.grpc.streams.AppendResp.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.AppendResp.Empty;
  return proto.event_store.grpc.streams.AppendResp.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.AppendResp.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.AppendResp.Empty}
 */
proto.event_store.grpc.streams.AppendResp.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.AppendResp.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.AppendResp.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.AppendResp.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.AppendResp.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional uint64 current_revision = 1;
 * @return {number}
 */
proto.event_store.grpc.streams.AppendResp.prototype.getCurrentRevision = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.AppendResp.prototype.setCurrentRevision = function(value) {
  jspb.Message.setOneofField(this, 1, proto.event_store.grpc.streams.AppendResp.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.AppendResp.prototype.clearCurrentRevision = function() {
  jspb.Message.setOneofField(this, 1, proto.event_store.grpc.streams.AppendResp.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendResp.prototype.hasCurrentRevision = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty no_stream = 2;
 * @return {?proto.event_store.grpc.streams.AppendResp.Empty}
 */
proto.event_store.grpc.streams.AppendResp.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendResp.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendResp.Empty, 2));
};


/** @param {?proto.event_store.grpc.streams.AppendResp.Empty|undefined} value */
proto.event_store.grpc.streams.AppendResp.prototype.setNoStream = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.event_store.grpc.streams.AppendResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendResp.prototype.clearNoStream = function() {
  this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendResp.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Position position = 3;
 * @return {?proto.event_store.grpc.streams.AppendResp.Position}
 */
proto.event_store.grpc.streams.AppendResp.prototype.getPosition = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendResp.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendResp.Position, 3));
};


/** @param {?proto.event_store.grpc.streams.AppendResp.Position|undefined} value */
proto.event_store.grpc.streams.AppendResp.prototype.setPosition = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.event_store.grpc.streams.AppendResp.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendResp.prototype.clearPosition = function() {
  this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendResp.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Empty empty = 4;
 * @return {?proto.event_store.grpc.streams.AppendResp.Empty}
 */
proto.event_store.grpc.streams.AppendResp.prototype.getEmpty = function() {
  return /** @type{?proto.event_store.grpc.streams.AppendResp.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.AppendResp.Empty, 4));
};


/** @param {?proto.event_store.grpc.streams.AppendResp.Empty|undefined} value */
proto.event_store.grpc.streams.AppendResp.prototype.setEmpty = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.event_store.grpc.streams.AppendResp.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.AppendResp.prototype.clearEmpty = function() {
  this.setEmpty(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.AppendResp.prototype.hasEmpty = function() {
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
proto.event_store.grpc.streams.DeleteReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.DeleteReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.DeleteReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.grpc.streams.DeleteReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.DeleteReq}
 */
proto.event_store.grpc.streams.DeleteReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.DeleteReq;
  return proto.event_store.grpc.streams.DeleteReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.DeleteReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.DeleteReq}
 */
proto.event_store.grpc.streams.DeleteReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.DeleteReq.Options;
      reader.readMessage(value,proto.event_store.grpc.streams.DeleteReq.Options.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.DeleteReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.DeleteReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.DeleteReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.DeleteReq.Options.serializeBinaryToWriter
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
proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.DeleteReq.Options.ExpectedStreamRevisionCase = {
  EXPECTED_STREAM_REVISION_NOT_SET: 0,
  REVISION: 2,
  NO_STREAM: 3,
  ANY: 4,
  STREAM_EXISTS: 5
};

/**
 * @return {proto.event_store.grpc.streams.DeleteReq.Options.ExpectedStreamRevisionCase}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.getExpectedStreamRevisionCase = function() {
  return /** @type {proto.event_store.grpc.streams.DeleteReq.Options.ExpectedStreamRevisionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_[0]));
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
proto.event_store.grpc.streams.DeleteReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.DeleteReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.DeleteReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    revision: jspb.Message.getFieldWithDefault(msg, 2, 0),
    noStream: (f = msg.getNoStream()) && proto.event_store.grpc.streams.DeleteReq.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && proto.event_store.grpc.streams.DeleteReq.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && proto.event_store.grpc.streams.DeleteReq.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.DeleteReq.Options}
 */
proto.event_store.grpc.streams.DeleteReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.DeleteReq.Options;
  return proto.event_store.grpc.streams.DeleteReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.DeleteReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.DeleteReq.Options}
 */
proto.event_store.grpc.streams.DeleteReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStreamName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setRevision(value);
      break;
    case 3:
      var value = new proto.event_store.grpc.streams.DeleteReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.DeleteReq.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 4:
      var value = new proto.event_store.grpc.streams.DeleteReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.DeleteReq.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 5:
      var value = new proto.event_store.grpc.streams.DeleteReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.DeleteReq.Empty.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.DeleteReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.DeleteReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.DeleteReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.grpc.streams.DeleteReq.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.grpc.streams.DeleteReq.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.event_store.grpc.streams.DeleteReq.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional string stream_name = 1;
 * @return {string}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.getStreamName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.setStreamName = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 revision = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.getRevision = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.setRevision = function(value) {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.clearRevision = function() {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Empty no_stream = 3;
 * @return {?proto.event_store.grpc.streams.DeleteReq.Empty}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.grpc.streams.DeleteReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.DeleteReq.Empty, 3));
};


/** @param {?proto.event_store.grpc.streams.DeleteReq.Empty|undefined} value */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.setNoStream = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.clearNoStream = function() {
  this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Empty any = 4;
 * @return {?proto.event_store.grpc.streams.DeleteReq.Empty}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.getAny = function() {
  return /** @type{?proto.event_store.grpc.streams.DeleteReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.DeleteReq.Empty, 4));
};


/** @param {?proto.event_store.grpc.streams.DeleteReq.Empty|undefined} value */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.setAny = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.clearAny = function() {
  this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.hasAny = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Empty stream_exists = 5;
 * @return {?proto.event_store.grpc.streams.DeleteReq.Empty}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.getStreamExists = function() {
  return /** @type{?proto.event_store.grpc.streams.DeleteReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.DeleteReq.Empty, 5));
};


/** @param {?proto.event_store.grpc.streams.DeleteReq.Empty|undefined} value */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.setStreamExists = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.event_store.grpc.streams.DeleteReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.clearStreamExists = function() {
  this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.DeleteReq.Options.prototype.hasStreamExists = function() {
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
proto.event_store.grpc.streams.DeleteReq.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.DeleteReq.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.DeleteReq.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteReq.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.DeleteReq.Empty}
 */
proto.event_store.grpc.streams.DeleteReq.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.DeleteReq.Empty;
  return proto.event_store.grpc.streams.DeleteReq.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.DeleteReq.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.DeleteReq.Empty}
 */
proto.event_store.grpc.streams.DeleteReq.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.DeleteReq.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.DeleteReq.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.DeleteReq.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteReq.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.grpc.streams.DeleteReq.Options}
 */
proto.event_store.grpc.streams.DeleteReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.grpc.streams.DeleteReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.DeleteReq.Options, 1));
};


/** @param {?proto.event_store.grpc.streams.DeleteReq.Options|undefined} value */
proto.event_store.grpc.streams.DeleteReq.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.DeleteReq.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.DeleteReq.prototype.hasOptions = function() {
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
proto.event_store.grpc.streams.DeleteResp.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.DeleteResp.PositionOptionsCase = {
  POSITION_OPTIONS_NOT_SET: 0,
  POSITION: 1,
  EMPTY: 2
};

/**
 * @return {proto.event_store.grpc.streams.DeleteResp.PositionOptionsCase}
 */
proto.event_store.grpc.streams.DeleteResp.prototype.getPositionOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.DeleteResp.PositionOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.DeleteResp.oneofGroups_[0]));
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
proto.event_store.grpc.streams.DeleteResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.DeleteResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.DeleteResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.grpc.streams.DeleteResp.Position.toObject(includeInstance, f),
    empty: (f = msg.getEmpty()) && proto.event_store.grpc.streams.DeleteResp.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.DeleteResp}
 */
proto.event_store.grpc.streams.DeleteResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.DeleteResp;
  return proto.event_store.grpc.streams.DeleteResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.DeleteResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.DeleteResp}
 */
proto.event_store.grpc.streams.DeleteResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.DeleteResp.Position;
      reader.readMessage(value,proto.event_store.grpc.streams.DeleteResp.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.DeleteResp.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.DeleteResp.Empty.deserializeBinaryFromReader);
      msg.setEmpty(value);
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
proto.event_store.grpc.streams.DeleteResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.DeleteResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.DeleteResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.DeleteResp.Position.serializeBinaryToWriter
    );
  }
  f = message.getEmpty();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.DeleteResp.Empty.serializeBinaryToWriter
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
proto.event_store.grpc.streams.DeleteResp.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.DeleteResp.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.DeleteResp.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteResp.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, 0),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.event_store.grpc.streams.DeleteResp.Position}
 */
proto.event_store.grpc.streams.DeleteResp.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.DeleteResp.Position;
  return proto.event_store.grpc.streams.DeleteResp.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.DeleteResp.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.DeleteResp.Position}
 */
proto.event_store.grpc.streams.DeleteResp.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
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
proto.event_store.grpc.streams.DeleteResp.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.DeleteResp.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.DeleteResp.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteResp.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {number}
 */
proto.event_store.grpc.streams.DeleteResp.Position.prototype.getCommitPosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.DeleteResp.Position.prototype.setCommitPosition = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.DeleteResp.Position.prototype.getPreparePosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.DeleteResp.Position.prototype.setPreparePosition = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
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
proto.event_store.grpc.streams.DeleteResp.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.DeleteResp.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.DeleteResp.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteResp.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.DeleteResp.Empty}
 */
proto.event_store.grpc.streams.DeleteResp.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.DeleteResp.Empty;
  return proto.event_store.grpc.streams.DeleteResp.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.DeleteResp.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.DeleteResp.Empty}
 */
proto.event_store.grpc.streams.DeleteResp.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.DeleteResp.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.DeleteResp.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.DeleteResp.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.DeleteResp.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional Position position = 1;
 * @return {?proto.event_store.grpc.streams.DeleteResp.Position}
 */
proto.event_store.grpc.streams.DeleteResp.prototype.getPosition = function() {
  return /** @type{?proto.event_store.grpc.streams.DeleteResp.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.DeleteResp.Position, 1));
};


/** @param {?proto.event_store.grpc.streams.DeleteResp.Position|undefined} value */
proto.event_store.grpc.streams.DeleteResp.prototype.setPosition = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.event_store.grpc.streams.DeleteResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.DeleteResp.prototype.clearPosition = function() {
  this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.DeleteResp.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty empty = 2;
 * @return {?proto.event_store.grpc.streams.DeleteResp.Empty}
 */
proto.event_store.grpc.streams.DeleteResp.prototype.getEmpty = function() {
  return /** @type{?proto.event_store.grpc.streams.DeleteResp.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.DeleteResp.Empty, 2));
};


/** @param {?proto.event_store.grpc.streams.DeleteResp.Empty|undefined} value */
proto.event_store.grpc.streams.DeleteResp.prototype.setEmpty = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.event_store.grpc.streams.DeleteResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.DeleteResp.prototype.clearEmpty = function() {
  this.setEmpty(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.DeleteResp.prototype.hasEmpty = function() {
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
proto.event_store.grpc.streams.TombstoneReq.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.TombstoneReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.TombstoneReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    options: (f = msg.getOptions()) && proto.event_store.grpc.streams.TombstoneReq.Options.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.TombstoneReq}
 */
proto.event_store.grpc.streams.TombstoneReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.TombstoneReq;
  return proto.event_store.grpc.streams.TombstoneReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.TombstoneReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.TombstoneReq}
 */
proto.event_store.grpc.streams.TombstoneReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.TombstoneReq.Options;
      reader.readMessage(value,proto.event_store.grpc.streams.TombstoneReq.Options.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.TombstoneReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.TombstoneReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.TombstoneReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.TombstoneReq.Options.serializeBinaryToWriter
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
proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.ExpectedStreamRevisionCase = {
  EXPECTED_STREAM_REVISION_NOT_SET: 0,
  REVISION: 2,
  NO_STREAM: 3,
  ANY: 4,
  STREAM_EXISTS: 5
};

/**
 * @return {proto.event_store.grpc.streams.TombstoneReq.Options.ExpectedStreamRevisionCase}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.getExpectedStreamRevisionCase = function() {
  return /** @type {proto.event_store.grpc.streams.TombstoneReq.Options.ExpectedStreamRevisionCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_[0]));
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
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.TombstoneReq.Options.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.TombstoneReq.Options} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneReq.Options.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    revision: jspb.Message.getFieldWithDefault(msg, 2, 0),
    noStream: (f = msg.getNoStream()) && proto.event_store.grpc.streams.TombstoneReq.Empty.toObject(includeInstance, f),
    any: (f = msg.getAny()) && proto.event_store.grpc.streams.TombstoneReq.Empty.toObject(includeInstance, f),
    streamExists: (f = msg.getStreamExists()) && proto.event_store.grpc.streams.TombstoneReq.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.TombstoneReq.Options}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.TombstoneReq.Options;
  return proto.event_store.grpc.streams.TombstoneReq.Options.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.TombstoneReq.Options} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.TombstoneReq.Options}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStreamName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setRevision(value);
      break;
    case 3:
      var value = new proto.event_store.grpc.streams.TombstoneReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.TombstoneReq.Empty.deserializeBinaryFromReader);
      msg.setNoStream(value);
      break;
    case 4:
      var value = new proto.event_store.grpc.streams.TombstoneReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.TombstoneReq.Empty.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 5:
      var value = new proto.event_store.grpc.streams.TombstoneReq.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.TombstoneReq.Empty.deserializeBinaryFromReader);
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
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.TombstoneReq.Options.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.TombstoneReq.Options} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneReq.Options.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStreamName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getNoStream();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.event_store.grpc.streams.TombstoneReq.Empty.serializeBinaryToWriter
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.event_store.grpc.streams.TombstoneReq.Empty.serializeBinaryToWriter
    );
  }
  f = message.getStreamExists();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.event_store.grpc.streams.TombstoneReq.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional string stream_name = 1;
 * @return {string}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.getStreamName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.setStreamName = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 revision = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.getRevision = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.setRevision = function(value) {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.clearRevision = function() {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.hasRevision = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Empty no_stream = 3;
 * @return {?proto.event_store.grpc.streams.TombstoneReq.Empty}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.getNoStream = function() {
  return /** @type{?proto.event_store.grpc.streams.TombstoneReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.TombstoneReq.Empty, 3));
};


/** @param {?proto.event_store.grpc.streams.TombstoneReq.Empty|undefined} value */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.setNoStream = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.clearNoStream = function() {
  this.setNoStream(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.hasNoStream = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Empty any = 4;
 * @return {?proto.event_store.grpc.streams.TombstoneReq.Empty}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.getAny = function() {
  return /** @type{?proto.event_store.grpc.streams.TombstoneReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.TombstoneReq.Empty, 4));
};


/** @param {?proto.event_store.grpc.streams.TombstoneReq.Empty|undefined} value */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.setAny = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.clearAny = function() {
  this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.hasAny = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Empty stream_exists = 5;
 * @return {?proto.event_store.grpc.streams.TombstoneReq.Empty}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.getStreamExists = function() {
  return /** @type{?proto.event_store.grpc.streams.TombstoneReq.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.TombstoneReq.Empty, 5));
};


/** @param {?proto.event_store.grpc.streams.TombstoneReq.Empty|undefined} value */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.setStreamExists = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.event_store.grpc.streams.TombstoneReq.Options.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.clearStreamExists = function() {
  this.setStreamExists(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.TombstoneReq.Options.prototype.hasStreamExists = function() {
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
proto.event_store.grpc.streams.TombstoneReq.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.TombstoneReq.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.TombstoneReq.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneReq.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.TombstoneReq.Empty}
 */
proto.event_store.grpc.streams.TombstoneReq.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.TombstoneReq.Empty;
  return proto.event_store.grpc.streams.TombstoneReq.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.TombstoneReq.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.TombstoneReq.Empty}
 */
proto.event_store.grpc.streams.TombstoneReq.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.TombstoneReq.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.TombstoneReq.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.TombstoneReq.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneReq.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional Options options = 1;
 * @return {?proto.event_store.grpc.streams.TombstoneReq.Options}
 */
proto.event_store.grpc.streams.TombstoneReq.prototype.getOptions = function() {
  return /** @type{?proto.event_store.grpc.streams.TombstoneReq.Options} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.TombstoneReq.Options, 1));
};


/** @param {?proto.event_store.grpc.streams.TombstoneReq.Options|undefined} value */
proto.event_store.grpc.streams.TombstoneReq.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.TombstoneReq.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.TombstoneReq.prototype.hasOptions = function() {
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
proto.event_store.grpc.streams.TombstoneResp.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.TombstoneResp.PositionOptionsCase = {
  POSITION_OPTIONS_NOT_SET: 0,
  POSITION: 1,
  EMPTY: 2
};

/**
 * @return {proto.event_store.grpc.streams.TombstoneResp.PositionOptionsCase}
 */
proto.event_store.grpc.streams.TombstoneResp.prototype.getPositionOptionsCase = function() {
  return /** @type {proto.event_store.grpc.streams.TombstoneResp.PositionOptionsCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.TombstoneResp.oneofGroups_[0]));
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
proto.event_store.grpc.streams.TombstoneResp.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.TombstoneResp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.TombstoneResp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneResp.toObject = function(includeInstance, msg) {
  var f, obj = {
    position: (f = msg.getPosition()) && proto.event_store.grpc.streams.TombstoneResp.Position.toObject(includeInstance, f),
    empty: (f = msg.getEmpty()) && proto.event_store.grpc.streams.TombstoneResp.Empty.toObject(includeInstance, f)
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
 * @return {!proto.event_store.grpc.streams.TombstoneResp}
 */
proto.event_store.grpc.streams.TombstoneResp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.TombstoneResp;
  return proto.event_store.grpc.streams.TombstoneResp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.TombstoneResp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.TombstoneResp}
 */
proto.event_store.grpc.streams.TombstoneResp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.TombstoneResp.Position;
      reader.readMessage(value,proto.event_store.grpc.streams.TombstoneResp.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 2:
      var value = new proto.event_store.grpc.streams.TombstoneResp.Empty;
      reader.readMessage(value,proto.event_store.grpc.streams.TombstoneResp.Empty.deserializeBinaryFromReader);
      msg.setEmpty(value);
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
proto.event_store.grpc.streams.TombstoneResp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.TombstoneResp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.TombstoneResp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneResp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.TombstoneResp.Position.serializeBinaryToWriter
    );
  }
  f = message.getEmpty();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.event_store.grpc.streams.TombstoneResp.Empty.serializeBinaryToWriter
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
proto.event_store.grpc.streams.TombstoneResp.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.TombstoneResp.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.TombstoneResp.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneResp.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    commitPosition: jspb.Message.getFieldWithDefault(msg, 1, 0),
    preparePosition: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.event_store.grpc.streams.TombstoneResp.Position}
 */
proto.event_store.grpc.streams.TombstoneResp.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.TombstoneResp.Position;
  return proto.event_store.grpc.streams.TombstoneResp.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.TombstoneResp.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.TombstoneResp.Position}
 */
proto.event_store.grpc.streams.TombstoneResp.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCommitPosition(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
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
proto.event_store.grpc.streams.TombstoneResp.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.TombstoneResp.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.TombstoneResp.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneResp.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommitPosition();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPreparePosition();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional uint64 commit_position = 1;
 * @return {number}
 */
proto.event_store.grpc.streams.TombstoneResp.Position.prototype.getCommitPosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.TombstoneResp.Position.prototype.setCommitPosition = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 prepare_position = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.TombstoneResp.Position.prototype.getPreparePosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.TombstoneResp.Position.prototype.setPreparePosition = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
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
proto.event_store.grpc.streams.TombstoneResp.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.TombstoneResp.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.TombstoneResp.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneResp.Empty.toObject = function(includeInstance, msg) {
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
 * @return {!proto.event_store.grpc.streams.TombstoneResp.Empty}
 */
proto.event_store.grpc.streams.TombstoneResp.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.TombstoneResp.Empty;
  return proto.event_store.grpc.streams.TombstoneResp.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.TombstoneResp.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.TombstoneResp.Empty}
 */
proto.event_store.grpc.streams.TombstoneResp.Empty.deserializeBinaryFromReader = function(msg, reader) {
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
proto.event_store.grpc.streams.TombstoneResp.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.TombstoneResp.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.TombstoneResp.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.TombstoneResp.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * optional Position position = 1;
 * @return {?proto.event_store.grpc.streams.TombstoneResp.Position}
 */
proto.event_store.grpc.streams.TombstoneResp.prototype.getPosition = function() {
  return /** @type{?proto.event_store.grpc.streams.TombstoneResp.Position} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.TombstoneResp.Position, 1));
};


/** @param {?proto.event_store.grpc.streams.TombstoneResp.Position|undefined} value */
proto.event_store.grpc.streams.TombstoneResp.prototype.setPosition = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.event_store.grpc.streams.TombstoneResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.TombstoneResp.prototype.clearPosition = function() {
  this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.TombstoneResp.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty empty = 2;
 * @return {?proto.event_store.grpc.streams.TombstoneResp.Empty}
 */
proto.event_store.grpc.streams.TombstoneResp.prototype.getEmpty = function() {
  return /** @type{?proto.event_store.grpc.streams.TombstoneResp.Empty} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.TombstoneResp.Empty, 2));
};


/** @param {?proto.event_store.grpc.streams.TombstoneResp.Empty|undefined} value */
proto.event_store.grpc.streams.TombstoneResp.prototype.setEmpty = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.event_store.grpc.streams.TombstoneResp.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.TombstoneResp.prototype.clearEmpty = function() {
  this.setEmpty(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.TombstoneResp.prototype.hasEmpty = function() {
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
proto.event_store.grpc.streams.UUID.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.event_store.grpc.streams.UUID.ValueCase = {
  VALUE_NOT_SET: 0,
  STRUCTURED: 1,
  STRING: 2
};

/**
 * @return {proto.event_store.grpc.streams.UUID.ValueCase}
 */
proto.event_store.grpc.streams.UUID.prototype.getValueCase = function() {
  return /** @type {proto.event_store.grpc.streams.UUID.ValueCase} */(jspb.Message.computeOneofCase(this, proto.event_store.grpc.streams.UUID.oneofGroups_[0]));
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
proto.event_store.grpc.streams.UUID.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.UUID.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.UUID} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.UUID.toObject = function(includeInstance, msg) {
  var f, obj = {
    structured: (f = msg.getStructured()) && proto.event_store.grpc.streams.UUID.Structured.toObject(includeInstance, f),
    string: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.event_store.grpc.streams.UUID}
 */
proto.event_store.grpc.streams.UUID.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.UUID;
  return proto.event_store.grpc.streams.UUID.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.UUID} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.UUID}
 */
proto.event_store.grpc.streams.UUID.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event_store.grpc.streams.UUID.Structured;
      reader.readMessage(value,proto.event_store.grpc.streams.UUID.Structured.deserializeBinaryFromReader);
      msg.setStructured(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
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
proto.event_store.grpc.streams.UUID.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.UUID.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.UUID} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.UUID.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStructured();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.event_store.grpc.streams.UUID.Structured.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
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
proto.event_store.grpc.streams.UUID.Structured.prototype.toObject = function(opt_includeInstance) {
  return proto.event_store.grpc.streams.UUID.Structured.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event_store.grpc.streams.UUID.Structured} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.UUID.Structured.toObject = function(includeInstance, msg) {
  var f, obj = {
    mostSignificantBits: jspb.Message.getFieldWithDefault(msg, 1, 0),
    leastSignificantBits: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.event_store.grpc.streams.UUID.Structured}
 */
proto.event_store.grpc.streams.UUID.Structured.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event_store.grpc.streams.UUID.Structured;
  return proto.event_store.grpc.streams.UUID.Structured.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event_store.grpc.streams.UUID.Structured} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event_store.grpc.streams.UUID.Structured}
 */
proto.event_store.grpc.streams.UUID.Structured.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setMostSignificantBits(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setLeastSignificantBits(value);
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
proto.event_store.grpc.streams.UUID.Structured.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event_store.grpc.streams.UUID.Structured.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event_store.grpc.streams.UUID.Structured} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event_store.grpc.streams.UUID.Structured.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMostSignificantBits();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getLeastSignificantBits();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional uint64 most_significant_bits = 1;
 * @return {number}
 */
proto.event_store.grpc.streams.UUID.Structured.prototype.getMostSignificantBits = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.UUID.Structured.prototype.setMostSignificantBits = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 least_significant_bits = 2;
 * @return {number}
 */
proto.event_store.grpc.streams.UUID.Structured.prototype.getLeastSignificantBits = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.event_store.grpc.streams.UUID.Structured.prototype.setLeastSignificantBits = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional Structured structured = 1;
 * @return {?proto.event_store.grpc.streams.UUID.Structured}
 */
proto.event_store.grpc.streams.UUID.prototype.getStructured = function() {
  return /** @type{?proto.event_store.grpc.streams.UUID.Structured} */ (
    jspb.Message.getWrapperField(this, proto.event_store.grpc.streams.UUID.Structured, 1));
};


/** @param {?proto.event_store.grpc.streams.UUID.Structured|undefined} value */
proto.event_store.grpc.streams.UUID.prototype.setStructured = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.event_store.grpc.streams.UUID.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 */
proto.event_store.grpc.streams.UUID.prototype.clearStructured = function() {
  this.setStructured(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.UUID.prototype.hasStructured = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string string = 2;
 * @return {string}
 */
proto.event_store.grpc.streams.UUID.prototype.getString = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.event_store.grpc.streams.UUID.prototype.setString = function(value) {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.UUID.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.event_store.grpc.streams.UUID.prototype.clearString = function() {
  jspb.Message.setOneofField(this, 2, proto.event_store.grpc.streams.UUID.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.event_store.grpc.streams.UUID.prototype.hasString = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.event_store.grpc.streams);
