/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  payments: [],
});

const getters = {
  payments(state) {
    return state.payments;
  },
};

const mutations = {
  savePayments(state, response) {
    state.payments = response;
  },
};

const actions = {
  loadPayments(context, deliveryTypeId) {
    axios
      .get(`${API_BASE_URL}/api/payments`, {
        params: {
          deliveryTypeId,
        },
      })
      .then((response) => context.commit('savePayments', response.data));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
