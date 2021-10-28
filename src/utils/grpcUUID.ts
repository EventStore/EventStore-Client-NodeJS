import { stringify, v4 } from "uuid";
import { UUID } from "../../generated/shared_pb";

export const createUUID = (id: string = v4()): UUID => {
  const uuid = new UUID();
  uuid.setString(id);
  return uuid;
};

export function parseUUID(uuid: UUID): string;
export function parseUUID(uuid: UUID | undefined): string | undefined;
export function parseUUID(uuid: UUID | undefined): string | undefined {
  if (!uuid) return undefined;

  if (uuid.hasStructured()) {
    const structured = uuid.getStructured()!;
    const leastSignificantBits = BigInt(structured.getLeastSignificantBits());
    const mostSignificantBits = BigInt(structured.getMostSignificantBits());
    const buffer = new ArrayBuffer(16);
    const dataView = new DataView(buffer);

    dataView.setBigUint64(0, mostSignificantBits);
    dataView.setBigUint64(8, leastSignificantBits);

    const uint8Array = new Uint8Array(buffer);

    return stringify(uint8Array);
  }

  return uuid.getString();
}
