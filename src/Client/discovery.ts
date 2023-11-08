import { ChannelCredentials, Metadata } from "@grpc/grpc-js";

import { GossipClient } from "../../generated/gossip_grpc_pb";
import { Empty } from "../../generated/shared_pb";

import { EndPoint, NodePreference, VNodeState } from "../types";
import { FOLLOWER, LEADER, READ_ONLY_REPLICA } from "../constants";
import { debug, parseUUID } from "../utils";
import type { DNSClusterOptions, GossipClusterOptions } from ".";

export interface MemberInfo {
  instanceId?: string;
  timeStamp: number;
  state: VNodeState;
  isAlive: boolean;
  httpEndpoint?: EndPoint;
}

export const discoverEndpoint = async (
  {
    discoveryInterval = 100,
    maxDiscoverAttempts = 10,
    gossipTimeout = 5,
    nodePreference = LEADER,
    ...settings
  }: DNSClusterOptions | GossipClusterOptions,
  credentials: ChannelCredentials,
  failedEndpoint?: EndPoint
): Promise<EndPoint> => {
  let discoverAttempts = 0;

  while (discoverAttempts < maxDiscoverAttempts) {
    discoverAttempts++;

    try {
      const candidates =
        "endpoints" in settings ? settings.endpoints : [settings.discover];

      debug.connection(`Starting discovery for candidates: %O`, candidates);

      const candidateDiscoveryOrder = [...candidates]
        .sort(shuffle)
        .sort((a) => {
          // Move failed endpoint to the last
          if (
            a.address === failedEndpoint?.address &&
            a.port === failedEndpoint?.port
          ) {
            return 1;
          }
          return 0;
        });

      for (const candidate of candidateDiscoveryOrder) {
        try {
          const members = await listClusterMembers(
            candidate,
            credentials,
            createDeadline(gossipTimeout)
          );
          const endpoint = determineBestNode(nodePreference, members);
          if (endpoint) return Promise.resolve(endpoint);
        } catch (error) {
          debug.connection(
            `Failed to get cluster list from ${candidate.address}:${candidate.port}`,
            error.toString()
          );
          continue;
        }
      }
    } catch (error) {
      debug.connection(`Failed to resolve dns: `, error.toString());
    }

    await delay(discoveryInterval);
  }

  throw new Error(`Failed to discover after ${discoverAttempts} attempts.`);
};

const allowedStates = new Set([
  VNodeState.FOLLOWER,
  VNodeState.LEADER,
  VNodeState.READONLYREPLICA,
  VNodeState.PREREADONLYREPLICA,
  VNodeState.READONLYLEADERLESS,
]);

export const isInAllowedState = (member: MemberInfo): boolean =>
  member.isAlive && allowedStates.has(member.state);

// getPreferedStates, higher index is better
const getPreferedStates = (preference: NodePreference) => {
  switch (preference) {
    case LEADER:
      return [VNodeState.LEADER];
    case FOLLOWER:
      return [VNodeState.FOLLOWER];
    case READ_ONLY_REPLICA:
      return [
        VNodeState.READONLYLEADERLESS,
        VNodeState.PREREADONLYREPLICA,
        VNodeState.READONLYREPLICA,
      ];
    default:
      return [];
  }
};

type CompareFn<T> = (a: T, b: T) => number;
const compareByPreference = (
  preference: NodePreference
): CompareFn<MemberInfo> => {
  const preferedStates = getPreferedStates(preference);
  return (a, b) =>
    preferedStates.indexOf(b.state) - preferedStates.indexOf(a.state);
};
const shuffle: CompareFn<unknown> = () => Math.random() - 0.5;

export const filterAndOrderMembers = (
  preference: NodePreference,
  members: MemberInfo[]
): MemberInfo[] =>
  members
    .filter(isInAllowedState)
    .sort(shuffle)
    .sort(compareByPreference(preference));

export const determineBestNode = (
  preference: NodePreference,
  members: MemberInfo[]
): EndPoint | undefined => {
  debug.connection(
    `Determining best node with preference "%s" from members: %O`,
    preference,
    members
  );

  const [chosenMember] = filterAndOrderMembers(preference, members);

  if (!chosenMember || !chosenMember.httpEndpoint) return undefined;

  debug.connection(`Chose member: %O`, chosenMember);

  return {
    address: chosenMember.httpEndpoint.address,
    port: chosenMember.httpEndpoint.port,
  };
};

function createDeadline(seconds: number) {
  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + seconds);
  return deadline;
}

function listClusterMembers(
  seed: EndPoint,
  credentials: ChannelCredentials,
  deadline: Date
): Promise<MemberInfo[]> {
  const uri = `${seed.address}:${seed.port}`;
  const client = new GossipClient(uri, credentials, {});

  return new Promise((resolve, reject) => {
    client.read(new Empty(), new Metadata(), { deadline }, (error, info) => {
      // regardless of the outcome, we are done with this client.
      client.close();

      if (error) return reject(error);

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
          instanceId: parseUUID(grpcMember.getInstanceId()),
          timeStamp: parseInt(grpcMember.getTimeStamp(), 10),
          state: grpcMember.getState(),
          isAlive: grpcMember.getIsAlive(),
          httpEndpoint,
        };

        members.push(member);
      }

      return resolve(members);
    });
  });
}

export const delay = (timeout: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeout));
