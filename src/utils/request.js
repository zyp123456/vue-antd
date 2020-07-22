import axios from "axios";
import { Message } from 'ant-design-vue';
import store from "@/store";
import qs from "qs";
import router from "@/router";
// import _ from "lodash";
import { isArray, isNumber } from "@/utils/validate";

const service = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://192.168.1.20:4005' : process.env.VUE_APP_BASE_API,
    // 默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
    baseURL:
        process.env.NODE_ENV === "development" || process.env.NODE_ENV === "preview"
            ? ""
            : "",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
});

// token名称
const tokenName = "accessToken";
// 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
const contentType = "application/json;charset=UTF-8";
// 操作正常code，支持String、Array两种方式
const successCode = [200, 0];

service.interceptors.request.use(
    (config) => {
        // 在请求发出之前进行一些操作
        store.state.loadding = true;
        if (store.getters["user/accessToken"]) {
            config.headers[tokenName] = store.getters["user/accessToken"];
        }
        // if (config.data) {
        //     //这里会过滤所有为空、0、fasle的key，如果不需要请自行注释
        //     config.data = _.pickBy(config.data, _.identity);
        // }
        if (process.env.NODE_ENV !== "preview") {
            if (contentType === "application/x-www-form-urlencoded;charset=UTF-8") {
                if (config.data) {
                    config.data = qs.stringify(config.data);
                }
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const errorMsg = (message) => {
    return Message.error( message, 3000);
};

service.interceptors.response.use(
    (response) => {
        // 在这里对返回的数据进行处理
        store.state.loadding = false;
        const { data, config } = response;
        const { code, message } = data;
        let codeVerification = false;

        if (isNumber(successCode)) {
            codeVerification = code !== successCode;
        }
        if (isArray(successCode)) {
            for (let i = 0; i < successCode.length; i++) {
                if (code === i) {
                    codeVerification = code !== i;
                    break;
                }
            }
        }
        console.log(response, 'rrrrrrrrrrrrrrrrrrr')

        if (codeVerification) {
            switch (code) {
                case 402:
                    errorMsg(message || `后端接口${code}异常`);
                    store.dispatch("user/resetAccessToken");
                    break;
                case 401:
                    router.push({
                        path: "/user",
                    });
                    break;
                default:
                    errorMsg(message || `后端接口${code}异常`);
                    break;
            }
            return Promise.reject(
                "antd-vue请求异常拦截:" +
                JSON.stringify({ url: config.url, code, message }) || "Error"
            );
        } else {
            return data;
        }
    },
    (error) => {
        /*网络连接过程异常处理*/
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        }
        if (message.includes("timeout")) {
            message = "后端接口请求超时";
        }
        if (message.includes("Request failed with status code")) {
            message = "后端接口" + message.substr(message.length - 3) + "异常";
        }
        errorMsg(message || "后端接口未知异常");
        return Promise.reject(error);
    }
);
export default service;