import { Observable } from "rxjs";
import type {StatsResponse} from "../types/StatsResponse.ts";

export const statsStream$ = new Observable<StatsResponse>((subscriber) => {
    const es = new EventSource("/api/stats/stream");

    es.onmessage = (event) => {
        subscriber.next(JSON.parse(event.data));
    };

    es.onerror = (err) => {
        subscriber.error(err);
        es.close();
    };

    return () => es.close();
});
