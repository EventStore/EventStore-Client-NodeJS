import {ClusterSettings, EndPoint, GossipSeed, MemberInfo, NodePreference} from "./types";
import * as dns from 'dns';
import {Gossip} from "./gossip";
import {MemberInfo as GrpcMemberInfo} from "../generated/gossip_pb";
import VNodeState = GrpcMemberInfo.VNodeState;

export function discoverEndpoint(setts: ClusterSettings, previous?: EndPoint, cert?: Buffer): Promise<EndPoint> {
    return new Promise(async (resolve, error) => {
        while (true) {
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

            let elected: GossipSeed | undefined;

            for (const candidate of candidates) {
                const client = Gossip.fromSeed(candidate, cert);
                let members: MemberInfo[] = []

                try {
                    await client.list();
                } catch {
                    continue;
                }

                if (members.length === 0) continue;


            }
        }
    });
}

function resolveDomainName(domain: string): Promise<GossipSeed[]> {
    return new Promise(async (resolve, reject) => {
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
        case VNodeState.MANAGER:
            return false;
        case VNodeState.SHUTTINGDOWN:
            return false;
        case VNodeState.SHUTDOWN:
            return false;
        default:
            return true;
    }
}

function determineBestNode(preference: NodePreference, members: MemberInfo[]): EndPoint | undefined {
    let finalCandidates = [];
    const sorted = members
        .filter(inAllowedStates)
        .sort((a, b) => a.state - b.state);

    let finalMember;
    switch (preference) {
        case NodePreference.Master:
            finalMember = sorted.find(member => member.state === VNodeState.LEADER);
            if (finalMember && finalMember.httpEndpoint) {
                return {
                    address: finalMember.httpEndpoint.address,
                    port: finalMember.httpEndpoint.port,
                };
            }
            break;

        case NodePreference.Random:
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