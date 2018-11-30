import APi from "../../common/api";
export default {
    state: {
        trial: 0,
        review: 0,
        complete: 0,
        categoryList: [],
        bizTypes: []
    },
    mutations: {
        setTrial(state, count) {
            state.trial = count || 0;
        },
        setReview(state, count) {
            state.review = count || 0;
        },
        setComplete(state, count) {
            state.complete = count || 0;
        },
        setCategory(state, list) {
            state.categoryList = list;
        },
        setBizTypes(state, types) {
            state.bizTypes = types;
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
            })
        },
        loadHomeCount({ commit }) {
            return APi.GET("PurchasingPlanCount4All", {}).then(r => {
                commit("setComplete",r.data[0].count);
                commit("setTrial",r.data[1].count);
                commit("setReview",r.data[2].count);
            });
        }
    }
}