const esdbImage = ((): string => {
  const version = process.env.EVENTSTORE_IMAGE ?? "github:ci";
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
    default:
      return version;
  }
})();

export const dockerImages = {
  volumesProvisioner: "hasnat/volumes-provisioner",
  certGen: "ghcr.io/eventstore/es-gencert-cli:1.3",
  esdb: esdbImage,
};
