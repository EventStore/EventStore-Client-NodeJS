const esdb = require(".");

(async () => {
    const STREAM_NAME = "my_stream_10_000";
    const WARMUP_COUNT = 2;
    const ITERATION_COUNT = 5;

    const client = esdb.createClient('esdb://localhost:2113?tls=false');

    const read = async () => {
        const start = performance.now();

        const stream = await client.readStream(STREAM_NAME);

        for await (const resolved of stream) {
        }

        return performance.now() - start;
    };

    try {
        let total = 0;
        let best, worst;

        const stamp = (d) => {
            total += d;
        };

        for (let i = 0; i < (ITERATION_COUNT + WARMUP_COUNT); i++) {
            const duration = await read();

            if (i < WARMUP_COUNT) continue;

            if (best == null) {
                best = duration;
            } else if (worst == null) {
                worst = duration;
            } else if (best > duration) {
                stamp(best);
                best = duration;
            } else if (worst < duration) {
                stamp(worst);
                worst = duration;
            } else {
                stamp(duration);
            }
        }

        const avg = total / 5;

        console.log(`avg:   ${avg.toFixed(5)}ms, ${(avg / 10_000).toFixed(5)} per event`);
        console.log(`best:  ${best.toFixed(5)}ms, ${(best / 10_000).toFixed(5)} per event`);
        console.log(`worst: ${worst.toFixed(5)}ms, ${(worst / 10_000).toFixed(5)} per event`);
    } catch (err) {
        throw err;
    }
})()
