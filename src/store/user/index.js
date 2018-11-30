export default {
    state: {
        userid: "",
        username: "",
        openid: "",
        deptname: "",
        deptid: ""
    },
    mutations: {
        updateUser(state, user) {
            state.userid = user.userid;
            state.username = user.username;
            state.openid = user.openid;
            state.deptname = user.deptname;
            state.deptid = user.deptid;
        }
    }
}