// revision
export const ANY = "any";
export const STREAM_EXISTS = "stream_exists";
export const NO_STREAM = "no_stream";

// known positions / revisions
export const START = "start";
export const END = "end";

// directions
export const FORWARD = "forward";
export const BACKWARD = "backward";

// node Preference
export const RANDOM = "random";
export const FOLLOWER = "follower";
export const LEADER = "leader";

// consumer strategy
export const DISPATCH_TO_SINGLE = "dispatch_to_single";
export const ROUND_ROBIN = "round_robin";
export const PINNED = "pinned";

// persistent action
export const PARK = "park";
export const RETRY = "retry";
export const SKIP = "skip";
export const STOP = "stop";

// subscription events
export const EVENT_EVENT = "event";
export const END_EVENT = "end";
export const CONFIRMATION_EVENT = "confirmation";
export const ERROR_EVENT = "error";
export const CLOSE_EVENT = "close";
