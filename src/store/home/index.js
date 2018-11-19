import APi from "../../common/api";
export default {
    state: {
        trial: 0,
        review: 0,
        complete: 0
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
        }
    },
    actions: {
        loadHomeData({ commit }) {
            return APi.POST("/getCount", {}).then(data => {
                commit("setTrial", data.trial);
                commit("setReview", data.review);
                commit("setComplete", data.complete);
            })
        }
    }
}