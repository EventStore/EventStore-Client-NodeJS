import { v4 as uuid } from "uuid";
import * as eventstore from "../index";
import {EventData, ReadStreamResult, Revision} from "../types";

describe("subscribe to $all", function () {
    it("should successfully subsscribe to $all", async function () {
        const connection = eventstore.EventStoreConnection.builder().build(
            "localhost:2113"
        );

        const promise = new Promise<number>((resolve, reject) => {
            let count = 0;
            connection
                .streams()
                .subscribeToAll()
                .execute({
                    onEnd: () => { resolve(count)},
                    onConfirmation: () => {},
                    onEvent: (event) => {
                        console.log(JSON.stringify(event, null, 4));
                        ++count;
                        if (count === 3) {
                            resolve(count)
                        }
                    }
                });
        });

        const result = await promise;
        expect(result).toBe(3);
    });
});