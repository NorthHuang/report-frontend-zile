import { createStore } from "vuex";

const counterModule = {
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment({ commit }) {
      commit("increment");
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
};

export default createStore({
  modules: {
    counter: counterModule,
  },
});
