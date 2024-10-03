<template>
  <div class="switch">
    <p>Reports:</p>
    <div v-for="(report, index) in getReports" :key="index" class="report-item">
      <button @click="generateChart(report)">Report {{ index + 1 }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Switch",
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
