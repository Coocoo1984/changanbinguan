import Loading from "./loading.vue";
var loading = {
    context: null
}


loading.install = function (Vue) {
    var Component = Vue.extend(Loading);
    Vue.prototype.$loadingInit = function () {
        if (loading.context) return;
        loading.context = new Component({
            props: {
                show: false,
                message: "数据加载中"
            }
        }).$mount();
        document.querySelector('body').appendChild(loading.context.$el)
    }

    Vue.prototype.$loading = function (show, message) {
        if (!loading.context) Vue.prototype.$loadingInit();
        loading.context.show = show;
        loading.context.message = message || "数据加载中";
    }
}


export default loading;