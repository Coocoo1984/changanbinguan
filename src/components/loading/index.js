import Loading from "./loading.vue";
var loading = {
    context: null
}


loading.install = function (Vue) {
    var Component = Vue.extend(Loading);
    Vue.prototype.$loadingInit = function () {
        if(loading.context) return;
        loading.context = new Component({
            props:{
                show: false
            }
        }).$mount();
        document.querySelector('body').appendChild(loading.context.$el)
    }

    Vue.prototype.$loading = function (show) {
        if(!loading.context) Vue.prototype.$loadingInit();
        loading.context.show = show;
    }
}


export default loading;