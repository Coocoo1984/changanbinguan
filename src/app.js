import "@/assects/css/rest.css"
import "@/assects/css/weiui.css";


import Vue from 'vue'
import App from './app.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { RegisterComponents } from "./components";
import { sync } from 'vuex-router-sync'
import api from "./common/api";
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
Vue.use(Autocomplete)

export function createApp() {
    RegisterComponents(Vue)
    const store = createStore()
    const router = createRouter(store)
    Vue.prototype.$POST = api.POST;
    Vue.prototype.$GET = api.GET;
    Vue.prototype.$UPDATE = api.UPDATE
    sync(store, router)
    const app = new Vue({
        router,
        store,
        render: h => h(App),
        mounted() {
            this.$loadingInit();
            this.$store.dispatch("loadHomeData")
        }
    })
    return { app, router, store }
}