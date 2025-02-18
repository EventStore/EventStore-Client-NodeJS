const esdb = require("../lib");
const {Bench, hrtimeNow} = require("tinybench");

(async () => {
    const streamName = "my_stream_10_000";
    let client = null;

    const bench = new Bench({
        name: 'EventStoreDB client bridge',
        now: hrtimeNow,
        warmupIterations: 1,
        iterations: 20,
        setup: async () => {
            if (global.gc) {
                global.gc();
                await new Promise((r) => setTimeout(r, 5000));
            }

            client = esdb.createClient('esdb://localhost:2113?tls=false');
        }
    })

    let i = 0;

    bench
        .add('readStream', async () => {
            const stream = client.readStream(streamName, {maxCount: 10_000n});

            for await (const resolved of stream)
                i += resolved.commitPosition;
        })

    await bench.run()

    console.log(bench.name)
    console.table(
        bench.tasks.map(({name, result}) => ({
            "Task Name": name,
            "Period (ms)": result.period,
            "Average Time (ms)": result.mean,
            "Samples": result.samples.length,
        }))
    );
})()

