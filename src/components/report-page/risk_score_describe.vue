<template>
  <div class="main">
    <!-- <h2 class="header">Additional description of risk score</h2>
    <h3 class="txt">We use <span style="color: red">hybrid machine learning model</span> to analyzes the parameters uploaded by the user to derive the risk score</h3>
    <h3 class="txt">The <span style="color: red">higher</span> the score, the <span style="color: red">higher</span> the risk</h3>
    <h3 class="txt">Each piece of data has a corresponding threat level, which may be <span style="color: red;">Security, DDOS attack, Phishing</span>, etc.</h3> -->
    <h3 class="header">Most Prominent Data:</h3>
    <p class="txt">Highest CPU Usage: <br>{{ mostProminent?.highestCpuUsage }}</p>
    <p class="txt">Highest Memory Usage: <br>{{ mostProminent?.highestMemoryUsage }}</p>
    <p class="txt">Highest Disk Usage: <br>{{ mostProminent?.highestDiskUsage }}</p>
    <p class="txt">Highest Risk Score: <br>{{ mostProminent?.highestRiskScore }}</p>
    <!-- <Table :columns="columns" :data="tableData"></Table> -->
    <h3 class="txt">
      Click the button below to view detailed correspondence
    </h3>
    <Poptip placement="right">
        <Button>Click</Button>
        <template #content>
            <div class="api">
              <img src="../../assets/relation.png" alt="">
            </div>
        </template>
    </Poptip>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RiskScoreDescribe",
  computed: {
    ...mapGetters(["mostProminent"]),
  },
};
</script>
<style scoped>
.main {
  position: fixed;
  left: 1%;
  top: 5%;
  bottom: 5%;
  width: 15%;
  border: 1px solid #ffd77a;
  background-color: #fff9e6;
  z-index: 1000;
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.header{
  text-align: center;
  color: brown;
}
.txt{
  text-align: center;
  color: rgb(73, 43, 226);
  font-size: 17px;
}
</style>
