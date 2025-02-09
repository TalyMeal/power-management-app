import { invoke } from "@tauri-apps/api/core";

export function shutdown(time: number) {
    const setTimeoutId = setTimeout(() => invoke("os_shutdown"), time)
    return setTimeoutId
}

export function reboot(time: number) {
    const setTimeoutId = setTimeout(() => invoke("os_reboot"), time)
    return setTimeoutId
}

export function sleep(time: number) {
    const setTimeoutId = setTimeout(() => invoke("os_sleep"), time)
    return setTimeoutId
}
