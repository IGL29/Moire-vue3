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
              <CounterInput v-model:number="quantityProducts" />

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
          :showMessage="successfulRequestNotify"
          text="Товар добавлен в корзину"
        />
      </router-link>

      <NotifyMessage
        :showMessage="errorRequestNotify"
        text="Произошла ошибка при добавлении товара"
      />
    </section>
  </main>
</template>

<script>
import {
  ref, computed, watch, onCreated,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore, mapGetters } from 'vuex';
import AboutProductTabs from '@/components/AboutProductTabs.vue';
import useChangeImage from '@/utils/changeImage';
import NotifyMessage from '@/components/NotifyMessage.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CounterInput from '@/components/CounterInput.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';

export default {
  name: 'ProductPage',
};
</script>

<script setup>
// data
const selectedColorId = ref('');
const selectedSizeId = ref('');
const quantityProducts = ref(1);
const loadingProduct = ref(false);
const errorResponse = ref(false);

const $route = useRoute();
const $store = useStore();

// methods
const doLoadProduct = () => {
  loadingProduct.value = true;
  errorResponse.value = false;
  const { slug } = $route.params;
  this.$store
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

const doAddProductToCart = () => {
  this.$store.dispatch('addProductToCart', {
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

const doSetDefaultColor = () => {
  const defaultColor = product.value.colors[0].color.id;
  if (defaultColor) {
    selectedColorId.value = defaultColor;
  }
};

const doSetDefaultSize = () => {
  const defaultSize = product.value.sizes[0].id;
  if (defaultSize) {
    selectedSizeId.value = defaultSize;
  }
};

// export default {
// name: 'ProductPage',

// mixins: [changeImageMixin],

// MIXIN or Reused function

// data() {
//   return {
//     selectedColorId: '',
//     selectedSizeId: '',
//     quantityProducts: 1,
//     loadingProduct: false,
//     errorResponse: false,
//   };
// },

// ??????????????????????????
const { successfulRequestNotify, errorRequestNotify } = mapGetters();

const product = computed(() => $store.state.productData);

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

// computed: {
// ...mapGetters([
//   'successfulRequestNotify',
//   'errorRequestNotify',
// ]),

// product() {
//   return this.$store.state.productData;
// },

// category() {
//   if (this.product?.category?.title) {
//     return this.product.category.title;
//   }
//   return 'Категория';
// },

// title() {
//   if (this.product?.title) {
//     return this.product.title;
//   }
//   return 'Название товара';
// },
// },

// methods: {
// doLoadProduct() {
//   this.loadingProduct = true;
//   this.errorResponse = false;
//   const { slug } = this.$route.params;
//   this.$store
//     .dispatch('loadProductData', { slug })
//     .then(() => {
//       this.loadingProduct = false;
//       this.errorResponse = false;
//     })
//     .catch(() => {
//       this.loadingProduct = false;
//       this.errorResponse = true;
//     });
// },

// doAddProductToCart() {
//   this.$store.dispatch('doAddProductToCart', {
//     productId: this.product.id,
//     colorId: this.selectedColorId,
//     sizeId: this.selectedSizeId,
//     quantity: this.quantityProducts,
//   })
//     .then(() => {
//       this.$store.commit('showNotifySuccess');
//     })
//     .catch(() => {
//       this.$store.commit('showNotifyError');
//     });
// },

// doSetDefaultColor() {
//   const defaultColor = this.product.colors[0].color.id;
//   if (defaultColor) {
//     this.selectedColorId = defaultColor;
//   }
// },

// doSetDefaultSize() {
//   const defaultSize = this.product.sizes[0].id;
//   if (defaultSize) {
//     this.selectedSizeId = defaultSize;
//   }
// },
// },

// components: {
//   BreadCrumbs,
//   CounterInput,
//   LoaderElement,
//   ErrorNotify,
//   NotifyMessage,
//   AboutProductTabs,
// },

watch((product) => {
  doSetDefaultColor();
  doSetDefaultSize();
});

// watch: {
//   product() {

//   },
// },

onCreated(() => {
  $store.commit('clearTimerNotify');
  doLoadProduct();
});

// created() {

// },
// };
</script>
