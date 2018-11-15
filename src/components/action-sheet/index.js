import ActionSheet from "./actionSheet.vue";


let actionSheet = {};
actionSheet.install = function (Vue, Options) {
    var Component = Vue.extend(ActionSheet);
    Vue.prototype.$actionSheet = function (title, munes, hander, cancel) {
        var component = new Component({
            props: {
                title: title,
                munes: munes
            }
        }).$mount();
        component.title = title;
        component.munes = munes;
        component.$on("mune-click", (item) => {
            component.show = false;
            hander(item);
        });
        if (cancel)
            component.$on("cancel", cancel);
        document.querySelector('body').appendChild(component.$el)
    }
}
export default actionSheet;