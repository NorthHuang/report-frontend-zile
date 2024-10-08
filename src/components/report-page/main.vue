<template>
  <div class="main-page">
    <RiskScoreDescribe />
    <div class="center-part">
      <Header />
      <Chart />
    </div>
    <Switch />
  </div>
</template>

<script>
import Header from "./header.vue";
import Switch from "./switch.vue";
import Chart from "./chart.vue";
import RiskScoreDescribe from "./risk_score_describe.vue";

export default {
  name: "Main",
  components: {
    Header,
    Switch,
    Chart,
    RiskScoreDescribe
  },
};
</script>

<style scoped>
.center-part {
  margin: 0 auto;
  display: flex;
  width: 60%;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
}
</style>
