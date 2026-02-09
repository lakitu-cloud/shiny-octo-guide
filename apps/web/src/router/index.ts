import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../components/layout/MainLayout.vue";
import InvoiceListView from "../views/invoice/InvoiceListView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import UserListView from "../views/users/UserListView.vue";
import UserForm from "../components/form/UserForm.vue";
import UserView from "../views/users/UserView.vue";
import MasterLayout from "../components/layout/MasterLayout.vue";

const routes = [{
    path: "/dashboard",
    component: MainLayout,
    children: [
        { path: "", name: "Dashboard", component: () => import("../views/Dashboard.vue") },
        { path: "/products", name: "Products", component: () => import("../views/ProductView.vue") },
        { path: "/orders",name: "Orders",component: () => import("../views/OrdersView.vue") },
        { path: "/customers", name: "Customers", component: () => import("../views/CustomerView.vue") },
        { path: "/invoices", name: "Invoice.List", component: InvoiceListView },
        { path: "/invoices/create", name: "Invoice.Create", component: () => import("../views/invoice/InvoiceCreateView.vue") },
        { path: "/invoices/:id", name: "Invoice.View", component: () => import('../views/invoice/InvoiceSingleView.vue') },
        // { path: "/customers", name: "Report & Analysis", component: () => import("") },
        { path: '/users', name: 'Users.List', component: UserListView },
        { path: '/users/create', name: 'Users.Create', component: UserForm },
        { path: '/users/:id/edit', name: 'Users.Edit', component: UserForm },
        { path: '/users/:id', name: 'Users.View', component: UserView },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
    ]
}, {
    path: "/pos",
    component: MasterLayout,
    children: [
        { path: "", name: "pos", component: () => import("../views/pos/index.vue")
        }
    ]
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;