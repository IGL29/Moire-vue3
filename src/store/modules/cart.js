/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import API_BASE_URL from '@/config';

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
    return axios
      .get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.rootState.accessKey,
        },
      })
      .then((response) => {
        context.commit('getProductsFromCart', response.data);
      });
  },
  addProductToCart(context, {
    productId, colorId, sizeId, quantity,
  }) {
    return axios
      .post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        colorId,
        sizeId,
        quantity,
      }, {
        params: {
          userAccessKey: context.rootState.accessKey,
        },
      })
      .then(() => {
        context.dispatch('loadBasketData');
      });
  },
  changeQuantityProduct(context, { basketItemId, quantity }) {
    return axios
      .put(`${API_BASE_URL}/api/baskets/products`, {
        basketItemId,
        quantity,
      }, {
        params: {
          userAccessKey: context.rootState.accessKey,
        },
      })
      .then(() => { context.dispatch('loadBasketData'); });
  },
  deleteProduct(context, { basketItemId }) {
    return axios
      .delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          basketItemId,
        },
        params: {
          userAccessKey: context.rootState.accessKey,
        },
      })
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
