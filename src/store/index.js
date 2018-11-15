import Vue from "vue";
import Vuex from "vuex";
import Purchase from "./purchase";
import Admin from "./admin"
Vue.use(Vuex)
export function createStore() {

    const store = new Vuex.Store({
        modules: {
            Purchase,
            Admin
        },

    })
    return store;
}