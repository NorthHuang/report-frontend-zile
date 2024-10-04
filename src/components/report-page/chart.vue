<template>
  <div id="chart">
    <!-- <div
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
    </div> -->
    <div
      class="children_chart"
      style="width: 90%; height: 50%; margin-bottom: 100px"
    >
      <div id="health" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">system health analysis</Alert>
      </div>
    </div>
    <div
      class="children_chart"
      style="width: 90%; height: 50%; margin-bottom: 100px"
    >
      <div id="traffic" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">network traffic analysis</Alert>
      </div>
    </div>
    <div class="children_chart" style="width: 90%; height: 50%">
      <div id="score" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">risk score analysis</Alert>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapGetters } from "vuex";
import { markRaw } from 'vue'
export default {
  name: "Chart",
  data(){
    return {
      chart1: null,  //chart instance
      chart2: null,
      chart3: null,
    };
  },
  mounted() {},
  watch: {
  response: {
    handler(newVal) {
      if (newVal && newVal.details && Array.isArray(newVal.details)) {
        this.renderCharts();
      }
    },
    deep: true,  // 启用深度监听
  },
},
  computed: {
    ...mapGetters({
      response: "getResponse",
    }),
  },
  methods: {
    renderCharts() {
      this.initChart1();
      this.initChart2();
      this.initChart3();
    },
    initChart1() {
      if (this.chart1) {
        this.chart1.dispose();
      }
      this.chart1 = markRaw(echarts.init(document.getElementById("health")));
      const timestamps = this.response.details.map(
        (item) => new Date(item.timestamp).toLocaleTimeString()
      );
      const cpuUsage = this.response.details.map(
        (item) => item.cpu_usage[0]
      );
      const memoryUsage = this.response.details.map(
        (item) => item.memory_usage[0]
      );
      const diskUsage = this.response.details.map(
        (item) => item.disk_usage[0]
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
          }
        ],
      };
      this.chart1.setOption(health_option);
    },
    initChart2() {
      if (this.chart2) {
        this.chart2.dispose();
      }
      this.chart2 = markRaw(echarts.init(document.getElementById("traffic")));
      const timestamps = this.response.details.map(
        (item) => new Date(item.timestamp).toLocaleTimeString()
      );
      const networkIn = this.response.details.map(
        (item) => item.network_traffic_in[0]
      );
      const networkOut = this.response.details.map(
        (item) => item.network_traffic_out[0]
      );

      const traffic_option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
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
      this.chart2.setOption(traffic_option);
    },
    initChart3() {
      if (this.chart3) {
        this.chart3.dispose();
      }
      this.chart3 = markRaw(echarts.init(document.getElementById("score")));
      const timestamps = this.response.details.map(
        (item) => new Date(item.timestamp).toLocaleTimeString()
      );
      const risk_score = this.response.details.map(
        (item) => item.risk_score
      );

      const risk_score_option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "Risk Score"
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
            name: "Risk Score",
            type: "line",
            data: risk_score,
          }
        ],
      };
      this.chart3.setOption(risk_score_option);
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
