<template>
  <Transition mode="out-in">
    <LoaderElement v-if="loadingCart"/>

    <ErrorNotify
      v-else-if="errorRequest"
      @do-repeat-request="getProducts"
      class="wrapper__cart"
    />

    <main v-else class="content container">
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

            <TransitionGroup name="delete-item" mode="out-in" class="cart__list" tag="ul">
              <CartItem
                v-for="product of productsCart"
                :key="product.id"
                :product="product"
              />
            </TransitionGroup>
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
          :isVisible="successfulRequestNotify"
          text="Товар удален из корзины"
        />

        <NotifyMessage
          :isVisible="errorRequestNotify"
          text="Произошла ошибка при удалении товара"
        />
      </section>
    </main>
  </Transition>
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

const productsCart = computed(() => $store.getters['cart/basketData']);
const totalPrice = computed(() => $store.getters['cart/totalPriceCart']);
const numberProducts = computed(() => $store.getters['cart/numberProductsInCart']);
const successfulRequestNotify = computed(() => $store.getters['notify/successfulRequestNotify']);
const errorRequestNotify = computed(() => $store.getters['notify/errorRequestNotify']);

const countProducts = computed(() => useDeclination(numberProducts, ['товар', 'товара', 'товаров']));

const loadingCart = ref(false);
const errorRequest = ref(false);
const getProducts = () => {
  loadingCart.value = true;
  errorRequest.value = false;
  $store.dispatch('cart/loadBasketData')
    .then(() => {
      loadingCart.value = false;
    })
    .catch(() => {
      loadingCart.value = false;
      errorRequest.value = true;
    });
};

$store.commit('notify/clearTimerNotify');
getProducts();
</script>

<style>
.delete-item-move,
.delete-item-leave-active {
  transition: all 0.4s;
}
.delete-item-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
.delete-item-leave-active {
  position: absolute;
}
</style>
