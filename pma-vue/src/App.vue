<script setup lang="ts">
import { useTheme } from 'vuetify'
import ClockFace from "./components/ClockFace/index.vue";
import ActionButtons from "./components/ActionButtons/index.vue";
import ControlButtons from "./components/ControlButtons/index.vue";
import { ref, watch } from "vue";
import { Clockfaces } from './types';

const theme = useTheme()

const [clockfaceData, switchTheme, isDisable] = [ref(), ref("mdi-weather-sunny"), ref<boolean>(true)]


function toggleTheme() {
  if(theme.global.current.value.dark){
    theme.global.name.value = 'light'
    switchTheme.value = "mdi-weather-night"
  } else {
    theme.global.name.value = 'dark'
    switchTheme.value = "mdi-weather-sunny"
  }
}

watch(clockfaceData, () => isDisable.value = clockfaceData.value.clockfaces.reduce((prev: number, curr: Clockfaces) => prev + curr.vl, 0) === 0)

watch(isDisable, () => {
  clearInterval(clockfaceData.value.setDelayId.intervalId)
})

watch(clockfaceData, () => console.log(clockfaceData))

</script>

<template>
  <v-app>
    <main class="container">
      <v-btn style="position: absolute; right: 10px; top: 10px;" icon variant="plain" @click="toggleTheme"><v-icon >{{switchTheme}}</v-icon></v-btn>
      <ClockFace @response="(msg: any) => clockfaceData = msg" />
      <ActionButtons @response="(msg: any) => clockfaceData.setDelayId.actionName = msg" />
      <ControlButtons :isDisable="isDisable" :clockfaceData="clockfaceData"/>
    </main>
  </v-app>
</template>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  width: 450px;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

html,
body {
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

input {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  outline: none;
}
</style>