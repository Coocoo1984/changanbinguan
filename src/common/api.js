import Axios from "axios";

var axios = Axios.create({
    baseURL: "http://149.28.86.210:5000/"
})


export default {
    POST(api, params) {
        //伪码实现
        return new Promise(
            resolve => resolve({ data: "", code: 0 }), reject => {
                reject()
            });

        return axios.post(api, params);
    },
    GET(api, params) {
        //伪码实现
        return new Promise(
            resolve => resolve({ data: "", code: 0 }), reject => {

            });
        return axios.get(api, params);
    }
};