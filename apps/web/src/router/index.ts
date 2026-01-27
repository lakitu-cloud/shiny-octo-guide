import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import MainLayout from "../components/layout/MainLayout.vue";
import ProductView from "../views/ProductView.vue";
import OrdersView from "../views/OrdersView.vue";
import CustomerView from "../views/CustomerView.vue";
import InvoiceListView from "../views/invoice/InvoiceListView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import UserListView from "../views/users/UserListView.vue";
import UserForm from "../components/form/UserForm.vue";
import UserView from "../views/users/UserView.vue";

const routes = [{
    path: "/",
    component: MainLayout,
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
            component: CustomerView
        },
        {
            path: "/invoices",
            name: "Invoice.List",
            component: InvoiceListView
        },
        {
            path: "/invoices/create",
            name: "Invoice.Create",
            component: () => import("../views/invoice/InvoiceCreateView.vue")
        },
        {
            path: "/invoices/:id",
            name: "Invoice.View",
            component: () => import('../views/invoice/InvoiceSingleView.vue')
        },
        {
            path: "/customers",
            name: "Report & Analysis",
            component: OrdersView
        },
        {
            path: '/users',
            name: 'Users.List',
            component: UserListView
        },
        {
            path: '/users/create',
            name: 'users.create',
            component: UserForm
        },
        {
            path: '/users/:id/edit',
            name: 'users.edit',
            component: UserForm
        },
        {
            path: '/users/:id',
            name: 'users.view',
            component: UserView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => NotFoundView, // create this if you want
        },
    ]
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;