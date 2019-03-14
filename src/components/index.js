import GridItem from "./grid-item";
import Cells from "./cells";
import Form from "./form";
import Preview from "./preview";
import ActionSheet from "./action-sheet";
import Dialog from "./dialog";
import Panel from "./panel";
import SelectQuoter from "./select-quoter";
import Loading from "./loading";
import PurchaseList from "./purchaseList";
import Goods from "./goods";
import vScroll from "./scroll/scroll.vue";
export function RegisterComponents(Vue) {
  Vue.component("grid-item", GridItem);
  Vue.component("cells", Cells);
  Vue.component("w-form", Form);
  Vue.component("preview", Preview);
  Vue.component("panel", Panel);
  Vue.component("purchase-list", PurchaseList);
  Vue.component("goods", Goods);
  Vue.component("v-scroll", vScroll);
  Vue.use(ActionSheet);
  Vue.use(Dialog);
  Vue.use(Loading);
  Vue.use(SelectQuoter);
}
