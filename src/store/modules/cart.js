/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import api from '@/api';

const state = () => ({
  basketData: [],
});

const getters = {
  basketData(state) {
    return state.basketData;
  },
  numberProductsInCart(state) {
    return state.basketData.length;
  },
  totalPriceCart(state) {
    return state.basketData.reduce((sum, current) => (sum + current.price * current.quantity), 0);
  },
};

const mutations = {
  resetCart(state) {
    state.basketData = [];
  },
  getProductsFromCart(state, response) {
    state.basketData = response.items;
  },
};

const actions = {
  loadBasketData(context) {
    return api.loadBasketData({ userAccessKey: context.rootState.accessKey })
      .then((response) => {
        context.commit('getProductsFromCart', response.data);
      });
  },
  addProductToCart(context, {
    productId, colorId, sizeId, quantity,
  }) {
    return api.addProductToCart({
      userAccessKey: context.rootState.accessKey,
      productId,
      colorId,
      sizeId,
      quantity,
    })
      .then(() => {
        context.dispatch('loadBasketData');
      });
  },
  changeQuantityProduct(context, { basketItemId, quantity }) {
    return api.changeQuantityProduct({
      userAccessKey: context.rootState.accessKey, basketItemId, quantity,
    })
      .then(() => { context.dispatch('loadBasketData'); });
  },
  deleteProduct(context, { basketItemId }) {
    return api.deleteProduct({ userAccessKey: context.rootState.accessKey, basketItemId })
      .then(() => { context.dispatch('loadBasketData'); });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
