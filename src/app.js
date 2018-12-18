import "@/assects/css/rest.css";
import "@/assects/css/weiui.css";

import Vue from "vue";
import App from "./app.vue";
import { createStore } from "./store";
import { createRouter } from "./router";
import { RegisterComponents } from "./components";
import { sync } from "vuex-router-sync";
import api from "./common/api";
import Autocomplete from "v-autocomplete";
import "v-autocomplete/dist/v-autocomplete.css";
Vue.use(Autocomplete);
import WeiXin from "@/common/weixin";
export function createApp() {
  RegisterComponents(Vue);
  const store = createStore();
  const router = createRouter(store);
  Vue.prototype.$POST = api.POST;
  Vue.prototype.$GET = api.GET;
  Vue.prototype.$UPDATE = api.UPDATE;
  Vue.prototype.$UPDATE_GET = api.UPDATE_GET;
  Vue.prototype.$SendDeptMsg = WeiXin.SendMessageToDepartment;
  Vue.prototype.$Now = function() {
    var d = new Date();
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes()
    );
  };
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
      this.$loadingInit();

      this.$store.dispatch("loadHomeData");
      this.$store.dispatch("loadBizTypes");
      this.$store.dispatch("loadGoods");
      //WeiXin.GetDepartment(0);
    }
  });
  return { app, router, store };
}
