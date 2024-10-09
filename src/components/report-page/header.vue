<template>
  <div class="header">
    <div class="user-info">
      <!-- <span @click="toggleDropdown">{{ username }} ▼</span>
      <div v-if="showDropdown" class="dropdown-menu">
        <button @click="handleLogout">Logout</button>
      </div> -->
      <div class="dropdown-container" @click="toggleDropdown">
        <span>{{ username }}</span>
        <i class="arrow-down"></i>
        <div v-if="showDropdown" class="dropdown-menu">
          <button @click="handleLogout" class="logout-button">Logout</button>
        </div>
      </div>
    </div>
    <!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button size="large" icon="ios-cloud-upload-outline" @click="uploadFile"
        >Upload And Analyse</Button
      >
    </Upload> -->
    <Upload :before-upload="handleFileUpload" :show-upload-list="false">
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
      selectedFile: null, //store the uploaded file
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
    handleFileUpload(file) {
      this.selectedFile = file; // Capture the uploaded file
      this.uploadFile();
      return false; // Prevent automatic upload, will handle manually
    },
    ...mapActions(["setIsReportsUploaded"]),
    async uploadFile() {
      if (!this.selectedFile) {
        alert("Please select a file first!");
        return;
      }
      try {
        //create a form data object
        let formData = new FormData();
        formData.append("file", this.selectedFile);
        //add jwt token
        const token = localStorage.getItem("jwt");
        //send it to back end
        const response = await this.$axios.post("/analysis", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token, // Send JWT token
          },
        });
        if (response.data.status === "ok") {
          alert("File uploaded and analyzed successfully!");
          this.setIsReportsUploaded(true);
        } else {
          alert("Error during analysis: " + response.data.error);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        alert("Error during file upload and analysis.");
      }
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
.dropdown-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
}

.arrow-down {
  border: solid #555;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  margin-left: 8px;
  transform: rotate(45deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 10000;
  width: 100px;
}

.logout-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
}

.logout-button:hover {
  background-color: #e53935;
}
</style>
