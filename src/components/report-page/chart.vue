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
      <div style="padding: 3% 5%; box-sizing: border-box">
        <h3 style="text-align: center">recommendations</h3>
        <div>{{ recommendation }}</div>
      </div>
    </div>
    <div
      class="children_chart"
      style="width: 90%; height: 50%; margin-bottom: 100px"
    >
      <div id="score" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">risk score analysis</Alert>
      </div>
    </div>
    <div
      class="children_chart"
      style="width: 90%; height: 50%; margin-bottom: 100px"
    >
      <div id="health" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">system health analysis</Alert>
      </div>
    </div>
    <div class="children_chart" style="width: 90%; height: 50%">
      <div id="traffic" style="width: 100%; height: 100%"></div>
      <div class="title">
        <Alert type="success">network traffic analysis</Alert>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapGetters,mapActions } from "vuex";
import { markRaw } from "vue";
export default {
  name: "Chart",
  data() {
    return {
      chart1: null, //chart instance
      chart2: null,
      chart3: null,
      recommendation: "",
    };
  },
  watch: {
    response: {
      handler(newVal) {
        if (newVal && newVal.details && Array.isArray(newVal.details)) {
          console.log("this.response.details:", this.response.details);
          this.renderCharts();
          //get recommendation from vuex
        }
      },
      deep: true, // 启用深度监听
    },
  },
  computed: {
    ...mapGetters({
      response: "getResponse",
    }),
   
  },
  methods: {
    ...mapActions([
      "setMostProminent",
    ]),
    renderCharts() {
      this.recommendation =
        this.response.details[0].recommendation ||
        "No recommendation available";
      console.log("this.recommendation", this.recommendation);
      this.getMostProminentData();
      this.initChart1();
      this.initChart2();
      this.initChart3();
    },
    getMostProminentData(){
      if (!this.response.details) return ;
      const mostProminent = {
        highestCpuUsage: null,
        highestMemoryUsage: null,
        highestRiskScore: null,
        highestDiskUsage:null
      };
      const report=this.response.details
    report.forEach((item) => {  
    if (mostProminent.highestCpuUsage === null || item.cpu_usage[0] > mostProminent.highestCpuUsage) {
      mostProminent.highestCpuUsage = item.cpu_usage[0];
    }
    if (mostProminent.highestMemoryUsage === null || item.memory_usage[0] > mostProminent.highestMemoryUsage) {
      mostProminent.highestMemoryUsage = item.memory_usage[0];
    }
    if (mostProminent.highestDiskUsage === null || item.disk_usage[0] > mostProminent.highestDiskUsage) {
      mostProminent.highestDiskUsage = item.disk_usage[0];
    }
    if (mostProminent.highestRiskScore === null || item.risk_score > mostProminent.highestRiskScore) {
      mostProminent.highestRiskScore = item.risk_score;
    }
});
console.log("mostProminent",mostProminent);
    this.setMostProminent(mostProminent)
    },
    initChart1() {
      if (this.chart1) {
        this.chart1.dispose();
      }
      this.chart1 = markRaw(echarts.init(document.getElementById("health")));
      const timestamps = this.response.details.map((item) =>
        new Date(item.timestamp).toLocaleString()
      );
      const cpuUsage = this.response.details.map((item) => item.cpu_usage[0]);
      const memoryUsage = this.response.details.map(
        (item) => item.memory_usage[0]
      );
      const diskUsage = this.response.details.map((item) => item.disk_usage[0]);

      const health_option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["CPU Usage", "Memory Usage", "Disk Usage"],
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
        ],
      };
      this.chart1.setOption(health_option);
    },
    initChart2() {
      if (this.chart2) {
        this.chart2.dispose();
      }
      this.chart2 = markRaw(echarts.init(document.getElementById("traffic")));
      const timestamps = this.response.details.map((item) =>
        new Date(item.timestamp).toLocaleString()
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
          data: ["Network In", "Network Out"],
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
      const timestamps = this.response.details.map((item) =>
        new Date(item.timestamp).toLocaleString()
      );
      const risk_score = this.response.details.map((item) => item.risk_score);
      const attack_type = this.response.details.map((item) => item.attack_type);

      const risk_score_option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          // 自定义tooltip的显示格式
          formatter: function (params) {
            const index = params[0].dataIndex;
            return `${params[0].axisValue}<br/>
                Risk Score: ${params[0].data}<br/>
                Attack Type(Very likely but not guaranteed): ${attack_type[index] === '0' ? 'Safe' : attack_type[index]}`;
          },
        },
        legend: {
          data: ["Risk Score"],
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
          },
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
