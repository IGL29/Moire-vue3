/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import api from '@/api';

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
    return api.loadPayments({ deliveryTypeId })
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
