<script setup lang="ts">

import { start, stop } from "../../utils/timer_manage";
import { ClockFaceData } from "../../types";

const props = defineProps<{
  clockfaceData: ClockFaceData
  isDisable: boolean
}>();

</script>

<template>
    <div class="d-flex align-center flex-row justify-center pa-6">
        <v-btn-toggle :divided="true">
            <v-btn style="width: 196px" 
                   :disabled="props.isDisable"
                   @click="start(props.clockfaceData.clockfaces, 
                                 props.clockfaceData.setDelayId, 
                                 props.clockfaceData.actionName)">
                START
            </v-btn>
            <v-btn style="width: 196px" 
                   :disabled="props.isDisable" 
                   @click="stop(props.clockfaceData.setDelayId)">
                STOP
            </v-btn>
        </v-btn-toggle>
    </div>
    <!-- DEBUG -->
    <!-- <span>Debug: {{ props }}</span> -->
</template>