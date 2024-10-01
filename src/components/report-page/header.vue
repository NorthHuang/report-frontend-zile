<template>
  <div class="header">
    <div class="user-info">
      <span @click="toggleDropdown">{{ username }} ▼</span>
      <div v-if="showDropdown" class="dropdown-menu">
        <button @click="handleLogout">Logout</button>
      </div>
    </div>
    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button size="large" icon="ios-cloud-upload-outline"
        >Upload And Analyse</Button
      >
    </Upload>
    <Button
      size="large"
      icon="ios-download-outline"
      type="primary"
      @click="downloadJson"
      >Download Example</Button
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapGetters({
      username: "getUsername", // get username from Vuex
    }),
  },
  methods: {
    ...mapActions(["logout"]),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown; 
    },
    handleLogout() {
      this.logout(); 
      this.$router.push("/"); 
    },
    downloadJson() {
      const filePath = "/example.json";

      const link = document.createElement("a");
      link.href = filePath;

      link.download = "data.json";

      link.click();
    },
  },
};
</script>

<style scoped>
.header {
  height: 12%;
  width: 100%;
  border: 1px solid #8ce6b0;
  background-color: #edfff3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 2em;
}
.user-info {
  position: absolute; 
  top: 10px; 
  left: 10px;
  cursor: pointer;
}
</style>
