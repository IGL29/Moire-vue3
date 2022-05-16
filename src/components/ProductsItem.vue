<template>
  <li class="catalog__item">
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
      :to="{ name: 'product', params: { slug: product.slug } }"
      class="catalog__pic"
    >
      <!-- <img :src="currentImage()" :alt="product.title" /> -->
    </router-link>

    <div class="catalog__wrapper">
      <h3 class="catalog__title">
        <router-link
          title="Перейти на страницу товара"
          :to="{ name: 'product', params: { slug: product.slug } }"
        >
          {{ product.title }}
        </router-link>
      </h3>

      <span class="catalog__price"> {{ product.price }} ₽ </span>

      <ProductColors
        v-model="selectedColorId"
        :colors="product.colors"
        :productSlug="product.slug"
      />
    </div>
  </li>
</template>

<script>
import { ref, computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import ProductColors from '@/components/ProductColors.vue';
import useAddProductToCart from '../composables/useAddProductToCart';
// import useChangeImage from '@/composables/useChangeImage';

export default {
  name: 'ProductsItem',
};
</script>

<script setup>
const $store = useStore();

const props = defineProps(['product']);

const isLoadingFetchProduct = ref(false);

const firstColorOption = computed(() => props.product.colors[0].color.id);
const productsInCart = computed(() => $store.getters.basketData);
const selectedColorId = ref('');
const productStatus = computed(() => productsInCart.value.some((productInCart) => (
  (productInCart.product.id === props.product.id
  && Number(productInCart.color.color.id) === Number(selectedColorId.value))
)));
const currentColor = () => {
  if (!selectedColorId.value && firstColorOption.value) {
    selectedColorId.value = firstColorOption.value;
  }
};

const { postProductToCart, isLoading: isLoadingPostProductToCart } = useAddProductToCart();
const addProductToCart = async () => {
  isLoadingFetchProduct.value = true;
  const product = await $store.dispatch('loadProductData', { slug: props.product.slug });
  const selectedSizeId = product.sizes[0].id;
  isLoadingFetchProduct.value = false;

  postProductToCart({
    productId: props.product.id,
    colorId: selectedColorId.value,
    sizeId: selectedSizeId,
    quantity: 1,
  });
};

currentColor();
</script>
