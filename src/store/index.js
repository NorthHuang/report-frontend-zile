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
  },
  actions: {
    changeCurrentReport({ commit }, report) {
      commit("setResponse", report); // 将选中的报告替换为当前显示的报告
    },
    clearResponse({ commit }) {
      commit("clearResponse"); // 清空 response
    },
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
    },
    logout({ commit,dispatch }) {
      // Simulate a logout action, which clears the username
      commit("clearUsername");
      dispatch("clearReports"); // Clear reports when user logs out
      dispatch("clearResponse");
    },
  },
};

const reportsModule = {
  state: () => ({
    reports: [], // report list
    currentReport: null,
    isReportsUploaded:false,
  }),
  getters: {
    getReports: (state) => state.reports, // get reports
    getCurrentReport: (state) => state.currentReport,
    isReportsUploaded: (state) => state.isReportsUploaded,
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
    setCurrentReport(state, report) {
      state.currentReport = report; //change to current report
    },
    setIsReportsUploaded(state, status) {
      state.isReportsUploaded = status; 
    },
  },
  actions: {
    setReports({ commit ,dispatch}, reports) {
      commit("setReports", reports); // submit report to mutation
      if (reports.length > 0) {
        dispatch("changeCurrentReport", reports[0]); // 自动设置第一个报告为当前报告
      }
    },
    clearReports({ commit }) {
      commit("clearReports"); // clear reports mutation
    },
    setIsReportsUploaded({ commit }, status) {
      commit("setIsReportsUploaded", status); // 更新上传状态
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
