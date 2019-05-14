import Loading from "./loading.vue";
var loading = {
  context: null
};

loading.install = function(Vue) {
  var Component = Vue.extend(Loading);
  Vue.prototype.$loadingInit = function() {
    if (loading.context) return;
    loading.context = new Component({
      props: {
        show: false,
        message: "数据加载中"
      }
    }).$mount();
    document.querySelector("body").appendChild(loading.context.$el);
  };

  Vue.prototype.$loading = function(show, message) {
    if (!loading.context) Vue.prototype.$loadingInit();
    loading.context.show = show;
    loading.context.message = message || "数据加载中";
  };

  Vue.prototype.$succecs = function(show, message) {
    if (!loading.context) Vue.prototype.$loadingInit();
    loading.context.show = show;
    loading.context.message = message || "操作成功";
    loading.context.cls = "weui-icon-success-no-circle ";
    setTimeout(() => {
      loading.context.show = false;
    }, 1000);
  };

  Vue.prototype.$warn = function(show, message) {
    if (!loading.context) Vue.prototype.$loadintInit();
    if (loading.context.show)
      setTimeout(() => {
        loading.context.show = show;
        loading.context.message = message;
        loading.context.cls = "weui-icon-warn";
        setTimeout(() => {
          loading.context.show = false;
        }, 3000);
      }, 500);
  };
};

export default loading;
