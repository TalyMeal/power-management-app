import { invoke } from "@tauri-apps/api/core";

export async function shutdown(time: number) {
    const setTimeoutId = setTimeout(async() => await invoke("os_shutdown"), time)
    return setTimeoutId
}

export async function reboot(time: number) {
    const setTimeoutId = setTimeout(async() => await invoke("os_reboot"), time)
    return setTimeoutId
}

export async function sleep(time: number): Promise<number> {
    const setTimeoutId = setTimeout(() => invoke("os_sleep"), time)
    return setTimeoutId
}
