<script setup lang="ts">
import { ref, watch } from 'vue';

const action = ref<string>()

const emit = defineEmits(['response'])

watch(action, () => emit('response', action))

</script>

<template>
  <div class="d-flex align-center flex-row justify-center">
    <v-btn-toggle color="deep-purple-accent-3" 
                  :divided="true">
      <v-btn @click="action !== 'sleep' ? action = 'sleep' : action = ''" >
        <v-icon >{{ "mdi-power-sleep" }}</v-icon>
      </v-btn>
      <v-btn @click="action !== 'shutdown' ? action = 'shutdown' : action = ''">
        <v-icon >{{ "mdi-power" }}</v-icon>
      </v-btn>
      <v-btn @click="action !== 'reboot' ? action = 'reboot' : action = ''">
        <v-icon >{{ "mdi-restart" }}</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>