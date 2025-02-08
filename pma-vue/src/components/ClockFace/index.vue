<script setup lang="ts">

import { onUpdated, reactive, watch } from "vue";
import ClockFaceElement from "./ClockFaceElement/index.vue"
import { Clockfaces } from "../../types";

const setDelayId = reactive({
    intervalId: 0,
    timeoutId: 0,
    actionName: ''
})

const clockfaces: Clockfaces[] = reactive([
    { id: 1, label: 'hours', limit: 23, vl: 0 },
    { id: 2, label: 'minutes', limit: 59, vl: 0 },
    { id: 3, label: 'seconds', limit: 59, vl: 0 }
])

onUpdated(() => {
    if(clockfaces.reduce((prev, curr) => prev + curr.vl, 0) === 0) {
        clearInterval(setDelayId.intervalId)
        clearTimeout(setDelayId.timeoutId)
    } 
})

const emit = defineEmits(['response'])

watch(clockfaces, () => emit('response', {clockfaces, setDelayId}))

</script>

<template>
    <div class="d-flex align-center flex-row justify-center pa-3">
        <v-form class="d-flex align-center flex-column ma-4" style="width: 98px" v-for="clockface in clockfaces"
            :key="clockface.id">
            <ClockFaceElement :label="clockface.label" :limit="clockface.limit" :count="clockface.vl"
                @response="(msg) => clockface.vl = msg" />
        </v-form>
    </div>
</template>