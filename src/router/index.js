import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export function createRouter() {
    return new VueRouter({
        mode: 'history',
        fallback: false,
        //scrollBehavior: () => ({ y: 0 }),
        routes: [
            {
                path: "/", component: () => import("../views/home")
            },
            {
                path: "/adm/purchase", component: () => import("../views/admin/purchase")
            },
            {
                path: "/adm/purchase/item", component: () => import("../views/admin/purchase/item")
            },
            {
                path: "/adm/purchase/back", component: () => import("../views/admin/purchase/back")
            },
            {
                path: "/adm/purchase/content", component: () => import("../views/admin/purchase/content")
            },
            {
                path: "/adm/quote", component: () => import("../views/admin/quote")
            },
            {
                path: "/adm/quote/content", component: () => import("../views/admin/quote/content")
            },
            {
                path: "/adm/quote/quoter", component: () => import("../views/admin/quote/quoter")
            },
            {
                path: "/manager", component: () => import("../views/manager")
            },
            {
                path: "/manager/commodity", component: () => import("../views/manager/commodity")
            },
            {
                path: "/manager/commodity/category", component: () => import("../views/manager/commodity/category")
            },
            {
                path: "/manager/purchase", component: () => import("../views/manager/purchase")
            },
            {
                path: "/manager/purchase/info", component: () => import("../views/manager/purchase/info")
            },
            {
                path: "/manager/quote", component: () => import("../views/manager/quote")
            },
            {
                path: "/manager/quote/info", component: () => import("../views/manager/quote/info")
            },
            {
                path: "/purchase", component: () => import("../views/purchase")
            },
            {
                path: "/purchase/add", component: () => import("../views/purchase/add")
            },
            {
                path: "/purchase/add/item", component: () => import("../views/purchase/add/add_item.vue")
            },
            {
                path: "/purchase/list", component: () => import("../views/purchase/list")
            },
            {
                path: "/purchase/content", component: () => import("../views/purchase/content")
            },
            {
                path: "/purchase/receipt", component: () => import("../views/purchase/receipt")
            },
            {
                path: "/purchase/receipt/:id", component: () => import("../views/purchase/receipt/item")
            },
            {
                path: "/purchase/statistics", component: () => import("../views/purchase/statistics")
            },
            {
                path: "/purchase/statistics/result", component: () => import("../views/purchase/statistics/content")
            },
            {
                path: "/review", component: () => import("../views/review")
            },
            {
                path: "/review/list", component: () => import("../views/review/list")
            },
            {
                path: "/review/list/:id", component: () => import("../views/review/list/item")
            },
            {
                path: "/quote", component: () => import("../views/quote")
            },
            {
                path: "/quote/add", component: () => import("../views/quote/add")
            },
            {
                path: "/quote/list", component: () => import("../views/quote/list")
            },
            {
                path: "/quote/content", component: () => import("../views/quote/content")
            },
            {
                path: "/stock", component: () => import("../views/stock")
            },
            {
                path: "/stock/add", component: () => import("../views/stock/add")
            },
        ]
    });
}