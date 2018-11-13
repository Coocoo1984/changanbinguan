import SelectQuoter from "./selectQuoter.vue";

let selectQuoter = {};
selectQuoter.install = function (Vue, Options) {
    var Component = Vue.extend(SelectQuoter);
    Vue.prototype.$selectQuoter = function (title, munes, default_value, change, ok) {
        var component = new Component({
            props: {
                title: title,
                munes: munes,
                defaultValue: default_value
            }
        }).$mount();
        component.title = title;
        component.munes = munes;
        component.value = default_value;
        component.$on("input", (item) => {
            change(item);
        });
        component.$on("ok", ok);
        document.querySelector('body').appendChild(component.$el)
    }
}
export default selectQuoter;