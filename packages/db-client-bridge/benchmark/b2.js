const esdb = require("../lib");

(async () => {
    const streamName = "my_stream_10_000";
    const client = esdb.createClient('esdb://localhost:2113?tls=false');

    // Warm-up
    console.log("Warming up...");
    const warmupStream = await client.readStream(streamName);
    let warmupCount = 0;
    for await (const _ of warmupStream) {
        if (++warmupCount >= 100) break;
    }
    console.log("Warm-up completed.");

    // Benchmark
    console.log("Starting benchmark...");
    let totalTime = 0;
    const iterations = 20;

    for (let iter = 0; iter < iterations; iter++) {
        const stream = await client.readStream(streamName);
        const start = performance.now();

        let i = 0;
        for await (const resolved of stream)
            i += resolved.commitPosition;

        const duration = performance.now() - start;
        totalTime += duration;
        console.log(`Iteration ${iter + 1}: ${duration} ms`);
    }

    console.log("Benchmark completed.");
    console.log("Average time:", totalTime / iterations, "ms");
})();
