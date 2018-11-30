import APi from "../../common/api";
export default {
    state: {
        userid: "",
        username: "",
        deptname: "",
        deptid: "",
        userType: ""
    },
    mutations: {
        setUser(state, user) {
            state.userid = user.userid;
            state.username = user.username;
            state.deptname = user.deptname;
            state.deptid = user.deptid;
            state.userType = user.userType;
        }
    },
    actions: {
        updateUser({ state, commit }, user) {
            commit("setUser", user);
            
        }
    }
}