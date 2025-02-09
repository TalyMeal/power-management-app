<script setup lang="ts">

import { onUpdated, watch } from "vue";
import ClockFaceElement from "./ClockFaceElement/index.vue"
import { Clockfaces, DelayIds } from "../../types";

const props = defineProps<{
  clockfaces: Clockfaces[]; // Массив объектов ClockfaceItem
  setDelayId: DelayIds;
}>();

onUpdated(() => {
    if(props.clockfaces.reduce((prev, curr) => prev + curr.vl, 0) === 0) {
        clearInterval(props.setDelayId.intervalId)
        clearTimeout(props.setDelayId.timeoutId)
    } 
})

const emit = defineEmits(['response'])

watch(props.clockfaces, () => emit('response', props.clockfaces))

</script>

<template>
    <div class="d-flex align-center flex-row justify-center pa-3">
        <v-form class="d-flex align-center flex-column ma-4" 
                style="width: 98px" 
                v-for="clockface in props.clockfaces"
                :key="clockface.id">
            <ClockFaceElement :label="clockface.label" 
                              :limit="clockface.limit" 
                              :count="clockface.vl" 
                              @response="(conut: number) => clockface.vl = conut" />
        </v-form>
    </div>
</template>