import * as dns from "dns";
import { credentials as grpcCredentials } from "grpc";
import { MemberInfo as GrpcMemberInfo } from "../../generated/gossip_pb";
import { GossipClient } from "../../generated/gossip_grpc_pb";
import VNodeState = GrpcMemberInfo.VNodeState;
import {
  ClusterSettings,
  EndPoint,
  GossipSeed,
  MemberInfo,
  NodePreference,
} from "../types";
import { Empty } from "../../generated/shared_pb";

export async function discoverEndpoint(
  setts: ClusterSettings,
  cert?: Buffer
): Promise<EndPoint> {
  while (true) {
    let candidates: GossipSeed[] = [];

    if (setts.gossipSeeds) {
      candidates = setts.gossipSeeds;
    } else if (setts.domain) {
      try {
        candidates = await resolveDomainName(setts.domain);
      } catch (error) {
        // TODO - Log about why it has failed.
        console.error(error);
      }
    }

    for (const candidate of candidates) {
      let members: MemberInfo[] = [];

      try {
        members = await listClusterMembers(candidate, cert);
      } catch {
        continue;
      }

      if (members.length !== 0) {
        const preference = setts.nodePreference ?? NodePreference.Random;
        const selected = determineBestNode(preference, members);

        if (selected) {
          const endpoint: EndPoint = {
            address: selected.address,
            port: selected.port,
          };

          return Promise.resolve(endpoint);
        }
      }
    }

    await asyncSetTimeout(500);
  }
}

function resolveDomainName(domain: string): Promise<GossipSeed[]> {
  return new Promise((resolve, reject) => {
    dns.resolveSrv(domain, (error, addresses) => {
      if (error) reject(error);

      console.log(addresses);

      const seeds: GossipSeed[] = addresses.map((record) => {
        return {
          hostname: record.name,
          port: record.port,
        };
      });

      resolve(seeds);
    });
  });
}

function inAllowedStates(member: MemberInfo): boolean {
  switch (member.state) {
    case VNodeState.SHUTDOWN:
      return false;
    default:
      return true;
  }
}

function asyncSetTimeout(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

function determineBestNode(
  preference: NodePreference,
  members: MemberInfo[]
): EndPoint | undefined {
  const sorted = members
    .filter(inAllowedStates)
    .sort((a, b) => a.state - b.state);

  let finalMember;
  switch (preference) {
    case NodePreference.Leader:
      finalMember = sorted.find((member) => member.state === VNodeState.LEADER);
      if (finalMember && finalMember.httpEndpoint) {
        return {
          address: finalMember.httpEndpoint.address,
          port: finalMember.httpEndpoint.port,
        };
      }
      break;

    case NodePreference.Follower:
      finalMember = sorted
        .filter((member) => member.state === VNodeState.FOLLOWER)
        .sort(() => Math.random() - 0.5)
        .shift();

      if (finalMember && finalMember.httpEndpoint) {
        return {
          address: finalMember.httpEndpoint.address,
          port: finalMember.httpEndpoint.port,
        };
      }
      break;

    default:
      finalMember = sorted.sort(() => Math.random() - 0.5).shift();
      if (finalMember && finalMember.httpEndpoint) {
        return {
          address: finalMember.httpEndpoint.address,
          port: finalMember.httpEndpoint.port,
        };
      }
      break;
  }
}

function listClusterMembers(
  seed: GossipSeed,
  cert?: Buffer
): Promise<MemberInfo[]> {
  const uri = `${seed.hostname}:${seed.port}`;
  const credentials = cert
    ? grpcCredentials.createSsl(cert)
    : grpcCredentials.createInsecure();

  const client = new GossipClient(uri, credentials);

  return new Promise((resolve, reject) => {
    client.read(new Empty(), (error, info) => {
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
