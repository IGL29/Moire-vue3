/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  materialsData: [],
  seasonsData: [],
  categoriesData: [],
  colorsData: [],
  filters: {
    inputPriceFrom: null,
    inputPriceTo: null,
    inputSelectCategory: null,
    inputColors: [],
    inputMaterials: [],
    inputSeasons: [],
  },
});

const getters = {
  filters(state) {
    return state.filters;
  },
  materials(state) {
    return state.materialsData;
  },
  seasons(state) {
    return state.seasonsData;
  },
  categories(state) {
    return state.categoriesData;
  },
  colors(state) {
    return state.colorsData;
  },
};

const mutations = {
  filterProducts(state, filters) {
    state.filters = filters;
  },
  resetFilter(state) {
    state.filters.inputPriceFrom = null;
    state.filters.inputPriceTo = null;
    state.filters.inputSelectCategory = null;
    state.filters.inputColors = [];
    state.filters.inputMaterials = [];
    state.filters.inputSeasons = [];
  },
  addMaterialsData(state, response) {
    state.materialsData = response;
  },
  addSeasonsData(state, response) {
    state.seasonsData = response;
  },
  addCategoriesData(state, response) {
    state.categoriesData = response;
  },
  addColors(state, response) {
    state.colorsData = response;
  },
};

const actions = {
  loadMaterialsData(context) {
    axios
      .get(`${API_BASE_URL}/api/materials`)
      .then((response) => {
        context.commit('addMaterialsData', response.data.items);
      });
  },

  loadSeasonsData(context) {
    axios
      .get(`${API_BASE_URL}/api/seasons`)
      .then((response) => {
        context.commit('addSeasonsData', response.data.items);
      });
  },

  loadCategoriesData(context) {
    axios
      .get(`${API_BASE_URL}/api/productCategories`)
      .then((response) => {
        context.commit('addCategoriesData', response.data.items);
      });
  },

  loadColorsData(context) {
    axios
      .get(`${API_BASE_URL}/api/colors`)
      .then((response) => {
        context.commit('addColors', response.data.items);
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
