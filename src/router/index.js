import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/report-page/login.vue";
import ReportMain from "../components/report-page/main.vue";
import store from "../store";

const routes = [
  {
    path: "/", // Default route goes to the login page
    name: "Login",
    component: Login,
  },
  {
    path: "/main", // New route for the main page
    name: "ReportMain",
    component: ReportMain,
    meta: { requiresAuth: true }, // Add authentication requirement
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global beforeEach guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.getters.getUsername; // Check if user is authenticated
  const token = localStorage.getItem('jwt'); 
  if (to.matched.some((record) => record.meta.requiresAuth) && (!isAuthenticated || !token)) {
    next("/"); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
