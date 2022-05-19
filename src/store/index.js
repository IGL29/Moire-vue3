// external
import { createStore } from 'vuex';
import axios from 'axios';
// local
import API_BASE_URL from '@/config';
import cart from './modules/cart';
import order from './modules/order';
import products from './modules/products';
import page from './modules/page';
import notify from './modules/notify';
import deliveries from './modules/deliveries';
import filters from './modules/filters';
import payments from './modules/payments';

export default createStore({
  modules: {
    cart,
    order,
    products,
    page,
    notify,
    deliveries,
    filters,
    payments,
  },
  state: {
    accessKey: null,
  },

  mutations: {
    saveAccessKey(state, response) {
      if (response) {
        localStorage.setItem('user', response.accessKey);
      }
      state.accessKey = localStorage.getItem('user');
    },
  },

  actions: {
    createUser(context) {
      axios
        .get(`${API_BASE_URL}/api/users/accessKey`)
        .then((response) => {
          context.commit('saveAccessKey', response.data);
        });
    },
  },
});
