<template>
  <LoaderElement v-if="loadingCart"/>

  <ErrorNotify v-else-if="errorRequest"  class="wrapper__cart" />

  <main class="content container" v-else>
    <div class="content__top">

      <BreadCrumbs
        :routePages="[{ name: 'main', title: 'Каталог'}]"
        currentNamePageText="Корзина"
      />

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>

        <span class="content__info">
          {{ numberProducts }}
          {{ countProducts }}
        </span>
      </div>
    </div>

    <section class="cart">

      <form
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <ProductsNotFound
            v-if="!productsCart.length"
            :message="messageCartEmpty"
            class="cart__not-found"
          />

          <ul class="cart__list">
            <CartItem
              v-for="product of productsCart"
              :key="product.id"
              :product="product"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">Итого: <span>{{ totalPrice }} ₽</span></p>

          <template v-if="numberProducts">
            <router-link :to="{ name: 'order' }"
              v-slot="{navigate}"
              custom
            >
              <button
                type="submit" class="cart__button button button--primery" @click="navigate">
                Оформить заказ
              </button>
          </router-link>
          </template>
        </div>
      </form>

      <NotifyMessage
        v-if="successfulRequestNotify"
        text="Товар удален из корзины"
      />

      <NotifyMessage
        v-if="errorRequestNotify"
        text="Произошла ошибка при удалении товара"
      />
    </section>
  </main>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import useDeclination from '@/composables/useDeclination';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ProductsNotFound from '@/components/ProductsNotFound.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import CartItem from '@/components/CartItem.vue';
import NotifyMessage from '@/components/NotifyMessage.vue';

export default {
  name: 'CartPage',
};
</script>

<script setup>
const $store = useStore();
const messageCartEmpty = 'Корзина пуста...';

const productsCart = computed(() => $store.getters.basketData);
const totalPrice = computed(() => $store.getters.totalPriceCart);
const numberProducts = computed(() => $store.getters.numberProductsInCart);
const successfulRequestNotify = computed(() => $store.getters.successfulRequestNotify);
const errorRequestNotify = computed(() => $store.getters.errorRequestNotify);

const countProducts = computed(() => useDeclination(numberProducts, ['товар', 'товара', 'товаров']));

const loadingCart = ref(false);
const errorRequest = ref(false);
const getProducts = () => {
  loadingCart.value = true;
  errorRequest.value = false;
  $store.dispatch('loadBasketData')
    .then(() => {
      loadingCart.value = false;
    })
    .catch(() => {
      loadingCart.value = false;
      errorRequest.value = true;
    });
};

$store.commit('clearTimerNotify');
getProducts();
</script>
