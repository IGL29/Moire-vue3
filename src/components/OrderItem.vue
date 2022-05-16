<template>
<li class="cart__order">
  <h3>{{ product.product.title }}</h3>
  <b>{{ product.product.price }} ₽</b>
  <span>Артикул: {{ product.product.id }}</span>
</li>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'OrderItem',
};
</script>

<script setup>
defineProps(['product']);
</script>
