import Axios from "axios";
var axios = Axios.create()
var config = {
    getURL: "http://localhost:5000/api/",
    updateURL: "http://localhost:50001/api/",
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
    }
};