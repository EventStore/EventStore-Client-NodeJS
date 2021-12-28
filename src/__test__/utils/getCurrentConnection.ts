import type { EventStoreDBClient, EndPoint } from "@eventstore/db-client";

export const getCurrentConnection = async (
  client: EventStoreDBClient
): Promise<EndPoint> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const channel = await (client as any).getChannel();
  const [_protocol, address, port] = channel.getTarget().split(":");
  return {
    address,
    port: Number.parseInt(port),
  };
};
