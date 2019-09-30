import Axios from "axios";
var axios = Axios.create({});
var config = {
    getURL: "http://wx.changan-hotel.cn:5000/api/",
    updateURL: "http://wx.changan-hotel.cn:50001/api/",
    export: "http://wx.changan-hotel.cn:5000/export/"
};
axios.interceptors.request.use(config => {
  if (window.app.$store.state.User.weichatID || window.userID) {
    if (config.method == "post") {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
      if (config.data) {
        let data = JSON.parse(JSON.stringify(config.data));
        data.WechatID = window.app.$store.state.User.weichatID || window.userID;
        config.data = JSON.stringify(data);
      }
    }
    if (config.method == "get") {
      if (!config.params) config.params = {};
      config.params.WechatID =
        window.app.$store.state.User.weichatID || window.userID;
    }
  }
  return config;
});
axios.interceptors.response.use(config => {
  if (config.data == "没有访问权限") {
    window.app.$warn(true, "没有访问权限");
    config.data = {};
  }
  return config;
});
export default {
  POST(api, params) {
    return axios.post(config.getURL + api, params);
  },
  EXPORT(api, params) {
    return axios.post(config.export + api, params);
  },
  GET(api, params) {
    return axios.get(config.getURL + api, params);
  },
  UPDATE(api, params) {
    return axios.post(config.updateURL + api, params);
  },
  UPDATE_GET(api, params) {
    return axios.post(config.updateURL + api, params);
  },
  Local(api, params) {
    return Axios.get(api, params);
  },
  LocalPost(api, params) {
    return Axios.post(api, params);
  },
  CONFIG: config
};
