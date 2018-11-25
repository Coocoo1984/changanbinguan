import Axios from "axios";
var config = "http://localhost:8080/weixin/";
var apentid = "1000003"
export default {
    GetAccessToken() {
        return Axios.get(config + "gettoken?corpid=ww3589f3907e9ad0e5&corpsecret=lOV7xbGrbLKK7k1YgoHln50LSvlIi4Icy3zSH9nrjMQ", {});
    },
    GetDepartment(access_token, department_id) {
        return Axios.get(config + "department/list", { access_token: access_token, id: department_id });
    },
    GetUser(access_token, department_id) {
        return Axios.get(config + "user/list?access_token=" + access_token + "&department_id=" + department_id + "&fetch_child=true", {
            access_token: access_token,
            department_id: department_id,
            fetch_child: true
        })
    },
    SendMessageToUsers(access_token, url, userids, title, time, content) {
        return Axios.post(config + "message/send?access_token=" + access_token, {
            "touser": userids,
            "msgtype": "textcard",
            "agentid": apentid,
            "textcard": {
                "title": title,
                "description": "<div class=\"gray\">" + time + "</div> <div class=\"normal\">" + content + "</div>",
                "url": url,
                "btntxt": "更多"
            }
        });
    },
    SendMessageToDepartment(access_token, url, department_id, title, time, content) {
        return Axios.post(config + "message/send?access_token=" + access_token, {
            "toparty": department_id,
            "msgtype": "textcard",
            "agentid": apentid,
            "textcard": {
                "title": title,
                "description": "<div class=\"gray\">" + time + "</div> <div class=\"normal\">" + content + "</div>",
                "url": url,
                "btntxt": "更多"
            }
        });
    },
}