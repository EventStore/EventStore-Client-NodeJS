import { v4 as uuid } from "uuid";

import {
  FOLLOWER,
  LEADER,
  RANDOM,
  READ_ONLY_REPLICA,
  VNodeState,
} from "@eventstore/db-client";
import {
  determineBestNode,
  filterAndOrderMembers,
  MemberInfo,
} from "../../Client/discovery";

const member = ({
  isAlive = true,
  state = VNodeState.UNKNOWN,
  timeStamp = Date.now() - Math.floor(Math.random() * 1000),
  httpEndpoint = {
    address: "localhost",
    port: Math.floor(Math.random() * 10000),
  },
  instanceId = uuid(),
}: Partial<MemberInfo>): MemberInfo => ({
  isAlive,
  state,
  timeStamp,
  httpEndpoint,
  instanceId,
});

describe("determineBestNode", () => {
  test("should exclude disallowed states", async () => {
    const members: MemberInfo[] = [
      // not alive
      member({
        isAlive: false,
        state: VNodeState.FOLLOWER,
      }),
      // not good state
      member({
        isAlive: true,
        state: VNodeState.SHUTDOWN,
      }),
      // not good state
      member({
        isAlive: true,
        state: VNodeState.MANAGER,
      }),
      // good, should be chosen
      member({
        isAlive: true,
        state: VNodeState.LEADER,
      }),
    ];

    const node = determineBestNode("random", members);

    expect(node).toBeDefined();
    expect(node).toEqual(members[3].httpEndpoint);
  });
});

describe("determineBestNode", () => {
  test("should exclude disallowed states", async () => {
    const members: MemberInfo[] = [
      // not alive
      member({
        isAlive: false,
        state: VNodeState.FOLLOWER,
      }),
      // not good state
      member({
        isAlive: true,
        state: VNodeState.SHUTDOWN,
      }),
      // not good state
      member({
        isAlive: true,
        state: VNodeState.MANAGER,
      }),
      // good, should be chosen
      member({
        isAlive: true,
        state: VNodeState.LEADER,
      }),
    ];

    const node = determineBestNode("random", members);

    expect(node).toBeDefined();
    expect(node).toEqual(members[3].httpEndpoint);
  });
});

describe("member sorting", () => {
  const members: MemberInfo[] = [
    member({
      state: VNodeState.FOLLOWER,
    }),
    member({
      state: VNodeState.FOLLOWER,
    }),
    member({
      state: VNodeState.READONLYREPLICA,
    }),
    member({
      state: VNodeState.LEADER,
    }),
    member({
      state: VNodeState.READONLYREPLICA,
    }),
    member({
      state: VNodeState.READONLYLEADERLESS,
    }),
    member({
      state: VNodeState.PREREADONLYREPLICA,
    }),
  ];

  const countUnique = (sortedArrays: MemberInfo[][]): number =>
    new Set(
      sortedArrays.map((arr) => arr.map(({ instanceId }) => instanceId).join())
    ).size;

  test(`RANDOM should shuffle the array`, () => {
    const sortedArrays = Array.from({ length: 200 }, () =>
      filterAndOrderMembers(RANDOM, [...members])
    );

    expect(countUnique(sortedArrays)).toBeGreaterThan(1);
  });

  test(`LEADER should place the leader first, shuffle the rest`, () => {
    const sortedArrays = Array.from({ length: 200 }, () =>
      filterAndOrderMembers(LEADER, [...members])
    );

    for (const sorted of sortedArrays) {
      // the first item should always be the leader node
      expect(sorted[0].state).toEqual(VNodeState.LEADER);
      // the rest are random
    }

    expect(countUnique(sortedArrays)).toBeGreaterThan(1);
  });

  test(`FOLLOWER should place the followers first in a random order, shuffle the rest`, () => {
    const sortedArrays = Array.from({ length: 200 }, () =>
      filterAndOrderMembers(FOLLOWER, [...members])
    );

    for (const sorted of sortedArrays) {
      // the two follower nodes should come first
      expect(sorted[0].state).toEqual(VNodeState.FOLLOWER);
      expect(sorted[1].state).toEqual(VNodeState.FOLLOWER);
      // the rest are random
    }
    expect(countUnique(sortedArrays)).toBeGreaterThan(1);
  });

  test(`READ_ONLY_REPLICA should prefer ReadOnlyReplica PreReadOnlyReplica ReadOnlyLeaderless in order`, () => {
    const sortedArrays = Array.from({ length: 200 }, () =>
      filterAndOrderMembers(READ_ONLY_REPLICA, [...members])
    );

    for (const sorted of sortedArrays) {
      // the items should be placed in preference order
      expect(sorted[0].state).toEqual(VNodeState.READONLYREPLICA);
      expect(sorted[1].state).toEqual(VNodeState.READONLYREPLICA);
      expect(sorted[2].state).toEqual(VNodeState.PREREADONLYREPLICA);
      expect(sorted[3].state).toEqual(VNodeState.READONLYLEADERLESS);
      // the rest are random
    }

    expect(countUnique(sortedArrays)).toBeGreaterThan(1);
  });
});
