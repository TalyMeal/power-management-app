<script setup lang="ts">

import { onUpdated, reactive, ref, watch } from "vue";
import ClockFaceElement from "./ClockFaceElement/index.vue"
import { Clockfaces } from "../../types";
import { start, stop } from "../../utils/timer_manage";
import { sleep, shutdown, reboot } from "../../utils/power_manage_fns";

const setDelayId = reactive({
    intervalId: 0,
    timeoutId: 0
})

const action = ref()

function setAction(actionName: string) {
    switch (actionName) {
        case 'sleep':
            action.value = sleep
            break;
        case 'shutdown':
            action.value = shutdown
            break;
        case 'reboot':
            action.value = reboot
            break; default:
            break;
    }
}

const clockfaces: Clockfaces[] = reactive([
    { id: 1, label: 'hours', limit: 23, vl: 0 },
    { id: 2, label: 'minutes', limit: 59, vl: 0 },
    { id: 3, label: 'seconds', limit: 59, vl: 0 }
])

onUpdated(() => {
    clockfaces.reduce((prev, curr) => prev + curr.vl, 0) === 0 ?
        clearInterval(setDelayId.intervalId) : null
})

const emit = defineEmits(['response'])

watch(clockfaces, () => emit('response', clockfaces.reduce((prev, curr) => prev + curr.vl, 0)))

</script>

<template>
    <div class="d-flex align-center flex-row justify-center pa-3">
        <v-form class="d-flex align-center flex-column ma-4" style="width: 98px" v-for="clockface in clockfaces"
            :key="clockface.id">
            <ClockFaceElement :label="clockface.label" :limit="clockface.limit" :count="clockface.vl"
                @response="(msg) => clockface.vl = msg" />
        </v-form>

    </div>
    <div class="d-flex align-center flex-row justify-center">
        <v-btn-toggle color="deep-purple-accent-3">
            <v-btn @click="setAction('sleep')"><v-icon icon="mdi-power-sleep"></v-icon></v-btn>
            <v-btn @click="setAction('reboot')"><v-icon icon="mdi-restart"></v-icon></v-btn>
            <v-btn @click="setAction('shutdown')"><v-icon icon="mdi-power"></v-icon></v-btn>
        </v-btn-toggle>
    </div>
    <div class="d-flex align-center flex-row justify-center pa-3">
        <v-btn style="width: 196px" @click="start(clockfaces, setDelayId, action)"
            :disabled="clockfaces.reduce((prev, curr) => prev + curr.vl, 0) === 0">START
        </v-btn>
        <v-btn style="width: 196px" @click="stop(setDelayId)"
            :disabled="clockfaces.reduce((prev, curr) => prev + curr.vl, 0) === 0">STOP
        </v-btn>
    </div>
</template>