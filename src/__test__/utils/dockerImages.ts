const esdbImage = ((): string => {
  const version = process.env.EVENTSTORE_IMAGE ?? "github:ci";
  switch (true) {
    case version.startsWith("local:"):
      return version.replace("local:", "");
    case version.startsWith("github:"):
      return version.replace(
        "github:",
        "ghcr.io/eventstore/eventstore/eventstore:"
      );
    case version.startsWith("dockerhub:"):
      return version.replace("dockerhub:", "eventstore/eventstore:");
    default:
      return version;
  }
})();

export const dockerImages = {
  volumesProvisioner: "hasnat/volumes-provisioner",
  certGen: "ghcr.io/eventstore/es-gencert-cli/es-gencert-cli:1.0.2",
  esdb: esdbImage,
};
