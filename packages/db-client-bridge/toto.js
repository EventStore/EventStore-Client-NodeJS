const esdb = require(".");

function isAsyncIterable(obj) {
  console.log(obj);
  console.log(`obj -> ${typeof obj[Symbol.asyncIterator]}`);
  return obj && typeof obj[Symbol.asyncIterator] === "function";
}

async function main() {
  const toto = async function* () {};

  console.log(`is async iterable -> ${isAsyncIterable(toto)}`);

  const client = esdb.createClient(
    "esdb://admin:changeit@localhost:2113?tls=true&tlsVerifyCert=false"
  );

  const stream = await client.readStream("my_stream_2_000_000", {
    fromRevision: BigInt(0),
    direction: "forwards",
    maxCount: BigInt(5),
    requiresLeader: true,
  });

  console.log(`is async iterable -> ${isAsyncIterable(stream)}`);

  var count = 0;
  for await (const resolved of stream) {
    if (resolved == undefined) {
      continue;
    }

    count++;

    console.log(resolved);
    console.log(
      `stream ${resolved.event.streamId} -> ${resolved.event.revision}`
    );
  }

  console.log(`count -> ${count}`);
}

main();
