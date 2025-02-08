<script setup lang="ts">
import { ref, watch } from 'vue';
import { reboot, shutdown, sleep } from '../../utils/power_manage_fns';


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

const emit = defineEmits(['response'])

watch(action, () => emit('response', action))

</script>

<template>
  <div class="d-flex align-center flex-row justify-center">
    <v-btn-toggle color="deep-purple-accent-3" :divided="true">
      <v-btn @click="action = 'sleep'" >
        <v-icon >{{ "mdi-power-sleep" }}</v-icon>
      </v-btn>
      <v-btn @click="action = 'shutdown'">
        <v-icon >{{ "mdi-power" }}</v-icon>
      </v-btn>
      <v-btn @click="action = 'reboot'">
        <v-icon >{{ "mdi-restart" }}</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>