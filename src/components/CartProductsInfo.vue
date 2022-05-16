<template>
<div class="cart__block">
  <OrderList :products="products"/>

  <div class="cart__total">
    <p>Доставка: <b>{{ deliveryPrice }}</b></p>
    <p>Итого:
      <b>{{ numberProducts }}</b>
      {{ countProducts }} на сумму
      <b>{{ totalPrice }} ₽</b>
    </p>
  </div>

  <slot />
</div>
</template>

<script>
import { defineProps, computed } from 'vue';
import OrderList from '@/components/OrderList.vue';
import useDeclination from '@/composables/useDeclination';

export default {
  name: 'CartProductsInfo',
};
</script>

<script setup>
const props = defineProps(['products', 'numberProducts', 'totalPrice', 'deliveryPrice']);
const countProducts = computed(() => useDeclination(props.numberProducts, ['товар', 'товара', 'товаров']));
</script>
