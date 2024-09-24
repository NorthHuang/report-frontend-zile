<template>
  <div class="switch">
    <p>pls put reports list here</p>
  </div>
</template>

<script>
export default {
  name: "Switch",
  data() {
    return {
      checked: false,
    };
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
</style>
