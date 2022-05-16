<template>
<ul class="colors colors--black">
  <li class="colors__item" v-for="color of colors" :key="color.color.id" :ref="doFillRef">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        :name="`colors-item-${productSlug}`"
        :value="color.color.id"
        v-model="changeColor"
      />
      <span class="colors__value" :style="{ backgroundColor: color.color.code }" />
    </label>
  </li>
</ul>
</template>

<script>
import {
  defineProps, defineEmits, reactive, computed, onBeforeUpdate,
} from 'vue';

export default {
  name: 'ProductColors',
};
</script>

<script setup>
const props = defineProps(['colors', 'productSlug', 'modelValue']);

const emits = defineEmits(['update:modelValue']);
const changeColor = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});

let productsElement = reactive([]);
const doFillRef = (element) => {
  if (element) {
    productsElement.push(element);
  }
};
onBeforeUpdate(() => {
  productsElement = [];
});
</script>
