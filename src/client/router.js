import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/email",
      name: "email",
      component: () => import("./views/ConfirmEmail.vue")
    },
    {
      path: "/confirmed",
      name: "confirmed",
      component: () => import("./views/Confirmed.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue")
    },
    {
      path: "/stocks/:symbol",
      name: "stock-page",
      component: () => import("./views/Stock")
    },
    {
      path: "/history",
      name: "history",
      component: () => import("./views/History")
    }
  ]
});

const isAuthenticated = () => {
  return document.cookie.indexOf("tradish-session") !== -1;
};

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && to.path !== "/register") {
    if (!isAuthenticated() && to.path !== "/") next("/login");
    else {
      next();
    }
  } else if (to.path == "/register" && isAuthenticated()) {
    next(from);
  } else next();
});

export default router;
