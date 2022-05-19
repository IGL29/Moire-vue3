/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import API_BASE_URL from '@/config';

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
    axios
      .get(`${API_BASE_URL}/api/deliveries`)
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
