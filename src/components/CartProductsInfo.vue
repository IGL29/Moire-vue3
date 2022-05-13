<template>
<div class="cart__block">
  <OrderList :products="products"/>

  <div class="cart__total">
    <p>Доставка: <b>{{ deliveryPrice }}</b></p>
    <p>Итого:
      <b>{{ numberProducts }}</b>
      {{ declinationMixin(numberProducts, ['товар', 'товара', 'товаров']) }} на сумму
      <b>{{ totalPrice }} ₽</b>
    </p>
  </div>

  <slot />
</div>
</template>

<script>
import OrderList from '@/components/OrderList.vue';
import declinationMixin from '@/utils/declinationMixin.vue';

export default {
  name: 'CartProductsInfo',

  mixins: [declinationMixin],

  props: ['products', 'numberProducts', 'totalPrice', 'deliveryPrice'],

  components: {
    OrderList,
  },
};
</script>
