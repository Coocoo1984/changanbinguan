import Picker from "./index.vue";
var picker = {};
var o = {
    type: "datePicker",
    date: this.endDate,
    endTime: "3000-09-08",
    startTime: this.startDate,
    onOk: date => {
        this.endDate = date;
    }
}
picker.install = function (Vue) {
    var Component = Vue.extend(Picker);
    Vue.prototype.$picker = function (options) {
        var component = new Component({
            props: {
                show: false,
                value: options.date,
                startTime: options.startTime,
                endTime: options.endTime,
            },
        }).$mount();
        component
    }
}