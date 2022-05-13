<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ numberProducts }}
          {{ declinationMixin(numberProducts, ['товар', 'товара', 'товаров']) }}
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
            <NotifyMessage
              :showMessage="successfulRequestNotify"
              text="Товар добавлен в корзину"
              />
          </router-link>
        </Teleport>

        <Teleport v-if="isMounted" to=".notify-teleport-target">
          <NotifyMessage
            :showMessage="errorRequestNotify"
            text="Произошла ошибка при добавлении товара"
          />
        </Teleport>
      </section>
    </div>

    <div class="notify-teleport-target" />
  </main>
</template>

<script>
import { defineAsyncComponent, defineComponent, h } from 'vue';
import { mapGetters } from 'vuex';
import declinationMixin from '@/utils/declinationMixin.vue';
// import NotifyMessage from '@/components/NotifyMessage.vue';
import InputNumberItems from '@/components/InputNumberItems.vue';
import FilterForm from '@/components/FilterForm.vue';
import ProductsPagination from '@/components/ProductsPagination.vue';
import ProductsList from '@/components/ProductsList.vue';

export default defineComponent({
  name: 'MainPage',

  mixins: [declinationMixin],

  data() {
    return {
      isMounted: false,
      errorRequest: false,
      loadingProducts: false,
    };
  },

  computed: {
    ...mapGetters([
      'products',
      'numberProducts',
      'successfulRequestNotify',
      'errorRequestNotify',
    ]),
  },

  methods: {
    getProducts() {
      this.loadingProducts = true;
      this.errorRequest = false;
      this.$store.dispatch('loadProductsData')
        .then(() => {
          this.loadingProducts = false;
        }).catch(() => {
          this.loadingProducts = false;
          this.errorRequest = true;
        });
    },
  },

  components: {
    InputNumberItems,
    FilterForm,
    ProductsPagination,
    ProductsList,
    NotifyMessage: defineAsyncComponent({
      loader: () => import('@/components/NotifyMessage.vue'),
      delay: 0, // loader display time (between begin loading and loadingComponent)
      loadingComponent: () => h('div', 'Загрузка'), // asyncComponent loading dasplay сomponent
    }),
  },

  created() {
    this.$store.commit('clearTimerNotify');
    this.getProducts();
  },
  mounted() {
    this.$nextTick(() => {
      this.isMounted = true;
    });
  },
});
</script>
