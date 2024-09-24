<template>
  <div class="main-page">
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

export default {
  name: "Main",
  components: {
    Header,
    Switch,
    Chart,
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
