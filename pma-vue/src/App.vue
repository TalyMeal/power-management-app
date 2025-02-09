<script setup lang="ts">
import { useTheme } from 'vuetify'
import ClockFace from "./components/ClockFace/index.vue";
import ActionButtons from "./components/ActionButtons/index.vue";
import ControlButtons from "./components/ControlButtons/index.vue";
import { reactive, ref, watch } from "vue";
import { ClockFaceData, Clockfaces } from './types';

const theme = useTheme()

const [switchTheme, isDisable] = [ref<string>("mdi-weather-sunny"), ref<boolean>(true)]

const clockfaceData: ClockFaceData = reactive({
  clockfaces: [
    { id: 1, label: 'hours', limit: 23, vl: 0 },
    { id: 2, label: 'minutes', limit: 59, vl: 0 },
    { id: 3, label: 'seconds', limit: 59, vl: 0 }
  ],
  setDelayId: {
    intervalId: 0,
    timeoutId: 0,
  },
  actionName: ''
})

function toggleTheme() {
  if(theme.global.current.value.dark){
    theme.global.name.value = 'light'
    switchTheme.value = "mdi-weather-night"
  } else {
    theme.global.name.value = 'dark'
    switchTheme.value = "mdi-weather-sunny"
  }
}

watch(clockfaceData, 
      () => isDisable.value = clockfaceData.clockfaces.reduce((prev: number, curr: Clockfaces) => prev + curr.vl, 0) === 0)

watch(isDisable, 
      () => clearInterval(clockfaceData.setDelayId.intervalId))

</script>

<template>
  <v-app>
    <main class="container">
      <v-btn style="position: absolute; 
                    right: 10px; 
                    top: 10px;" 
             icon variant="plain" 
             @click="toggleTheme">
        <v-icon >{{switchTheme}}</v-icon>
      </v-btn>
      <ClockFace :clockfaces="clockfaceData.clockfaces" 
                 :setDelayId="clockfaceData.setDelayId" 
                 @response="(clockfaces: Clockfaces[]) => clockfaceData.clockfaces = clockfaces"
      />
      <ActionButtons :actionName="clockfaceData.actionName" 
                     @response="(action: string) => clockfaceData.actionName = action" 
      />
      <ControlButtons :isDisable="isDisable" 
                      :clockfaceData="clockfaceData"
      />
    </main>
  </v-app>
</template>

<style>

html,
body {
  line-height: 24px;
  width: 450px;
  user-select: none;
  -ms-overflow-style: none; /* IE and Edge /
scrollbar-width: none; / Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar {
  display: none;
}

.container {
  margin: 0;
  padding-top: 6vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>