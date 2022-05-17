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
const props = defineProps(['placeholder', 'type', 'modalValue']);
defineEmits(['update:modalValue']);

const dataInput = computed({
  get() {
    return props.modalValue;
  },
  set(value) {
    this.$emit('update:modalValue', value);
  },
});
</script>
