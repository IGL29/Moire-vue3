<template>
<div class="catalog__not-found not-found">
  <div class="not-found__img"></div>
  <p class="not-found__text">{{ message }}</p>
</div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'ProductsNotFound',
};
</script>

<script setup>
defineProps(['message']);
</script>
