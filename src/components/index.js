import GridItem from "./grid-item";
import Cells from "./cells";
import Form from "./form";
import Preview from "./preview";

export function RegisterComponents(Vue) {
    Vue.component("grid-item", GridItem);
    Vue.component("cells", Cells);
    Vue.component("w-form", Form);
    Vue.component("preview", Preview);
};
