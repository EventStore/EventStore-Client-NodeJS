import { ConnectionOptions } from "../../Client/parseConnectionString";

export const valid: Array<
  [connectionString: string, expected: ConnectionOptions]
> = [
  [
    "esdb://localhost",
    {
      dnsDiscover: false,
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
    "esdb://user:pass@localhost:2114/?throwOnAppendFailure=false",
    {
      dnsDiscover: false,
      throwOnAppendFailure: false,
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
      tls: false,
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
      nodePreference: "follower",
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
      tls: false,
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
      tls: false,
      hosts: [
        {
          address: "127.0.0.1",
          port: 21573,
        },
      ],
    },
  ],
  [
    "esdb://host1,host2,host3?throwOnAppendFailure=false",
    {
      dnsDiscover: false,
      throwOnAppendFailure: false,
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
    "esdb+discover://user:pass@host?nodePreference=follower&throwOnAppendFailure=false",
    {
      dnsDiscover: true,
      nodePreference: "follower",
      throwOnAppendFailure: false,
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
    "esdb+discover://host?nodePreference=Follower",
    {
      dnsDiscover: true,
      nodePreference: "follower",
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?tlsCAFile=/home/user/dev/cert.ca",
    {
      dnsDiscover: false,
      tlsCAFile: "/home/user/dev/cert.ca",
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?tlsCAFile=./cert.ca",
    {
      dnsDiscover: false,
      tlsCAFile: "./cert.ca",
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?tlsCAFile=C:\\Certificates\\EventStore\\Cert.ca",
    {
      dnsDiscover: false,
      tlsCAFile: "C:\\Certificates\\EventStore\\Cert.ca",
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?tlsCAFile=..\\EventStore\\Cert.ca",
    {
      dnsDiscover: false,
      tlsCAFile: "..\\EventStore\\Cert.ca",
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
    "esdb://my%3Agreat%40username:UyeXx8%24%5EPsOo4jG88FlCauR1Coz25q@host?nodePreference=follower&throwOnAppendFailure=false",
    {
      dnsDiscover: false,
      nodePreference: "follower",
      throwOnAppendFailure: false,
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
    "esdb+discover://user:pass@морда-кошки.ru,ощущение-картофеля.ru?nodePreference=follower&throwOnAppendFailure=false",
    {
      dnsDiscover: true,
      nodePreference: "follower",
      throwOnAppendFailure: false,
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
    "esdb://host?maxDiscoverAttempts=200&discoveryInterval=1000&gossipTimeout=1&nodePreference=leader&tls=false&tlsVerifyCert=true&throwOnAppendFailure=false&keepAliveInterval=10",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 200,
      discoveryInterval: 1000,
      gossipTimeout: 1,
      nodePreference: "leader",
      tls: false,
      tlsVerifyCert: true,
      throwOnAppendFailure: false,
      keepAliveInterval: 10,
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://host?MaxDiscoverAttempts=200&discoveryinterval=1000&GOSSIPTIMEOUT=1&nOdEpReFeReNcE=leader&TLS=false&TlsVerifyCert=true&THROWOnAppendFailure=false&KEEPALIVEinterval=200",
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 200,
      discoveryInterval: 1000,
      gossipTimeout: 1,
      nodePreference: "leader",
      tls: false,
      tlsVerifyCert: true,
      throwOnAppendFailure: false,
      keepAliveInterval: 200,
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    `esdb://host?MaxDiscoverAttempts=200&discovery-interval=1000&GOSSIP_TIMEOUT=1&node_preference=ReadOnlyReplica&TLS=false&TlsVerifyCert=true&THROWOnAppendFailure=false      &   KEEPALIVEinterval=200`,
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 200,
      discoveryInterval: 1000,
      gossipTimeout: 1,
      nodePreference: "read_only_replica",
      tls: false,
      tlsVerifyCert: true,
      throwOnAppendFailure: false,
      keepAliveInterval: 200,
      hosts: [
        {
          address: "host",
          port: 2113,
        },
      ],
    },
  ],
  [
    `esdb://     host
      ?    MaxDiscoverAttempts=200
      &discoveryinterval=1000
      &GOSSIPTIMEOUT=1
      &nOdEpReFeReNcE=leader
      &TLS=false
      &TlsVerifyCert=true
      &
      THROWOnAppendFailure
      =
      false      &   KEEPALIVEinterval=200`,
    {
      dnsDiscover: false,
      maxDiscoverAttempts: 200,
      discoveryInterval: 1000,
      gossipTimeout: 1,
      nodePreference: "leader",
      tls: false,
      tlsVerifyCert: true,
      throwOnAppendFailure: false,
      keepAliveInterval: 200,
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
  "esdb://my:great@username:UyeXx8$^PsOo4jG88FlCauR1Coz25q@host?nodePreference=follower&throwOnAppendFailure=false",
  "esdb://host1;host2;host3?throwOnAppendFailure=false",
  "esdb://host1,host2:200:300?throwOnAppendFailure=false",
  "esdb://throwOnAppendFailure=false",
  "esdb://localhost/&throwOnAppendFailure=false",
  "esdb://localhost?throwOnAppendFailure=false?nodePreference=follower",
  "esdb://localhost?throwOnAppendFailure=false&nodePreference=any",
  "esdb://localhost?throwOnAppendFailure=if you feel like it",
  "esdb://localhost?throwOnAppendFailure=sometimes",
  "esdb://localhost?keepAliveTimeout=please",
  "esdb://localhost?keepAliveInterval=XXIV",
];

export const warning: Array<
  [connectionString: string, expected: ConnectionOptions]
> = [
  [
    "esdb://localhost?catchOnAppendFailure=true&throwOnAppendFailure=false",
    {
      dnsDiscover: false,
      throwOnAppendFailure: false,
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
      hosts: [
        {
          address: "localhost",
          port: 2113,
        },
      ],
    },
  ],
  [
    "esdb://localhost?tlsVerifyCert=false",
    {
      dnsDiscover: false,
      tlsVerifyCert: false,
      hosts: [
        {
          address: "localhost",
          port: 2113,
        },
      ],
    },
  ],
];
