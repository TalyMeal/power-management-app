<script setup lang="ts">
import { computed, onUpdated, ref, watch } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme()

const props = defineProps({
  label: String,
  limit: Number,
  count: Number
})

const bgColor = ref('black')
const textColor = ref('white')

// Вычисляем объект с CSS-переменными
const cssVars = computed(() => ({
  '--input-bg': theme.global.current.value.dark ? bgColor.value : 'while',
  '--input-color': theme.global.current.value.dark ? textColor.value : 'while',  
}))

const count = ref(0)

const emit = defineEmits(['response'])

watch(count, () => emit('response', count.value))

onUpdated(() => {
  count.value = props.count!
})

const onChange = (e: any) => {
  count.value = e.target.value < props.limit! && e.target.value >= 0 ?
    e.target.value :
    props.limit!

}

</script>

<template>
  <input v-model="props.count" placeholder="00" @input="onChange" maxlength="2" class="rounded-0 text-center" size="2" :style="cssVars">
  <span class="text-subtitle-1 font-weight-black text-uppercase ma-2"
    style="width: 96px; font-family: 'Courier New', monospace">{{ label }}</span>
  <v-btn-group class="rounded-0" variant="outlined" divided>
    <v-btn @click="count < props.limit! ? count++ : count = 0" class="rounded-0" icon="mdi-plus"></v-btn>
    <v-btn @click="count > 0 && count <= props.limit! ? count-- : count = props.limit!" class="rounded-0"
      icon="mdi-minus"></v-btn>
  </v-btn-group>
</template>

<style lang="css" scoped>

input {
  background-color: var(--input-bg, black);
  color: var(--input-color, white);
  padding: 15px 12px 15px 12px;
  margin-bottom: 3px;
  font-family: 'Courier New', monospace;
  font-size: 56px;
  width: 96px;
}

</style>