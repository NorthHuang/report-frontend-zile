import { createWebHistory, createRouter } from "vue-router";
import ReportMain from "../components/report-page/main.vue";

const routes = [
  {
    path: "/",
    name: "ReportMain",
    component: ReportMain,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
