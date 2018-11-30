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
            state.trial = count || 1;
        },
        setReview(state, count) {
            state.review = count || 5;
        },
        setComplete(state, count) {
            state.complete = count || 11;
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
        }
    }
}