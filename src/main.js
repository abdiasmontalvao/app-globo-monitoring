import Vue from "vue";
import VueRouter from "vue-router";
import "bootstrap/scss/bootstrap.scss";
import { routes } from "./routes";
import provider from "./providers/provider";

import client from "./config/ApiClient";
import App from "./App.vue";

Vue.use(VueRouter);
Vue.prototype.$client = client;

const router = new VueRouter({ routes, mode: "history" });

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const isLogged = provider.getters.isLogged;
  const currentUser = provider.getters.getLoggedUser;

  if (requiresAuth && !isLogged) {
    return next({ name: "login" });
  } else if (to.name == "login" && isLogged) {
    return next({ name: "main" });
  } else if (requiresAdmin && currentUser.roleName !== "administrator") {
    return next({ name: "main" });
  }

  return next();
});

new Vue({
  el: "#app",
  router,
  store: provider,
  render: h => h(App)
});
