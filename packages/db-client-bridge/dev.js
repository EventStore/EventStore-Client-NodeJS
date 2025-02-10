const esdb = require('.');

(async () => {
    const client = esdb.createClient('esdb://localhost:2113?tls=false');

    try {
        const stream = await client.readStream('notfound');

        for await (const resolved of stream) {
            console.log(resolved);
        }
    } catch (error) {
        console.log(error)
    }
})();
