const esdb = require('.');

(async () => {
    const client = esdb.createClient('esdb://localhost:2113?tls=false');

    const stream = await client.readStream('test');

    for await (const resolved of stream) {
        console.log(resolved);
    }
})();
