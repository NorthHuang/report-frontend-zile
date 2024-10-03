<template>
  <div class="switch">
    <p>Reports:</p>
    <div v-for="(report, index) in reports" :key="index" class="report-item">
      <button @click="generateChart(report)">Report {{ index + 1 }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Switch",
  computed:{
    ...mapGetters({getReports:"getReports"}), //get reports from Vuex
    reports() {
      return this.getReports; 
    },
  },
  async created() {
    if(this.getReports.length===0){
      await this.fetchUserReports();//if there is no report in Vuex
    }else{
      this.reports=this.getReports;//
    }
  },
  methods:{
    ...mapActions(["setReports","changeCurrentReport"]),
    async fetchUserReports() {
      try {
        const token = localStorage.getItem("jwt"); 
        const response = await axios.get("http://localhost:5000/user-reports", {
          headers: {
            "x-access-token": token,
          },
        });
        if (response.data.status === "success") {
            console.log(response.data.reports); // 打印报告列表
            response.data.reports.forEach((report, index) => {
            console.log(`Report ${index + 1}:`, report); // 打印每个报告的详细信息
        });
            if(response.data.reports&&response.data.reports.length>0){
              this.reports = response.data.reports;
              this.setReports(response.data.reports)
            }
        } else {
          console.error("Failed to fetch reports:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },
    generateChart(report) {
      this.changeCurrentReport(report); 
    },
  },
};
</script>

<style scoped>
.switch {
  position: fixed;
  right: 20px;
  top: 10px;
  bottom: 10px;
  width: 15%;
  border: 1px solid #ffd77a;
  background-color: #fff9e6;
  z-index: 1000;
  border-radius: 2em;
}

.report-item {
  margin: 10px 0;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
