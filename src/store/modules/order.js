/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  orderData: null,
});

const getters = {
  orderData(state) {
    return state.orderData;
  },
  // eslint-disable-next-line no-shadow
  productsInCart(state, getters, rootState) {
    if (state.orderData?.basket?.items) {
      return state.orderData.basket.items;
    }
    return rootState.cart.basketData;
  },
  orderProducts(state) {
    return state.orderData.basket.items;
  },

  orderNumberProducts(state) {
    return state.orderData?.basket?.items.length;
  },

  totalOrderNumberProducts(state) {
    return state.orderData?.basket?.items.reduce((prev, current) => prev + current?.quantity, 0);
  },

  orderTotalPrice(state) {
    return Number(state.orderData.totalPrice) + Number(state.orderData.deliveryType.price);
  },

  orderDeliveryPrice(state) {
    return state.orderData.deliveryType.price;
  },
};

const mutations = {
  saveOrderData(state, response) {
    state.orderData = response;
  },
};

const actions = {
  postOrder(context, {
    name, address, phone, email, deliveryTypeId, paymentTypeId, comment,
  }) {
    return axios
      .post(`${API_BASE_URL}/api/orders`, {
        name,
        address,
        phone,
        email,
        deliveryTypeId,
        paymentTypeId,
        comment,
      },
      {
        params: {
          userAccessKey: context.rootState.accessKey,
        },
      })
      .then((response) => {
        context.commit('saveOrderData', response.data);
        return response;
      });
  },

  loadOrderInfo(context, id) {
    axios
      .get(`${API_BASE_URL}/api/orders/${id}`, {
        params: {
          userAccessKey: context.rootState.accessKey,
        },
      })
      .then((response) => { context.commit('saveOrderData', response.data); });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
