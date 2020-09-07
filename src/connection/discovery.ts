import * as dns from "dns";
import { credentials as grpcCredentials } from "grpc";

import { MemberInfo as GrpcMemberInfo } from "../../generated/gossip_pb";
import { GossipClient } from "../../generated/gossip_grpc_pb";
import { Empty } from "../../generated/shared_pb";
import VNodeState = GrpcMemberInfo.VNodeState;

import { EndPoint, MemberInfo, NodePreference } from "../types";
import { ClusterSettings } from ".";

export async function discoverEndpoint(
  settings: ClusterSettings,
  cert?: Buffer
): Promise<EndPoint> {
  while (true) {
    const candidates: EndPoint[] =
      "endpoints" in settings
        ? settings.endpoints
        : await resolveDomainName(settings.domain);

    for (const candidate of candidates) {
      try {
        const members = await listClusterMembers(candidate, cert);
        const preference = settings.nodePreference ?? NodePreference.Random;
        const endpoint = determineBestNode(preference, members);
        if (endpoint) return Promise.resolve(endpoint);
      } catch {
        continue;
      }
    }

    await asyncSetTimeout(500);
  }
}

function resolveDomainName(domain: string): Promise<EndPoint[]> {
  return new Promise((resolve, reject) => {
    dns.resolveSrv(domain, (error, addresses) => {
      if (error) return reject(error);
      return resolve(
        addresses.map<EndPoint>((record) => ({
          address: record.name,
          port: record.port,
        }))
      );
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
  seed: EndPoint,
  cert?: Buffer
): Promise<MemberInfo[]> {
  const uri = `${seed.address}:${seed.port}`;
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
