import Vue from "vue";
import Vuex from "vuex";
import Purchase from "./purchase";
import Admin from "./admin"
import Home from "./home";
import Common from "./common";
import WeiXin from "./weixin";
Vue.use(Vuex)
export function createStore() {

    const store = new Vuex.Store({
        modules: {
            Purchase,
            Admin,
            Home,
            Common,
            WeiXin
        },
    })
    return store;
}