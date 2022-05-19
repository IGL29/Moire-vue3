<template>
  <textarea
    class="form__input form__input--area"
    name="comments"
    placeholder="Ваши пожелания"
    v-model="textareaValue"
  ></textarea>
</template>

<script>
import { defineProps, computed, defineEmits } from 'vue';

export default {
  name: 'FieldTextaria',
};
</script>

<script setup>
const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const textareaValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
  },
});
</script>
