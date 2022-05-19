/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import api from '@/api';

const state = () => ({
  productsData: [],
  productData: null,
});

const getters = {
  products(state) {
    return state.productsData;
  },

  product(state) {
    return state.productData;
  },
};

const mutations = {
  addPoductsData(state, response) {
    state.productsData = response;
  },
  addProduct(state, response) {
    state.productData = response;
  },
};

const actions = {
  loadProductsData(context) {
    return api.loadProductsData({
      page: context.rootState.page.currentPage,
      limit: context.rootState.page.numberPrevProducts,
      categoryId: context.rootState.filters.filters.inputSelectCategory,
      materialIds: context.rootState.filters.filters.inputMaterials,
      seasonIds: context.rootState.filters.filters.inputSeasons,
      colorIds: context.rootState.filters.filters.inputColors,
      minPrice: context.rootState.filters.filters.inputPriceFrom,
      maxPrice: context.rootState.filters.filters.inputPriceTo,
    })
      .then((response) => {
        context.commit('page/updateNumberPages', response.data.pagination.pages, { root: true });
        context.commit('page/updateNumberProducts', response.data.pagination.total, { root: true });
        context.commit('products/addPoductsData', response.data.items, { root: true });
      });
  },
  loadProductData(context, { slug }) {
    return api.loadProductData({ slug })
      .then((response) => {
        context.commit('addProduct', response.data);
        return response.data;
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
