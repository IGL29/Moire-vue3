<template>
  <router-link
    class="header__cart"
    title="Перейти в корзину"
    aria-label="Корзина с товарами"
    :to="{ name: 'cart' }"
  >
    <svg ref="refCart" width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ numberProducts }}</span>
  </router-link>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CartIndicator',
};
</script>

<script setup>
const $store = useStore();
const refCart = ref(null);
const numberProducts = computed(() => $store.getters['cart/numberProductsInCart']);

onMounted(() => {
  $store.commit('setCartElementPosition', refCart.value.getBoundingClientRect());
});
</script>
