import Dialog from "./dialog.vue";

var dialog = {}
dialog.install = function (Vue, Options) {
    var Component = Vue.extend(Dialog);
    Vue.prototype.$dialog = function (title, content, ok, cancel) {
        var component = new Component({
            props: {
                title: title,
                content: content,
            }
        }).$mount();
        component.title = title;
        component.content = content;
        component.$on("click", (item) => {
            if (item == 'OK' && ok) ok();
            else if (cancel) cancel();
        });

        document.querySelector('body').appendChild(component.$el)
    }
}
export default dialog;