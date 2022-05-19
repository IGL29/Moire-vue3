/*  eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = () => ({
  successfulRequestNotify: false,
  errorRequestNotify: false,
  timerNotify: null,
});

const getters = {
  successfulRequestNotify(state) {
    return state.successfulRequestNotify;
  },
  errorRequestNotify(state) {
    return state.errorRequestNotify;
  },
};

const mutations = {
  showNotifySuccess(state) {
    clearTimeout(state.timerNotify);
    state.successfulRequestNotify = true;
    state.timerNotify = setTimeout(() => { state.successfulRequestNotify = false; }, 2000);
  },
  showNotifyError(state) {
    clearTimeout(state.errorRequestNotify);
    state.errorRequestNotify = true;
    state.timerNotify = setTimeout(() => { state.errorRequestNotify = false; }, 2000);
  },

  clearTimerNotify(state) {
    if (state.successfulRequestNotify || state.errorRequestNotify) {
      clearTimeout(state.timerNotify);
      state.successfulRequestNotify = false;
      state.errorRequestNotify = false;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
