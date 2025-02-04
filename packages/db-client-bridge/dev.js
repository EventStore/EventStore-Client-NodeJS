const esdb = require('.');

(async () => {
    const client = esdb.createClient('esdb://localhost:2113?tls=false');

    const stream = await client.readStream('test', {
        fromRevision: BigInt(0),
        direction: 'forwards',
        maxCount: BigInt(5),
        requiresLeader: true,
    });

    for await (const resolved of stream) {
        console.log(resolved);
    }
})();
