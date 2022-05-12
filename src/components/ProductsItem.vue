<template>
  <li class="catalog__item">
    <button
      class="catalog__btn-add"
      :class="{ 'added-to-cart': productStatus }"
      title="Добавить в корзину"
      @click.prevent="addProductToCart"
    >
      <svg width="24" height="24" v-if="loading">
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
      <img :src="currentImage()" :alt="product.title" />
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
import changeImageMixin from '@/mixins/changeImageMixin.vue';
import ProductColors from '@/components/ProductColors.vue';

export default {
  name: 'ProductsItem',

  props: ['product'],

  mixins: [changeImageMixin],
  components: { ProductColors },

  data() {
    return {
      selectedColorId: '',
      loading: false,
    };
  },

  computed: {
    firstColorOption() {
      return this.product.colors[0].color.id;
    },

    productsInCart() {
      return this.$store.getters.basketData;
    },

    productStatus() {
      return this.productsInCart.some((productInCart) => (
        (productInCart.product.id === this.product.id
        && Number(productInCart.color.color.id) === Number(this.selectedColorId))
      ));
    },
  },

  methods: {
    currentColor() {
      if (!this.selectedColorId && this.firstColorOption) {
        this.selectedColorId = this.firstColorOption;
      }
    },

    async addProductToCart() {
      this.loading = true;
      const product = await this.$store.dispatch('loadProductData', { slug: this.product.slug });
      const selectedSizeId = product.sizes[0].id;
      this.$store.dispatch('addProductToCart', {
        productId: this.product.id,
        colorId: this.selectedColorId,
        sizeId: selectedSizeId,
        quantity: 1,
      })
        .then(() => {
          this.loading = false;
          this.$store.commit('showNotifySuccess');
        })
        .catch(() => {
          this.$store.commit('showNotifyError');
        });
    },
  },

  created() {
    this.currentColor();
  },
};
</script>
