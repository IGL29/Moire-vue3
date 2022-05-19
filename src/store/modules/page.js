/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = () => ({
  currentPage: 1,
  numberPrevProducts: 12,
  numberPages: null,
  numberProducts: null,
});

const getters = {
  numberPrevProducts(state) {
    return state.numberPrevProducts;
  },
  numberProducts(state) {
    return state.numberProducts;
  },
  numberPages(state) {
    return state.numberPages;
  },
  currentPage(state) {
    return state.currentPage;
  },
};

const mutations = {
  updateCurrentPage(state, page) {
    state.currentPage = page;
  },
  updateNumberPages(state, response) {
    state.numberPages = response;
  },
  updateNumberPrevProducts(state, numbers) {
    state.numberPrevProducts = numbers;
  },
  updateNumberProducts(state, response) {
    state.numberProducts = response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
