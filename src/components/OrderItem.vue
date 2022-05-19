<template>
<li class="cart__order">
  <div>
    <h3>{{ product.product.title }}</h3>
    <span>Артикул: {{ product.product.id }}</span>
  </div>
  <p class="reset-margin">X {{ countProduct }}</p>
  <p><b>{{ product.product.price }} ₽</b></p>
</li>
</template>

<script>
import { defineProps, computed } from 'vue';

export default {
  name: 'OrderItem',
};
</script>

<script setup>
const props = defineProps(['product']);
const countProduct = computed(() => props.product.quantity);
</script>
