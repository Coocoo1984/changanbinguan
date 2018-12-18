import APi from "../../common/api";
export default {
  state: {
    userid: "1",
    username: "11",
    deptname: "aa",
    deptid: "1",
    userType: "purchase_center",
    code: "1"
  },
  mutations: {
    setUser(state, user) {
      state.userid = user.userid;
      state.username = user.username;
      state.deptname = user.deptname;
      state.deptid = user.deptid;
      state.userType = user.userType;
      state.code = user.code;
    }
  },
  actions: {
    updateUser({ state, commit }, user) {
      commit("setUser", user);
    }
  }
};
