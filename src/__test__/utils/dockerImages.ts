const esdbImage = ((): string => {
  const version = process.env.EVENTSTORE_IMAGE ?? "github:ci";
  switch (true) {
    case version.startsWith("local:"):
      return version.replace("local:", "");
    case version.startsWith("github:"):
      return version.replace(
        "github:",
        "docker.pkg.github.com/eventstore/eventstore/eventstore:"
      );
    case version.startsWith("dockerhub:"):
      return version.replace("dockerhub:", "eventstore/eventstore:");
    default:
      return version;
  }
})();

export const dockerImages = {
  volumesProvisioner: "hasnat/volumes-provisioner",
  certGen:
    "docker.pkg.github.com/eventstore/es-gencert-cli/es-gencert-cli:1.0.2",
  esdb: esdbImage,
};
