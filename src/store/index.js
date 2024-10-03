import { createStore } from "vuex";

const defaultResponse = {
  status: "no-report",
  analysis_time: "",
  summary: {
    total_attacks_detected: 0,
    critical_warnings: 0,
    system_health_status: "normal",
  },
  details: {
    system_health_analysis: [],
    system_logs_analysis: [],
    network_traffic_analysis: [],
  },
  recommendations: ["No recommendations available."],
};

const responseModule = {
  state: () => ({
    response: {
      status: "success",
      analysis_time: "2024-08-26T12:10:00Z",
      summary: {
        total_attacks_detected: 5,
        critical_warnings: 2,
        system_health_status: "warning",
      },
      details: {
        system_health_analysis: [
          {
            attack_type: "DDoS",
            source_ip: "192.168.1.4",
            target_ip: "192.168.1.5",
            timestamp: "2024-08-26T12:00:05Z",
            severity: "high",
            description:
              "Detected Distributed Denial of Service attack targeting port 80.",
          },
          {
            attack_type: "Port Scan",
            source_ip: "192.168.1.6",
            target_ip: "192.168.1.7",
            timestamp: "2024-08-26T12:02:00Z",
            severity: "medium",
            description:
              "Multiple ports scanned from a single IP address, indicating possible reconnaissance.",
          },
        ],
        system_logs_analysis: [
          {
            event_type: "Failed Login",
            hostname: "server1",
            service: "sshd",
            timestamp: "2024-08-26T12:00:00Z",
            user: "user1",
            source_ip: "192.168.1.100",
            severity: "low",
            description:
              "Repeated failed login attempts detected, may indicate brute force attack.",
          },
          {
            event_type: "Service Error",
            hostname: "server1",
            service: "nginx",
            timestamp: "2024-08-26T12:07:00Z",
            severity: "medium",
            description:
              "Nginx service failed to start due to missing configuration file.",
          },
        ],
        network_traffic_analysis: [
          {
            timestamp: "2024-08-26T12:00:00Z",
            cpu_usage: {
              current: 85.2,
              threshold: 80.0,
              status: "warning",
              description:
                "CPU usage exceeded threshold, indicating possible system overload.",
            },
            memory_usage: {
              current: 65.3,
              threshold: 90.0,
              status: "normal",
              description: "Memory usage within normal range.",
            },
            disk_usage: {
              current: 88.7,
              threshold: 85.0,
              status: "warning",
              description:
                "Disk usage exceeded threshold, potential risk of disk space exhaustion.",
            },
            network_bandwidth_usage: {
              current_in: 750,
              current_out: 500,
              threshold: 1000,
              status: "normal",
              description: "Network bandwidth usage within acceptable limits.",
            },
          },
          {
            timestamp: "2024-08-26T12:05:00Z",
            cpu_usage: {
              current: 90.1,
              threshold: 80.0,
              status: "critical",
              description:
                "CPU usage critically high, indicating possible attack or resource overuse.",
            },
            memory_usage: {
              current: 75.5,
              threshold: 90.0,
              status: "normal",
              description: "Memory usage within normal range.",
            },
            disk_usage: {
              current: 92.1,
              threshold: 85.0,
              status: "critical",
              description:
                "Disk usage critically exceeded threshold, immediate action required.",
            },
            network_bandwidth_usage: {
              current_in: 850,
              current_out: 600,
              threshold: 1000,
              status: "warning",
              description: "Network bandwidth usage approaching limit.",
            },
          },
        ],
      },
      recommendations: [
        "Useless.",
      ],
    },
  }),
  getters: {
    getResponse: (state) => state.response,
  },
  mutations: {
    setResponse(state, newResponse) {
      state.response = newResponse; // 更新 Vuex 中的 response
    },
    clearResponse(state) {
      state.response = defaultResponse; // 清空当前 response
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
  }),
  getters: {
    getReports: (state) => state.reports, // get reports
    getCurrentReport: (state) => state.currentReport,
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
  },
};
export default createStore({
  modules: {
    counter: counterModule,
    response: responseModule,
    user: userModule,
    reports: reportsModule,
  },
});
