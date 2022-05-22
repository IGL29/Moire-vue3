<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ numberProducts }}
          {{ countProducts }}
        </span>

        <InputNumberItems :loading="isLoading" :error="isError"/>
      </div>
    </div>

    <div class="content__catalog">

      <FilterForm />

      <section class="catalog">
        <ProductsList
          @do-repeat-request="fetchProducts"
          :products="products"
          :error="isError"
          :loading="isLoading"
        />

        <ProductsPagination />

        <Teleport v-if="isMounted" to=".notify-teleport-target">
          <router-link :to="{ name: 'cart' }" title="Перейти в корзину">
            <NotifyMessage :isVisible="successfulRequestNotify" text="Товар добавлен в корзину" />
          </router-link>

          <NotifyMessage
            :isVisible="errorRequestNotify"
            text="Произошла ошибка при добавлении товара"
          />
        </Teleport>
      </section>
    </div>

    <div class="notify-teleport-target" />
  </main>
</template>

<script>
import {
  ref, computed, onMounted, nextTick,
} from 'vue';
import { useStore } from 'vuex';
import NotifyMessage from '@/components/NotifyMessage.vue';
import InputNumberItems from '@/components/InputNumberItems.vue';
import FilterForm from '@/components/FilterForm.vue';
import ProductsPagination from '@/components/ProductsPagination.vue';
import ProductsList from '@/components/ProductsList.vue';
import useDeclination from '@/composables/useDeclination';
import useLoadProducts from '@/composables/useLoadProducts';

export default {
  name: 'MainPage',
};
</script>

<script setup>
const $store = useStore();

const { isLoading, isError, fetchProducts } = useLoadProducts();
fetchProducts();

const products = computed(() => $store.getters['products/products']);
const numberProducts = computed(() => $store.getters['page/numberProducts']);
const successfulRequestNotify = computed(() => $store.getters['notify/successfulRequestNotify']);
const errorRequestNotify = computed(() => $store.getters['notify/errorRequestNotify']);

const countProducts = computed(() => useDeclination(numberProducts, ['товар', 'товара', 'товаров']));

$store.commit('notify/clearTimerNotify');

const isMounted = ref(false);
onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>
