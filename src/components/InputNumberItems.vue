<template>
  <div class="content__form-container form-container">
  <form class="form-container__form">
      <span class="form-container__span">Количество товаров на странице:</span>
      <label v-for="number, index in prevNumbers" :key="index" class="form-container__label">
        <input
          class="form-container__input"
          type="radio"
          name="prevNumberProduct"
          :value="number"
          v-model="numberItems"
        >
        <span class="form-container__number">{{ number }}</span>
      </label>
  </form>
</div>
</template>

<script>
import { defineProps, defineEmits, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'InputNumberItems',
};
</script>

<script setup>
const $store = useStore();

const emits = defineEmits(['update:loading', 'update:error']);

defineProps(['loading', 'error']);

const prevNumbers = [12, 24, 32];

const numberPrevProducts = computed(() => $store.getters.numberPrevProducts);
const numberItems = computed({
  get() {
    return numberPrevProducts.value;
  },
  set(value) {
    emits('update:error', false);
    emits('update:loading', true);
    $store.commit('page/updateNumberPrevProducts', value);
    $store.dispatch('products/loadProductsData')
      .catch(() => { emits('update:error', true); })
      .finally(() => { emits('update:loading', false); });
  },
});
</script>
