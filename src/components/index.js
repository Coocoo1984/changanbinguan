import GridItem from "./grid-item";
import Cells from "./cells";
import Form from "./form";
import Preview from "./preview";
import ActionSheet from "./action-sheet";
import Dialog from "./dialog";
import Panel from "./panel"
import SelectQuoter from "./select-quoter";
export function RegisterComponents(Vue) {
    Vue.component("grid-item", GridItem);
    Vue.component("cells", Cells);
    Vue.component("w-form", Form);
    Vue.component("preview", Preview);
    Vue.component("panel", Panel)
    Vue.use(ActionSheet);
    Vue.use(Dialog);
    Vue.use(SelectQuoter);
};
