import WeiXin from "../../common/weixin";
export default {
    state: {
        access_token: ""
    },
    mutations: {
        setAccessToken(state, token) {
            state.access_token = token;
        }
    },
    actions: {
        getAccessToken({ commit }) {
            return WeiXin.GetAccessToken().then(r => {
                commit("setAccessToken", r.data.access_token)
            })
        }
    }
}