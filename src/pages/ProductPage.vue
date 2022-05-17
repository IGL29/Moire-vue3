<template>
  <LoaderElement v-if="loadingProduct" />

  <ErrorNotify v-else-if="errorResponse" />

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
            :src="pictureByColor"
            srcset="img/product-square-1@2x.jpg 2x"
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
          <form class="form" action="#" method="POST" @submit.prevent="doAddProductToCart">
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

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <AboutProductTabs />

      <router-link :to="{ name: 'cart' }" title="Перейти в корзину">
        <NotifyMessage
          v-if="successfulRequestNotify"
          text="Товар добавлен в корзину"
        />
      </router-link>

      <NotifyMessage
        v-if="errorRequestNotify"
        text="Произошла ошибка при добавлении товара"
      />

    </section>
  </main>
</template>

<script>
import {
  ref, computed, watch, onBeforeMount,
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
import useAddProductToCart from '@/composables/useAddProductToCart';

export default {
  name: 'ProductPage',
};
</script>

<script setup>
const $route = useRoute();
const $store = useStore();

const loadingProduct = ref(false);
const errorResponse = ref(false);
const doLoadProduct = () => {
  loadingProduct.value = true;
  errorResponse.value = false;
  const { slug } = $route.params;
  $store
    .dispatch('loadProductData', { slug })
    .then(() => {
      loadingProduct.value = false;
      errorResponse.value = false;
    })
    .catch(() => {
      loadingProduct.value = false;
      errorResponse.value = true;
    });
};

const { postProductToCart, isLoading: isLoadingPostProductToCart } = useAddProductToCart();

const quantityProducts = ref(1);
const doAddProductToCart = () => {
  $store.dispatch('addProductToCart', {
    productId: product.value.id,
    colorId: selectedColorId.value,
    sizeId: selectedSizeId.value,
    quantity: quantityProducts.value,
  })
    .then(() => {
      $store.commit('showNotifySuccess');
    })
    .catch(() => {
      $store.commit('showNotifyError');
    });
};

const product = computed(() => $store.state.productData);
const selectedColorId = ref('');
const selectedSizeId = ref('');
const doSetDefaultSize = () => {
  const defaultSize = product.value.sizes[0].id;
  if (defaultSize) {
    selectedSizeId.value = defaultSize;
  }
};
const doSetDefaultColor = () => {
  const defaultColor = product.value.colors[0].color.id;
  if (defaultColor) {
    selectedColorId.value = defaultColor;
  }
};

const pictureByColor = useChangeImage(product.value, selectedColorId);

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

const successfulRequestNotify = computed(() => $store.getters.successfulRequestNotify);
const errorRequestNotify = computed(() => $store.getters.errorRequestNotify);

$store.commit('clearTimerNotify');
doLoadProduct();

watch(() => product, () => {
  doSetDefaultColor();
  doSetDefaultSize();
});

onBeforeMount(() => {

});
</script>
