import { ConnectionOptions } from "../../Client/parseConnectionString";

export const valid: Array<
  [connectionString: string, expected: ConnectionOptions]
> = [
  [
    "esdb://localhost",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "localhost",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://localhost:2114",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "localhost",
          port: 2114,
        },
      ],
    },
  ],
  [
    "esdb://user:pass@localhost:2114",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "localhost",
          port: 2114,
        },
      ],
    },
  ],
  [
    "esdb://user:pass@localhost:2114/",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "localhost",
          port: 2114,
        },
      ],
    },
  ],
  [
    "esdb://user:pass@localhost:2114/?tlsVerifyCert=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: false,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "localhost",
          port: 2114,
        },
      ],
    },
  ],
  [
    "esdb://user:pass@localhost:2114?tlsVerifyCert=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: false,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "localhost",
          port: 2114,
        },
      ],
    },
  ],
  [
    "esdb://user:pass@localhost:2114?tls=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: false,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "localhost",
          port: 2114,
        },
      ],
    },
  ],
  [
    "esdb://host1,host2,host3",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "host1",
          port: 2113,
        },
        {
          address: "host2",
          port: 2113,
        },
        {
          address: "host3",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host1:1234,host2:4321,host3:3231",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "host1",
          port: 1234,
        },
        {
          address: "host2",
          port: 4321,
        },
        {
          address: "host3",
          port: 3231,
        },
      ],
    },
  ],
  [
    "esdb://bubaqp2rh41uf5akmj0g-0.mesdb.eventstore.cloud:2113,bubaqp2rh41uf5akmj0g-1.mesdb.eventstore.cloud:2113,bubaqp2rh41uf5akmj0g-2.mesdb.eventstore.cloud:2113",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "bubaqp2rh41uf5akmj0g-0.mesdb.eventstore.cloud",
          port: 2113,
        },
        {
          address: "bubaqp2rh41uf5akmj0g-1.mesdb.eventstore.cloud",
          port: 2113,
        },
        {
          address: "bubaqp2rh41uf5akmj0g-2.mesdb.eventstore.cloud",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://user:pass@host1:1234,host2:4321,host3:3231?nodePreference=follower",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "follower",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "host1",
          port: 1234,
        },
        {
          address: "host2",
          port: 4321,
        },
        {
          address: "host3",
          port: 3231,
        },
      ],
    },
  ],
  [
    "esdb://host1,host2,host3?tls=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: false,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "host1",
          port: 2113,
        },
        {
          address: "host2",
          port: 2113,
        },
        {
          address: "host3",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://127.0.0.1:21573?tls=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: false,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "127.0.0.1",
          port: 21573,
        },
      ],
    },
  ],
  [
    "esdb://host1,host2,host3?tlsVerifyCert=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: false,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "host1",
          port: 2113,
        },
        {
          address: "host2",
          port: 2113,
        },
        {
          address: "host3",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb+discover://user:pass@host?nodePreference=follower&tlsVerifyCert=false",
    {
      dnsDiscover: true,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "follower",
      tls: true,
      tlsVerifyCert: false,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?keepAliveInterval=-1&keepAliveTimeout=-1",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: -1,
      keepAliveTimeout: -1,
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://my%3Agreat%40username:UyeXx8%24%5EPsOo4jG88FlCauR1Coz25q@host?nodePreference=follower&tlsVerifyCert=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "follower",
      tls: true,
      tlsVerifyCert: false,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "my:great@username",
        password: "UyeXx8$^PsOo4jG88FlCauR1Coz25q",
      },
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb+discover://user:pass@морда-кошки.ru,ощущение-картофеля.ru?nodePreference=follower&tlsVerifyCert=false",
    {
      dnsDiscover: true,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "follower",
      tls: true,
      tlsVerifyCert: false,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      defaultCredentials: {
        username: "user",
        password: "pass",
      },
      hosts: [
        {
          address: "морда-кошки.ru",
          port: 2113,
        },
        {
          address: "ощущение-картофеля.ru",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?maxDiscoverAttempts=200&discoveryInterval=1000&gossipTimeout=1&nodePreference=leader&tls=false&tlsVerifyCert=false&throwOnAppendFailure=false&keepAliveInterval=10",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 200,
      discoveryInterval: 1000,
      gossipTimeout: 1,
      nodePreference: "leader",
      tls: false,
      tlsVerifyCert: false,
      throwOnAppendFailure: false,
      keepAliveInterval: 10,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?MaxDiscoverAttempts=200&discoveryinterval=1000&GOSSIPTIMEOUT=1&nOdEpReFeReNcE=leader&TLS=false&TlsVerifyCert=false&THROWOnAppendFailure=false&KEEPALIVEinterval=200",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 200,
      discoveryInterval: 1000,
      gossipTimeout: 1,
      nodePreference: "leader",
      tls: false,
      tlsVerifyCert: false,
      throwOnAppendFailure: false,
      keepAliveInterval: 200,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
];

export const invalid: string[] = [
  "localhost",
  "https://console.eventstore.cloud/",
  "esbd+discovery://localhost",
  "esdb://my:great@username:UyeXx8$^PsOo4jG88FlCauR1Coz25q@host?nodePreference=follower&tlsVerifyCert=false",
  "esdb://host1;host2;host3?tlsVerifyCert=false",
  "esdb://host1,host2:200:300?tlsVerifyCert=false",
  "esdb://tlsVerifyCert=false",
  "esdb://localhost/&tlsVerifyCert=false",
  "esdb://localhost?tlsVerifyCert=false?nodePreference=follower",
  "esdb://localhost?tlsVerifyCert=false&nodePreference=any",
  "esdb://localhost?tlsVerifyCert=if you feel like it",
  "esdb://localhost?throwOnAppendFailure=sometimes",
  "esdb://localhost?keepAliveTimeout=please",
  "esdb://localhost?keepAliveInterval=XXIV",
];

export const warning: Array<
  [connectionString: string, expected: ConnectionOptions]
> = [
  [
    "esdb://localhost?catchOnAppendFailure=true&tlsVerifyCert=false",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: false,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "localhost",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://localhost?someNonsense=follower&doTheThing=true",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 3,
      discoveryInterval: 500,
      gossipTimeout: 3000,
      nodePreference: "random",
      tls: true,
      tlsVerifyCert: true,
      throwOnAppendFailure: true,
      keepAliveInterval: 10_000,
      keepAliveTimeout: 10_000,
      hosts: [
        {
          address: "localhost",
          port: 2113,
        },
      ],
    },
  ],
];
