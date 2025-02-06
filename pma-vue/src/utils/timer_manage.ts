import { Clockfaces } from "../types";

export async function start(clockfaces: Clockfaces[], setDelayId: {
    intervalId: number; timeoutId: number;
}, func: (time: number) => Promise<number>) {
    if (clockfaces.reduce((prev, curr) => prev + curr.vl, 0) > 0) {
        setDelayId.intervalId = setInterval(() => {

            if (clockfaces[1].vl === 0 && clockfaces[2].vl === 0 && clockfaces[0].vl > 0) {
                clockfaces[0].vl--
                clockfaces[1].vl = 60
            }

            if (clockfaces[2].vl === 0 && clockfaces[1].vl > 0) {
                clockfaces[1].vl--
                clockfaces[2].vl = 60
            }
            clockfaces[2].vl--
        }, 1000)
        setDelayId.timeoutId = await func(clockfaces.reduce((prev, curr) => prev + curr.vl, 0) * 1000)
    }
}

export function stop(setDelayId: {
    intervalId: number; timeoutId: number;
}) {
    clearInterval(setDelayId.intervalId)
    clearTimeout(setDelayId.timeoutId)
}