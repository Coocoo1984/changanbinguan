import Vue from "vue";
import Vuex from "vuex";
import Purchase from "./purchase";
import Admin from "./admin"
import Home from "./home";
import Common from "./common";
Vue.use(Vuex)
export function createStore() {

    const store = new Vuex.Store({
        modules: {
            Purchase,
            Admin,
            Home,
            Common
        },

    })
    return store;
}