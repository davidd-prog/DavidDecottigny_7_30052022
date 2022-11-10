import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { accountService } from "@/_services";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignupView.vue"),
  },
  {
    path: "/users",
    name: "UserIndex",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UsersList.vue"),
  },
  {
    path: "/postupdate/:id(\\d+)",
    name: "PostUpdate",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PostUpdate.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const token = accountService.getToken();
  const user = accountService.getUserId();
  const auth = { token, user };

  if (authRequired && !auth.token) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

router.afterEach;

export default router;
