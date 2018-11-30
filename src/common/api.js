import Axios from "axios";
var axios = Axios.create()
var config = {
    getURL: "http://149.28.86.210:5000/api/",
    updateURL: "http://149.28.86.210:50001/api/",
}

export default {
    POST(api, params) {
        return axios.post(config.getURL + api, params);
    },
    GET(api, params) {
        return axios.get(config.getURL + api, params);
    },
    UPDATE(api, params) {
        return axios.post(config.updateURL + api, params);
    },
    UPDATE_GET(api, params) {
        return axios.post(config.updateURL + api, params);
    }
};