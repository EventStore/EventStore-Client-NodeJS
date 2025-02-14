const esdb = require("..");
const {Bench, nToMs, hrtimeNow} = require("tinybench");

(async () => {
    const streamName = "my_stream_2_000_000";
    let client = null;

    const bench = new Bench({
        name: 'EventStoreDB client bridge',
        time: 100,
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
            const stream = await client.readStream(streamName, {maxCount: 10_000n});

            for await (const resolved of stream)
                i += 1
        })

    await bench.run()

    console.log(bench.name)
    console.log(bench.table());
    // console.table(bench.table());
    // console.table(
    //     bench.tasks.map(({name, result}) => ({
    //         "Task Name": name,
    //         "Period (ms)": result.period,
    //         "Average Time (ms)": result.mean,
    //         "Samples": result.samples.length,
    //     }))
    // );
})()
