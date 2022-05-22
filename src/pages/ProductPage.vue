<template>
  <LoaderElement v-if="isLoading" />

  <ErrorNotify @do-repeat-request="fetchProduct" v-else-if="isError" />

  <main class="content container" v-else-if="product">
    <div class="content__top">
      <BreadCrumbs
      :routePages="[{ name: 'main', title: 'Каталог' }, { name: 'main', title: category }]"
      currentNamePageText="Корзина" />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="srcImage"
            alt="Название товара"
          />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="doPostProductToCart">
            <div class="item__row item__row--center">
              <CounterInput v-model="quantityProducts" />

              <b class="item__price"> {{ product.price }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color of product.colors" :key="color.id">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        :value="color.color.id"
                        v-model="selectedColorId"
                      />
                      <span class="colors__value" :style="{ backgroundColor: color.color.code }">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" name="size" v-model="selectedSizeId">
                    <option v-for="size of product.sizes" :key="size.id" :value="size.id">{{
                      size.title
                    }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <BaseButton class="item__button" text="В корзину" />
          </form>
        </div>
      </div>

      <AboutProductTabs />

      <router-link :to="{ name: 'cart' }" title="Перейти в корзину">
        <NotifyMessage
          :isVisible="successfulRequestNotify"
          text="Товар добавлен в корзину"
        />
      </router-link>

      <NotifyMessage
        :isVisible="errorRequestNotify"
        text="Произошла ошибка при добавлении товара"
      />

    </section>
  </main>
</template>

<script>
import {
  ref, computed, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AboutProductTabs from '@/components/AboutProductTabs.vue';
import useChangeImage from '@/composables/useChangeImage';
import NotifyMessage from '@/components/NotifyMessage.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CounterInput from '@/components/CounterInput.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import BaseButton from '@/components/BaseButton.vue';
import useAddProductToCart from '@/composables/useAddProductToCart';
import useLoadProduct from '@/composables/useLoadProduct';

export default {
  name: 'ProductPage',
};
</script>

<script setup>
const $store = useStore();
const $route = useRoute();

const { fetchProduct, isLoading, isError } = useLoadProduct();
fetchProduct();

const { postProductToCart } = useAddProductToCart();
const product = computed(() => $store.getters['products/product']);
const quantityProducts = ref(1);
const selectedColorId = ref('');
const selectedSizeId = ref('');
const doPostProductToCart = () => postProductToCart({
  productId: product.value.id,
  colorId: selectedColorId.value,
  sizeId: selectedSizeId.value,
  quantity: quantityProducts.value,
});

const doSetDefaultSize = () => {
  const defaultSize = product.value.sizes[0].id;
  if (defaultSize) {
    selectedSizeId.value = defaultSize;
  }
};
const doSetDefaultColor = () => {
  const defaultColor = $route.params.color || product.value.colors[0].color.id;
  if (defaultColor) {
    selectedColorId.value = defaultColor;
  }
};

const { srcImage, doSetImage } = useChangeImage();

const category = computed(() => {
  if (product.value?.category?.title) {
    return product.value.category.title;
  }
  return 'Категория';
});

const title = computed(() => {
  if (product.value?.title) {
    return product.value.title;
  }
  return 'Название товара';
});

const successfulRequestNotify = computed(() => $store.getters['notify/successfulRequestNotify']);
const errorRequestNotify = computed(() => $store.getters['notify/errorRequestNotify']);

$store.commit('notify/clearTimerNotify');

watch(product, () => {
  doSetDefaultColor();
  doSetDefaultSize();
});

doSetImage(product.value, selectedColorId.value);
watch(selectedColorId, () => doSetImage(product.value, selectedColorId.value));
</script>
