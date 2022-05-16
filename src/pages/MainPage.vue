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

        <InputNumberItems :loading="loadingProducts" :error="errorRequest"/>
      </div>
    </div>

    <div class="content__catalog">

      <FilterForm />

      <section class="catalog">
        <ProductsList
          :products="products"
          :error="errorRequest"
          :loading="loadingProducts"
        />

        <ProductsPagination />

        <Teleport v-if="isMounted" to=".notify-teleport-target">
          <router-link :to="{ name: 'cart' }" title="Перейти в корзину">
          <component
            :is="defineAsyncComponent({
              loader: () => import('@/components/NotifyMessage.vue'),
              delay: 0, // loader display time (between begin loading and loadingComponent)
              loadingComponent: () => h('div', 'Загрузка'),
              // asyncComponent loading dasplay сomponent
            })"
            v-if="successfulRequestNotify"
            text="Товар добавлен в корзину"
          />
          </router-link>
        </Teleport>

        <Teleport v-if="isMounted" to=".notify-teleport-target">
          <component
            :is="defineAsyncComponent({
              loader: () => import('@/components/NotifyMessage.vue'),
              delay: 0, // loader display time (between begin loading and loadingComponent)
              loadingComponent: () => h('div', 'Загрузка'),
              // asyncComponent loading dasplay сomponent
            })"
            v-if="errorRequestNotify"
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
  h, ref, computed, onMounted, nextTick, defineAsyncComponent,
} from 'vue';
import { useStore } from 'vuex';
import useDeclination from '@/composables/useDeclination';
import InputNumberItems from '@/components/InputNumberItems.vue';
import FilterForm from '@/components/FilterForm.vue';
import ProductsPagination from '@/components/ProductsPagination.vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'MainPage',
};
</script>

<script setup>
const $store = useStore();

const products = computed(() => $store.getters.products);
const numberProducts = computed(() => $store.getters.numberProducts);
const successfulRequestNotify = computed(() => $store.getters.successfulRequestNotify);
const errorRequestNotify = computed(() => $store.getters.errorRequestNotify);

defineAsyncComponent({
  loader: () => import('@/components/NotifyMessage.vue'),
  delay: 0, // loader display time (between begin loading and loadingComponent)
  loadingComponent: () => h('div', 'Загрузка'), // asyncComponent loading dasplay сomponent
});

const countProducts = computed(() => useDeclination(numberProducts, ['товар', 'товара', 'товаров']));

const errorRequest = ref(false);
const loadingProducts = ref(false);
const getProducts = () => {
  loadingProducts.value = true;
  errorRequest.value = false;
  $store.dispatch('loadProductsData')
    .then(() => {
      loadingProducts.value = false;
    }).catch(() => {
      loadingProducts.value = false;
      errorRequest.value = true;
    });
};

$store.commit('clearTimerNotify');
getProducts();

const isMounted = ref(false);
onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>
