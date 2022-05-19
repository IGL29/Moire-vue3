<template>
  <input class="form__input" :type="type" :placeholder="placeholder" v-model="dataInput"/>
</template>

<script>
import { defineProps, defineEmits, computed } from 'vue';

export default {
  name: 'FieldInput',
};
</script>

<script setup>
const props = defineProps(['placeholder', 'type', 'modelValue']);
const emits = defineEmits(['update:modelValue']);

const dataInput = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});
</script>
