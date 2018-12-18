import Axios from "axios";
var axios = Axios.create();
var config = {
  getURL: "http://changan.91ytt.com:5000/api/",
  updateURL: "http://changan.91ytt.com:50001/api/",
  export: "http://changan.91ytt.com:5000/export/"
};

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
  CONFIG: config
};
