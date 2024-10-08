<!-- <template>
  <div class="switch">
    <div>Reports:</div>
    <div v-for="(report, index) in getReports" :key="index" class="report-item">
      <button 
      :class="{ 'active': selectedReport === report }"
      @click="generateChart(report)">Report {{ index + 1 }}</button>
    </div>
  </div>
</template> -->
<template>
  <div class="switch">
    <div class="reports-title">Reports:</div>
    <div class="reports-container">
      <div v-for="(report, index) in getReports" :key="index" class="report-item">
        <button 
          :class="{ 'active': selectedReport === report }"
          @click="generateChart(report)">Report {{ index + 1 }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Switch",
  data() {
    return {
      selectedReport: null, // 
    };
  },
  computed:{
    ...mapGetters({getReports:"getReports",
    isReportsUploaded: "isReportsUploaded",
    }), //get reports from Vuex
  },
  watch:{
    isReportsUploaded(newVal) {
      if (newVal) {
        this.fetchUserReports(); // Fetch new reports when upload completes
        this.setIsReportsUploaded(false); // Reset the flag
      }
    },
  },
  async created() {
    await this.fetchUserReports();//if there is no report in Vuex
  },
  methods:{
    ...mapActions(["setReports","changeCurrentReport","setIsReportsUploaded"]),
    async fetchUserReports() {
      try {
        const token = localStorage.getItem("jwt"); 
        const response = await this.$axios.get("/user-reports", {
          headers: {
            "x-access-token": token,
          },
        });
        if (response.data.status === "success") {
            if(response.data.reports && response.data.reports.length > 0){
              console.log("reports:",response);
              this.setReports(response.data.reports)
              const latestReport = response.data.reports[response.data.reports.length-1]; 
              this.selectedReport = latestReport;//the newest report button should be selected
              this.changeCurrentReport(latestReport)//load the newest report
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
      this.selectedReport = report;
    },
  },
};
</script>

<style scoped>
.switch {
  position: fixed;
  right: 1%;
  top: 1.5%;
  bottom: 1.5%;
  width: 15%;
  border: 1px solid #ffd77a;
  background-color: #fff9e6;
  z-index: 1000;
  border-radius: 2em;
}

.reports-title {
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}

.reports-container {
  width: 100%;
  height: 90%;
  overflow-y: auto; /* Scrollable when there are too many reports */
}
.report-item {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

button {
  width: 70%;
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
button.active {
  background-color: #ff9800;
  color: white;
}

button.active:hover {
  background-color: #e68900;
}
</style>
