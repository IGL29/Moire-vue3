<template>
<ul class="colors colors--black">
  <li class="colors__item" v-for="color of colors" :key="color.color.id" :ref="fillref">
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductColors',
  props: ['colors', 'productSlug', 'modelValue'],
  // all emits of current component
  emits: ['update:modelValue'],
  data() {
    return {
      productsElement: [],
    };
  },

  computed: {
    firstColorOption() {
      return this.modelValue || this.colors[0].color.id;
    },
    changeColor: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    // used refs with v-for
    fillref(element) {
      if (element) {
        this.productsElement.push(element);
      }
    },
  },
  beforeUpdate() {
    this.productsElement = [];
  },
});
</script>
