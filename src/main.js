import { createApp } from "vue";
import ViewUIPlus from "view-ui-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "view-ui-plus/dist/styles/viewuiplus.css";
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000';
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(store).use(router).use(ViewUIPlus).mount("#app");
