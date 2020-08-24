import {
  ClusterSettings,
  EndPoint,
  GossipSeed,
  MemberInfo,
  NodePreference,
} from "./types";
import * as dns from "dns";
import { Gossip } from "./gossip";
import { MemberInfo as GrpcMemberInfo } from "../generated/gossip_pb";
import VNodeState = GrpcMemberInfo.VNodeState;

export async function discoverEndpoint(
  setts: ClusterSettings,
  previous?: EndPoint,
  cert?: Buffer
): Promise<EndPoint> {
  for (;;) {
    let candidates: GossipSeed[] = [];

    if (setts.gossipSeeds) {
      candidates = setts.gossipSeeds;
    } else if (setts.domain) {
      try {
        candidates = await resolveDomainName(setts.domain);
      } catch {
        // TODO - Log about why it has failed.
      }
    }

    for (const candidate of candidates) {
      const client = Gossip.fromSeed(candidate, cert);
      let members: MemberInfo[] = [];

      try {
        members = await client.list();
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
