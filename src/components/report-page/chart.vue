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
import { mapGetters } from "vuex";
export default {
  name: "Chart",
  mounted() {
    if(this.response && this.response && this.response.details){
      this.initChart1();
      this.initChart2();
      this.initChart3();
    }
  },
  computed: {
    ...mapGetters({
      response: "getResponse",
    }),
  },
  methods: {
    initChart1() {
      var chart1 = echarts.init(document.getElementById("health"));
      const timestamps = this.response.details.network_traffic_analysis.map(
        (item) => new Date(item.timestamp).toLocaleTimeString()
      );
      const cpuUsage = this.response.details.network_traffic_analysis.map(
        (item) => item.cpu_usage.current
      );
      const memoryUsage = this.response.details.network_traffic_analysis.map(
        (item) => item.memory_usage.current
      );
      const diskUsage = this.response.details.network_traffic_analysis.map(
        (item) => item.disk_usage.current
      );
      const networkIn = this.response.details.network_traffic_analysis.map(
        (item) => item.network_bandwidth_usage.current_in
      );
      const networkOut = this.response.details.network_traffic_analysis.map(
        (item) => item.network_bandwidth_usage.current_out
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
            (item) => item.event_type
          )
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
        })
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
                (key) => severityMap[key] === value
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

      const barData = this.response.details.system_health_analysis.map(
        (item) => ({
          timestamp: new Date(item.timestamp).getTime(),
          severity: severityMap[item.severity],
          attack_type: item.attack_type,
        })
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
                (key) => severityMap[key] === value
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
