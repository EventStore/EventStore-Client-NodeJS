import { GossipClient } from "../generated/gossip_grpc_pb";
import * as grpc from "grpc";
import { GossipSeed, MemberInfo } from "./types";
import { Empty } from "../generated/shared_pb";

export class Gossip {
  private readonly _client: GossipClient;

  constructor(uri: string, cert?: Buffer) {
    let creds: grpc.ChannelCredentials;

    if (cert) {
      creds = grpc.credentials.createSsl(cert);
    } else {
      creds = grpc.credentials.createInsecure();
    }

    this._client = new GossipClient(uri, creds);
  }

  static fromSeed(seed: GossipSeed, cert?: Buffer): Gossip {
    return new Gossip(`${seed.hostname}:${seed.port}`, cert);
  }

  list(): Promise<MemberInfo[]> {
    return new Promise((resolve, reject) => {
      this._client.read(new Empty(), (error, info) => {
        if (error) reject(error);

        const members: MemberInfo[] = [];

        for (const grpcMember of info.getMembersList()) {
          let httpEndpoint;
          const grpcHttpEndpoint = grpcMember.getHttpEndPoint();

          if (grpcHttpEndpoint) {
            httpEndpoint = {
              address: grpcHttpEndpoint.getAddress(),
              port: grpcHttpEndpoint.getPort(),
            };
          }

          const member: MemberInfo = {
            instanceId: grpcMember.getInstanceId()?.getString(),
            timeStamp: grpcMember.getTimeStamp(),
            state: grpcMember.getState(),
            isAlive: grpcMember.getIsAlive(),
            httpEndpoint,
          };

          members.push(member);
        }

        resolve(members);
      });
    });
  }
}
