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
          <button type="button" class="register-button" @click="goToRegister">register</button>
          <button type="submit" class="login-button">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      username: "", // Username input model
      password: "", // Password input model
    };
  },
  methods: {
    ...mapActions(["login"]), // Vuex login action to store user state
    async handleLogin() {
      try {
        // Send login request to the backend
        const response = await axios.post('http://localhost:5000/login', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;

        // If login is successful
        if (token) {
          this.login(this.username); // Store the username in Vuex state
          localStorage.setItem('jwt', token); // Save JWT token in localStorage
          this.$router.push("/main"); // Redirect to the main page
        }
      } catch (error) {
        alert("Login failed. Please check your credentials.");
      }
    },
    async goToRegister() {
      try {
        // Send registration request to the backend
        const response = await axios.post('http://localhost:5000/register', {
          username: this.username,
          password: this.password,
        });

        if (response.data.status === "success") {
          alert("Registration successful. You can now login.");
        } else {
          alert("Registration failed. Try again.");
        }
      } catch (error) {
        // alert("Error occurred during registration.");
        if (error.response && error.response.data.message) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert('An unknown error occurred during registration.');
    }
      }
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
