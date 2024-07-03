const esdbImage = ((): string => {
  const version = process.env.EVENTSTORE_IMAGE ?? "eventstore-ce:ci";
  switch (true) {
    case version.startsWith("local:"):
      return version.replace("local:", "");
    case version.startsWith("github:"):
      return version.replace("github:", "ghcr.io/eventstore/eventstore:");
    case version.startsWith("dockerhub:"):
      return version.replace("dockerhub:", "eventstore/eventstore:");
    case version.startsWith("eventstore-ee:"):
      return version.replace(
        "eventstore-ee:",
        "docker.eventstore.com/eventstore-ee/eventstoredb-commercial:"
      );
    case version.startsWith("eventstore-ce:"):
      return version.replace(
        "eventstore-ce:",
        "docker.eventstore.com/eventstore-ce/eventstoredb-ce:"
      );
    case version.startsWith("eventstore-staging-ce:"):
      return version.replace(
        "eventstore-staging-ce:",
        "docker.eventstore.com/eventstore-staging-ce/eventstoredb-oss:"
      );
    default:
      return version;
  }
})();

export const dockerImages = {
  volumesProvisioner: "hasnat/volumes-provisioner",
  certGen: "docker.eventstore.com/eventstore-utils/es-gencert-cli:latest",
  esdb: esdbImage,
};
