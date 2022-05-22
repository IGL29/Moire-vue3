<template>
  <li ref="refWrapperItem" class="catalog__item">
    <button
      class="catalog__btn-add"
      :class="{ 'added-to-cart': productStatus }"
      title="Добавить в корзину"
      @click.prevent="addProductToCart"
    >
      <svg width="24" height="24" v-if="isLoadingFetchProduct || isLoadingPostProductToCart">
        <use xlink:href="#icon-loading"></use>
      </svg>

      <svg width="24" height="24" v-else>
        <use xlink:href="#icon-cart-card"></use>
      </svg>
    </button>

    <router-link
      title="Перейти на страницу товара"
      :to="{ name: 'product', params: { slug: product.slug, color: currentColorId } }"
      class="catalog__pic"
      :class="{
        loadImage: !isLoad && !isLoadError,
        loadImageNext: !isLoad && !isLoadError && isNextLoad,
        errorLoadImage: isLoadError
      }"
    >
      <img
        @load="doSetLoaded"
        @error="doSetLoadError"
        ref="refImage"
        :src="srcImage"
        :alt="product.title"
      />
    </router-link>

    <div class="catalog__wrapper">
      <h3 class="catalog__title">
        <router-link
          title="Перейти на страницу товара"
          :to="{ name: 'product', params: { slug: product.slug, color: currentColorId } }"
        >
          {{ product.title }}
        </router-link>
      </h3>

      <span class="catalog__price"> {{ product.price }} ₽ </span>

      <ProductColors
        v-model="currentColorId"
        :colors="product?.colors"
        :productSlug="product.slug"
      />
    </div>
  </li>
</template>

<script>
import {
  ref, computed, defineProps, watch,
} from 'vue';
import { useStore } from 'vuex';
import ProductColors from '@/components/ProductColors.vue';
import useChangeImage from '@/composables/useChangeImage';
import useAddProductToCart from '@/composables/useAddProductToCart';
import useStatusLoading from '@/composables/useStatusLoading';

export default {
  name: 'ProductsItem',
};
</script>

<script setup>
const $store = useStore();

const props = defineProps(['product', 'cartPosition']);

const firstColorOption = computed(() => props.product.colors[0].color.id);
const productsInCart = computed(() => $store.getters['cart/basketData']);
const selectedColorId = ref('');
const productStatus = computed(() => productsInCart.value.some((productInCart) => (
  (productInCart.product.id === props.product.id
  && Number(productInCart.color.color.id) === Number(selectedColorId.value))
)));

const currentColorId = computed({
  get() {
    return selectedColorId.value || firstColorOption.value;
  },
  set(newValue) {
    selectedColorId.value = newValue;
  },
});

const refWrapperItem = ref(null);

const { srcImage, doSetImage } = useChangeImage();
const {
  isLoad, isNextLoad, isLoadError, doSetLoaded, doSetLoadError, doSetStartLoading,
} = useStatusLoading();

const isLoadingFetchProduct = ref(false);
const { postProductToCart, isLoading: isLoadingPostProductToCart } = useAddProductToCart();
const addProductToCart = async () => {
  isLoadingFetchProduct.value = true;
  const product = await $store.dispatch('products/loadProductData', { slug: props.product.slug });
  const selectedSizeId = product.sizes[0].id;
  isLoadingFetchProduct.value = false;

  postProductToCart({
    productId: props.product.id,
    colorId: currentColorId.value,
    sizeId: selectedSizeId,
    quantity: 1,
  })
    .then(() => {});
};

doSetImage(props.product, currentColorId.value);
watch(currentColorId, () => doSetImage(props.product, currentColorId.value));
watch(srcImage, () => doSetStartLoading());
</script>

<style>
.loadImage {
  position: relative;
}

.loadImage:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(253, 235, 250);
}

.loadImageNext:after {
  background-color: rgba(253, 235, 250, 0.547);
}

.loadImage:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7%;
  background-color: rgba(240, 203, 217, 0.7);
  z-index: 1;
  transition: transform, top;
  animation: loadImage 2s infinite alternate linear;
}

@keyframes loadImage {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
    transform: translateY(-100%);
  }
}
</style>
