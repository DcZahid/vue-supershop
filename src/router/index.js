import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dash from "@/views/adminPanel/Dash.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dash",
      name: "dash",
      component: Dash,
      children: [
        {
          path: "/content",
          name: "content",
          component: () => import("../components/Content.vue"),
        },
        {
          path: "/category",
          name: "category",
          component: () => import("../components/Category.vue"),
        },
        {
          path: "/subcategory",
          name: "subcategory",
          component: () => import("../components/SubCategory.vue"),
        },
        {
          path: "/brand",
          name: "brand",
          component: () => import("../components/Brand.vue"),
        },
        {
          path: "/product",
          name: "product",
          component: () => import("../components/Product/ProductList.vue"),
        },
        {
          path: "/addproduct",
          name: "addproduct",
          component: () => import("../components/Product/AddProduct.vue"),
        },
        {
          path: "/editproduct",
          name: "editproduct",
          component: () => import("../components/Product/EditProduct.vue"),
        },
        
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
