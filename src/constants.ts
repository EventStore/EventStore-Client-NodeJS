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

// projection modes
export const CONTINUOUS = "Continuous";
export const ONE_TIME = "OneTime";
export const TRANSIENT = "Transient";

// projection status
export const CREATING = "Creating";
export const LOADING = "Loading";
export const LOADED = "Loaded";
export const PREPARING = "Preparing";
export const PREPARED = "Prepared";
export const STARTING = "Starting";
export const LOADING_STOPPED = "LoadingStopped";
export const RUNNING = "Running";
export const STOPPING = "Stopping";
export const ABORTING = "Aborting";
export const STOPPED = "Stopped";
export const COMPLETED = "Completed";
export const ABORTED = "Aborted";
export const FAULTED = "Faulted";
export const DELETING = "Deleting";

// processing status
export const PAUSED = "Paused";
export const WRITING_RESULTS = "Writing results";
// STOPPED

// filter
export const STREAM_NAME = "streamName";
export const EVENT_TYPE = "eventType";

// max subscriber count
export const UNLIMITED = "unlimited";
