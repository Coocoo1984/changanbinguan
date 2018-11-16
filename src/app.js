import "@/assects/css/rest.css"
import "@/assects/css/weiui.css";


import Vue from 'vue'
import App from './app.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { RegisterComponents } from "./components";
import { sync } from 'vuex-router-sync'


export function createApp() {
    RegisterComponents(Vue)
    const store = createStore()
    const router = createRouter()

    sync(store, router)
    const app = new Vue({
        router,
        store,
        render: h => h(App),
        mounted() {
            //this.$progressInit();
        }
    })
    return { app, router, store }
}