import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import MainLayout from "../components/layout/MainLayout.vue";
import ProductView from "../views/ProductView.vue";
import OrdersView from "../views/OrdersView.vue";

const routes = [{
    path: "/",
    component: MainLayout   ,
    children: [
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard
        },
         {
            path: "/products",
            name: "Products",
            component: ProductView
        },
        {
            path: "/orders",
            name: "Orders",
            component: OrdersView
        },
        {
            path: "/customers",
            name: "Customers",
            component: OrdersView
        },
        {
            path: "/customers",
            name: "Invoice",
            component: OrdersView
        },
        {
            path: "/customers",
            name: "Report & Analysis",
            component: OrdersView
        },
    ]
}]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;