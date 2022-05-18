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
const props = defineProps(['formElement', 'label', 'placeholder', 'type', 'modalValue', 'errorText']);

const emits = defineEmits(['update:modalValue']);

const dataInput = computed({
  get() {
    return props.modalValue;
  },
  set(value) {
    emits('update:modalValue', value);
  },
});
</script>
