<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="decrement"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="number"
      name="count"
      @input="enteringNumber"
      @focusout="enteringNumFocusOut"
      v-model.number="dataValue"
    />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="increment"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import {
  defineProps, defineEmits, ref,
} from 'vue';

export default {
  name: 'CounterInput',
};
</script>

<script setup>
const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);
const dataValue = ref(props.modelValue ?? 0);

const decrement = () => {
  if (dataValue.value > 1) {
    emits('update:modelValue', dataValue.value -= 1);
  }
};

const increment = () => {
  emits('update:modelValue', dataValue.value += 1);
};

const enteringNumber = () => {
  if (dataValue.value > 0) {
    emits('update:modelValue', dataValue.value);
  }
};

const enteringNumFocusOut = () => {
  if (dataValue.value < 1) {
    dataValue.value = props.modelValue;
  }
};
</script>
