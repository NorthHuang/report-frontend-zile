import { createStore } from "vuex";

const defaultResponse = {
  details: [],
};

const responseModule = {
  state: () => ({
    response: {
      details: []
    },
  }),
  getters: {
    getResponse: (state) => state.response,
  },
  mutations: {
    setResponse(state, newResponse) {
      state.response.details = newResponse; // 更新 Vuex 中的 response
    },
    clearResponse(state) {
      state.response.details = defaultResponse; // 清空当前 response
    },
    getResponse(state){
      return state.response.details
    }
  },
  actions: {
    changeCurrentReport({ commit }, report) {
      commit("setResponse", report); // 将选中的报告替换为当前显示的报告
    },
    clearResponse({ commit }) {
      commit("clearResponse"); // 清空 response
    },
    getCurrentReport({commit},report){
      commit("getResponse", report)
    }
  },
};
const userModule = {
  state: () => ({
    username: null, // Initially, no user is logged in
  }),
  getters: {
    getUsername: (state) => state.username, // Getter to access the username
  },
  mutations: {
    setUsername(state, username) {
      state.username = username; // Set the username when the user logs in
    },
    clearUsername(state) {
      state.username = null; // Clear the username when the user logs out
    },
  },
  actions: {
    login({ commit ,dispatch}, username) {
      // Simulate a login action, which sets the username
      commit("setUsername", username);
      dispatch("clearReports");// Clear reports when user logs in
      dispatch("clearResponse");
      localStorage.setItem('username', username);
    },
    logout({ commit,dispatch }) {
      // Simulate a logout action, which clears the username
      commit("clearUsername");
      dispatch("clearReports"); // Clear reports when user logs out
      dispatch("clearResponse");
      localStorage.removeItem('username'); 
      localStorage.removeItem('jwt');
    },
    initializeAuthState({ commit }) {
      const username = localStorage.getItem('username');  // get username from localStorage 
      if (username) {
        commit('setUsername', username);  //  
      }
    },
  },
};

const reportsModule = {
  state: () => ({
    reports: [], // report list
    currentReport: null,
    isReportsUploaded:false,
    mostProminent:null,
  }),
  getters: {
    getReports: (state) => state.reports, // get reports
    getCurrentReport: (state) => state.currentReport,
    isReportsUploaded: (state) => state.isReportsUploaded,
    mostProminent:(state)=>state.mostProminent
  },
  mutations: {
    setReports(state, reports) {
      state.reports = reports; // save report to Vuex
      state.currentReport = null; // 如果没有报告，重置当前报告
    },
     clearReports(state) {
      state.reports = []; // clear reports when user logs out or switches user
      state.currentReport = null;
    },
    setIsReportsUploaded(state, status) {
      state.isReportsUploaded = status; 
    },
    setMostProminent(state,mostProminent){
      state.mostProminent=mostProminent
    }
  },
  actions: {
    setReports({ commit }, reports) {
      commit("setReports", reports); // submit report to mutation
    },
    clearReports({ commit }) {
      commit("clearReports"); // clear reports mutation
    },
    setIsReportsUploaded({ commit }, status) {
      commit("setIsReportsUploaded", status); // 更新上传状态
    },
    setMostProminent({ commit }, mostProminent) {
      commit("setMostProminent", mostProminent); // 
    },
  },
};
export default createStore({
  modules: {
    response: responseModule,
    user: userModule,
    reports: reportsModule,
  },
});
