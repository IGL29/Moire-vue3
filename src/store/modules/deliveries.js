/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import api from '@/api';

const state = () => ({
  deliveries: [],
});

const getters = {
  deliveries(state) {
    return state.deliveries;
  },
};

const mutations = {
  saveDeliveries(state, response) {
    state.deliveries = response;
  },
};

const actions = {
  loadDeliveries(context) {
    return api.loadDeliveries()
      .then((response) => {
        context.commit('saveDeliveries', response.data);
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
