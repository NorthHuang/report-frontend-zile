import { createStore } from "vuex";

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
        "Investigate the source of the DDoS attack and consider blocking the IP address 192.168.1.4.",
        "Monitor CPU usage closely and offload tasks to reduce load.",
        "Increase disk space or clean up unnecessary files to avoid disk exhaustion.",
      ],
    },
  }),
  getters: {
    getResponse: (state) => state.response,
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
    login({ commit }, username) {
      // Simulate a login action, which sets the username
      commit("setUsername", username);
    },
    logout({ commit }) {
      // Simulate a logout action, which clears the username
      commit("clearUsername");
    },
  },
};
export default createStore({
  modules: {
    counter: counterModule,
    response: responseModule,
    user: userModule,
  },
});
