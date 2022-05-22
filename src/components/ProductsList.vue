<template>
  <Teleport v-if="isMounted && loading" to=".notify-teleport-target">
      <LoaderElement class="loader-fixed" />
  </Teleport>

  <ErrorNotify @do-repeat-request="emitFetchProducts" v-else-if="error"/>

  <ProductsNotFound v-else-if="!products.length" :message="messageNotFoundProducts" />

  <ul class="catalog__list" v-else>
    <ProductsItem
      v-for="product of products"
      :key="product.id"
      :cartPosition="cartPosition"
      :product="product"
    />
  </ul>
</template>

<script>
import {
  defineProps, defineEmits, ref, computed, onMounted,
} from 'vue';
import { useStore } from 'vuex';
import ProductsItem from '@/components/ProductsItem.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import ProductsNotFound from '@/components/ProductsNotFound.vue';

export default {
  name: 'ProductsList',
};
</script>

<script setup>
const $store = useStore();
defineProps(['products', 'error', 'loading']);
const emits = defineEmits(['doRepeatRequest']);

const messageNotFoundProducts = 'Товары с выбранными параметрами фильтра не найдены';
const emitFetchProducts = () => emits('doRepeatRequest');
const cartPosition = computed(() => $store.getters.getCartElementPosition);

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<style>
.loader-fixed {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
