export const convertMetadata = <Metadata>(
  metadata?: Metadata | Buffer
): Metadata | undefined => {
  if (Buffer.isBuffer(metadata)) {
    return (Uint8Array.from(metadata) as unknown) as Metadata;
  }
  return metadata;
};
