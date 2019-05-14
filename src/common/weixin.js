import Axios from "axios";
var config = "/weixin/";
var apentid = "1000003";
export default {
  GetAccessToken() {
    return Axios.get(
      config +
        "gettoken?corpid=ww3589f3907e9ad0e5&corpsecret=lOV7xbGrbLKK7k1YgoHln50LSvlIi4Icy3zSH9nrjMQ",
      {}
    );
  },
  GetDepartment(department_id) {
    return Axios.get(config + "department/list?id=" + department_id);
  },
  GetUser(department_id) {
    return Axios.get(config + "user/get?userid=" + department_id);
  },
  GetDepatmentUser(dept_id) {
    return Axios.get(config + "user/simplelist?department_id=" + dept_id);
  },
  SendMessageToUsers(url, userids, title, time, content) {
    return Axios.post(config + "message/send", {
      touser: userids,
      msgtype: "textcard",
      agentid: apentid,
      textcard: {
        title: title,
        description:
          '<div class="gray">' +
          time +
          '</div> <div class="normal">' +
          content +
          "</div>",
        url: url,
        btntxt: "更多"
      }
    });
  },
  SendMessageToDepartment(url, department_id, title, time, content) {
    return Axios.post(config + "message/send", {
      touser: department_id,
      msgtype: "textcard",
      agentid: apentid,
      textcard: {
        title: title,
        description:
          '<div class="gray">' +
          time +
          '</div> <div class="normal">' +
          content +
          "</div>",
        url: url,
        btntxt: "更多"
      }
    });
  }
};
