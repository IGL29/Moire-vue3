<template>
  <LoaderElement v-if="loading" />

  <ErrorNotify @do-repeat-request="emitFetchProducts" v-else-if="error"/>

  <ProductsNotFound v-else-if="!products.length" :message="messageNotFoundProducts" />

  <ul class="catalog__list" v-else>
    <ProductsItem v-for="product of products" :key="product.id" :product="product"/>
  </ul>
</template>

<script>
import { defineProps, defineEmits } from 'vue';
import ProductsItem from '@/components/ProductsItem.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import ProductsNotFound from '@/components/ProductsNotFound.vue';

export default {
  name: 'ProductsList',
};
</script>

<script setup>
defineProps(['products', 'error', 'loading']);
const emits = defineEmits(['doRepeatRequest']);

const messageNotFoundProducts = 'Товары с выбранными параметрами фильтра не найдены';
const emitFetchProducts = () => emits('doRepeatRequest');
</script>
