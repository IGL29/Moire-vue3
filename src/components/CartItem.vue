<template>
  <li class="cart__item product">
    <div
      class="product__pic"
      :class="{
        loadImage: !isLoad && !isLoadError,
        loadImageNext: !isLoad && !isLoadError && isNextLoad,
        errorLoadImage: isLoadError
      }"
      >
      <img
        @load="doSetLoaded"
        @error="doSetLoadError"
        :src="checkImage(product)"
        width="120"
        height="120"
        :alt="product.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ product.product.title }}
    </h3>
    <p class="product__info info product__info--color">
      Цвет:
      <span>
        <i class="info__color" :style="{ backgroundColor: product.color.color.code }"></i>
        {{ product.color.color.title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ product.product.id }} </span>

    <CounterInput v-model="quantityProducts"/>

    <b class="product__price"> {{ product.price }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct"
    >
      <svg width="20" height="20" v-if="isLoading">
        <use xlink:href="#icon-loading"></use>
      </svg>

      <svg width="20" height="20" fill="currentColor" v-else>
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>

    <p class="error-message error-message--animation" v-if="isRepeatClickDelete">Уже удаляем...</p>
  </li>
</template>

<script>
import {
  defineProps, ref, watch,
} from 'vue';
import { useStore } from 'vuex';
import CounterInput from '@/components/CounterInput.vue';
import useStatusLoading from '@/composables/useStatusLoading';

export default {
  name: 'CartItem',
};
</script>

<script setup>
const props = defineProps(['product']);
const $store = useStore();

const isLoading = ref(false);
const isRepeatClickDelete = ref(false);
const deleteProduct = () => {
  if (isLoading.value) {
    isRepeatClickDelete.value = true;
    return;
  }
  isLoading.value = true;
  $store.dispatch('cart/deleteProduct', {
    basketItemId: props.product.id,
  })
    .then(() => {
      $store.commit('notify/showNotifySuccess');
    })
    .catch(() => {
      $store.commit('notify/showNotifyError');
    })
    .finally(() => {
      isRepeatClickDelete.value = false;
      isLoading.value = false;
    });
};

const quantityProducts = ref(props.product.quantity);
const changeQuantity = () => {
  $store.dispatch('cart/changeQuantityProduct', {
    basketItemId: props.product.id,
    quantity: quantityProducts.value,
  });
};
watch(quantityProducts, () => changeQuantity());

const checkImage = (product) => {
  if (product.color?.gallery?.[0]?.file.url) {
    return product.color?.gallery?.[0]?.file.url;
  }
  return '../img/no_image.png';
};

const {
  isLoad, isNextLoad, isLoadError, doSetLoaded, doSetLoadError, doSetStartLoading,
} = useStatusLoading();
doSetStartLoading();
</script>
