import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/wood-work",
      name: "woodwork",
      component: () => import("../views/WoodWork.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/metal-work",
      name: "metalwork",
      component: () => import("../views/MetalWork.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/art",
      name: "art",
      component: () => import("../views/Art.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/painting",
      name: "painting",
      component: () => import("../views/Painting.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/interior-design",
      name: "interiordesign",
      component: () => import("../views/InteriorDesign.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/home-page",
      name: "home-page",
      component: () => import("../views/HomePage.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/home-page/:jobId",
      name: 'Job',
      component: () => import("../components/Job.vue"),
      props: true
    },
    {
      path: "/account-settings",
      name: "account-settings",
      component: () => import("../views/AccountSettings.vue"),
      meta: {
        auth: true
      }
    },
    {
      /* Wildcard path to catch other paths */
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFound.vue')
  }
  ],
});

const currentUser = () => {
  return new Promise(( resolve, reject ) => {
    const authStore = useAuthStore();
    const token = authStore.user;
    resolve(token);
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/")
    }
  } else {
    next();
  }
})
export default router;
