<template>
  <label class="form__label">
    <FieldInput
      v-show="formElement === 'input'"
      :type="type"
      :placeholder="placeholder"
      v-model="dataInput"
    />

    <FieldTextarea
      v-show="formElement === 'textaria'"
      :placeholder="placeholder"
      v-model="dataInput"
    />

    <span class="form__value">{{ label }}</span>

    <ErrorField v-if="errorText" :error="errorText"/>
  </label>
</template>

<script>
import { defineProps, defineEmits, computed } from 'vue';
import FieldInput from '@/components/FieldInput.vue';
import ErrorField from '@/components/ErrorField.vue';
import FieldTextarea from '@/components/FieldTextarea.vue';

export default {
  name: 'FormField',
};
</script>

<script setup>
const props = defineProps(['formElement', 'label', 'placeholder', 'type', 'modelValue', 'errorText']);

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
