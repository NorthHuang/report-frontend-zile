<template>
  <div class="header">
    <div class="user-info">
      <span @click="toggleDropdown">{{ username }} ▼</span>
      <div v-if="showDropdown" class="dropdown-menu">
        <button @click="handleLogout">Logout</button>
      </div>
    </div>
    <!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button size="large" icon="ios-cloud-upload-outline" @click="uploadFile"
        >Upload And Analyse</Button
      >
    </Upload> -->
    <Upload :before-upload="handleFileUpload" :show-upload-list="false">
      <Button size="large" icon="ios-cloud-upload-outline">Upload And Analyse</Button>
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
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      showDropdown: false,
      selectedFile: null,//store the uploaded file
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
    handleFileUpload(file){
      this.selectedFile = file; // Capture the uploaded file
      this.uploadFile();
      return false; // Prevent automatic upload, will handle manually
    },
    ...mapActions(["setIsReportsUploaded"]),
    async uploadFile(){
      if(!this.selectedFile){
        alert("Please select a file first!");
        return;
      }
      try{
          //create a form data object
          let formData = new FormData();
          formData.append("file", this.selectedFile);
          //add jwt token 
          const token =localStorage.getItem("jwt");
          //send it to back end
          const response=await axios.post("http://localhost:5000/analysis", formData,{
            headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token, // Send JWT token
          },
          });
          if(response.data.status==="ok"){
            alert("File uploaded and analyzed successfully!");
            this.setIsReportsUploaded(true);
          }else{
            alert("Error during analysis: " + response.data.error);
          }
      } catch (error){
        console.error("Error during file upload:", error);
        alert("Error during file upload and analysis.");
      }
    } 
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
