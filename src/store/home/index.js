import APi from "../../common/api";
export default {
    state: {
        trial: 0,
        review: 0,
        complete: 0,
        categoryList: []
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
        }
    },
    actions: {
        loadHomeData({ commit }) {
            return APi.GET("GoodsClasses", {}).then(r => {
                commit("setCategory", r.data);
            });
        }
    }
}