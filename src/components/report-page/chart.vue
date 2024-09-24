<template>
  <div id="chart">
    <div
      id="recommendation"
      class="children_chart"
      style="
        width: 80%;
        background: linear-gradient(#c5c8ce, #dcdee2);
        border-radius: 2em;
      "
    >
      <div style="padding: 3% 5%">
        <h3 style="text-align: center">recommendations</h3>
        <div>{{ response.recommendations.join() }}</div>
      </div>
    </div>
    <div
      class="children_chart"
      style="width: 90%; height: 50%; margin-bottom: 100px"
    >
      <div id="health" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">{{ Object.keys(response.details)[0] }}</Alert>
      </div>
    </div>
    <div
      class="children_chart"
      style="width: 90%; height: 50%; margin-bottom: 100px"
    >
      <div id="log" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">{{ Object.keys(response.details)[1] }}</Alert>
      </div>
    </div>
    <div class="children_chart" style="width: 90%; height: 50%">
      <div id="traffic" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">{{ Object.keys(response.details)[2] }}</Alert>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Chart",
  mounted() {
    this.initChart1();
    this.initChart2();
    this.initChart3();
  },
  data() {
    return {
      // TODO now it is just a mock data, change to get data from api later
      response: {
        status: "success",
        analysis_time: "2024-08-26T12:10:00Z",
        summary: {
          total_attacks_detected: 5,
          critical_warnings: 2,
          system_health_status: "warning",
        },
        details: {
          network_traffic_analysis: [
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
          system_health_analysis: [
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
                description:
                  "Network bandwidth usage within acceptable limits.",
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
    };
  },
  methods: {
    initChart1() {
      var chart1 = echarts.init(document.getElementById("health"));
      const timestamps = this.response.details.system_health_analysis.map(
        (item) => new Date(item.timestamp).toLocaleTimeString(),
      );
      const cpuUsage = this.response.details.system_health_analysis.map(
        (item) => item.cpu_usage.current,
      );
      const memoryUsage = this.response.details.system_health_analysis.map(
        (item) => item.memory_usage.current,
      );
      const diskUsage = this.response.details.system_health_analysis.map(
        (item) => item.disk_usage.current,
      );
      const networkIn = this.response.details.system_health_analysis.map(
        (item) => item.network_bandwidth_usage.current_in,
      );
      const networkOut = this.response.details.system_health_analysis.map(
        (item) => item.network_bandwidth_usage.current_out,
      );

      const health_option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "CPU Usage",
            "Memory Usage",
            "Disk Usage",
            "Network In",
            "Network Out",
          ],
        },
        xAxis: {
          type: "category",
          data: timestamps,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "CPU Usage",
            type: "line",
            data: cpuUsage,
          },
          {
            name: "Memory Usage",
            type: "line",
            data: memoryUsage,
          },
          {
            name: "Disk Usage",
            type: "line",
            data: diskUsage,
          },
          {
            name: "Network In",
            type: "line",
            data: networkIn,
          },
          {
            name: "Network Out",
            type: "line",
            data: networkOut,
          },
        ],
      };
      chart1.setOption(health_option);
    },
    initChart2() {
      var chart2 = echarts.init(document.getElementById("log"));
      const eventTypes = [
        ...new Set(
          this.response.details.system_logs_analysis.map(
            (item) => item.event_type,
          ),
        ),
      ];
      const severityMap = { low: 1, medium: 2, high: 3 };
      const scatterData = this.response.details.system_logs_analysis.map(
        (item) => ({
          value: [
            new Date(item.timestamp).getTime(),
            severityMap[item.severity],
          ],
          eventType: item.event_type,
          description: item.description,
          service: item.service,
        }),
      );

      const option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return `
              Event: ${params.data.eventType}<br/>
              Service: ${params.data.service}<br/>
              Severity: ${Object.keys(severityMap).find((key) => severityMap[key] === params.value[1])}<br/>
              Time: ${new Date(params.value[0]).toLocaleString()}<br/>
              Description: ${params.data.description}
            `;
          },
        },
        legend: {
          data: eventTypes,
        },
        xAxis: {
          type: "time",
          name: "Timestamp",
          axisLabel: {
            formatter: function (value) {
              return new Date(value).toLocaleTimeString();
            },
          },
        },
        yAxis: {
          type: "value",
          name: "Severity",
          min: 0,
          max: 3,
          interval: 1,
          axisLabel: {
            formatter: function (value) {
              return Object.keys(severityMap).find(
                (key) => severityMap[key] === value,
              );
            },
          },
        },
        series: [
          {
            name: "System Logs",
            type: "scatter",
            data: scatterData,
            symbolSize: 10,
            encode: {
              x: "value[0]",
              y: "value[1]",
            },
          },
        ],
      };
      chart2.setOption(option);
    },
    initChart3() {
      var chart3 = echarts.init(document.getElementById("traffic"));
      const severityMap = { low: 1, medium: 2, high: 3 };

      const barData = this.response.details.network_traffic_analysis.map(
        (item) => ({
          timestamp: new Date(item.timestamp).getTime(),
          severity: severityMap[item.severity],
          attack_type: item.attack_type,
        }),
      );

      let _this = this;

      const option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            const dataIndex = params[0].dataIndex;
            const attack =
              _this.response.details.network_traffic_analysis[dataIndex];
            return `
              Attack Type: ${attack.attack_type}<br/>
              Severity: ${attack.severity}<br/>
              Time: ${new Date(attack.timestamp).toLocaleString()}<br/>
              Description: ${attack.description}
            `;
          },
        },
        xAxis: {
          type: "time",
          name: "Timestamp",
          axisLabel: {
            formatter: function (value) {
              return new Date(value).toLocaleTimeString();
            },
          },
        },
        yAxis: {
          type: "value",
          name: "Severity",
          min: 0,
          max: 3,
          interval: 1,
          axisLabel: {
            formatter: function (value) {
              return Object.keys(severityMap).find(
                (key) => severityMap[key] === value,
              );
            },
          },
        },
        series: [
          {
            name: "Severity",
            type: "bar",
            data: barData.map((item) => [item.timestamp, item.severity]),
            encode: {
              x: "timestamp",
              y: "severity",
            },
          },
        ],
      };
      chart3.setOption(option);
    },
  },
};
</script>

<style scoped>
#chart {
  width: 100%;
  border-radius: 2em;
  border: 1px solid #abdcff;
  background-color: #f0faff;
  height: 82%;
  overflow-y: auto;
}
.children_chart {
  margin: 50px auto;
}
.title {
  text-align: center;
  /* margin-bottom: 20px; */
}
</style>
