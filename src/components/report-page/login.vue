<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" v-model="username" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" class="form-control" required />
          </div>
          <div class="button-group">
            <button type="button" class="register-button" @click="goToRegister">Sign up</button>
            <button type="submit" class="login-button">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      ...mapActions(["login"]),
      handleLogin() {
        if (this.username === "admin" && this.password === "admin") {
          this.login(this.username); // Call Vuex action to store the username
          this.$router.push("/main"); // Redirect to the main page
        } else {
          alert("Incorrect username or password");
        }
      },
      goToRegister() {
       //TODO
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-box {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  .login-button, .register-button {
    background-color: #4caf50;
    color: white;
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 48%;
  }
  
  .login-button:hover, .register-button:hover {
    background-color: #45a049;
  }
  </style>
  