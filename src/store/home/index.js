import APi from "../../common/api";
export default {
  state: {
    trial: 0,
    review: 0,
    end: 0,
    complete: 0,
    categoryList: [],
    bizTypes: [],
    goods: []
  },
  mutations: {
    setTrial(state, count) {
      state.trial = count || 0;
    },
    setReview(state, count) {
      state.review = count || 0;
    },
    setEnd(state, count) {
      state.end = count || 0;
    },
    setComplete(state, count) {
      state.complete = count || 0;
    },
    setCategory(state, list) {
      state.categoryList = list;
    },

    setBizTypes(state, types) {
      state.bizTypes = types;
    },
    setGoods(state, goods) {
      state.goods = goods;
    }
  },
  actions: {
    loadHomeData({ commit }) {
      return APi.GET("GoodsClasses", {}).then(r => {
        commit("setCategory", r.data);
      });
    },
    loadBizTypes({ commit }) {
      return APi.GET("BizTypes", {}).then(r => {
        commit("setBizTypes", r.data);
      });
    },
    loadHomeCount({ commit }) {
      return APi.GET("PurchasingPlanCount4All", {}).then(r => {
        commit("setComplete", r.data.filter(m => m.desciption == "已完成")[0].count);
        commit("setTrial", r.data.filter(m => m.desciption == "待初审")[0].count);
        commit("setReview", r.data.filter(m => m.desciption == "待复审")[0].count);
        commit("setEnd", r.data.filter(m => m.desciption == "待三审")[0].count);
      });
    },
    loadGoods({ commit }) {
      return APi.GET("Goods", {}).then(r => {
        commit("setGoods", r.data);
      });
    }
  }
};
