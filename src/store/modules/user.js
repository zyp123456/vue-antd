require('@/mock/index')
import { Message } from 'ant-design-vue';
import { login } from "@/api/user";
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
} from "@/utils/accessToken";
import router from "@/router";

// token名称
const tokenName = "accessToken";

const state = {
    accessToken: getAccessToken("accessToken"),
    username: getAccessToken("username"),
};
const getters = {
    accessToken: (state) => state.accessToken,
    username: (state) => state.username,
};
const mutations = {
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken;
        setAccessToken("accessToken", accessToken);
    },
    setusername(state, username) {
        state.username = username;
        setAccessToken("username", username);
    },
};
const actions = {
    async login({ commit }, userInfo) {
        const data = await login(userInfo);
        if (data.code === 0) {
            const accessToken = data.data[tokenName];
            commit("setAccessToken", accessToken);
            commit("setusername", data.data.username);
            router.push({path: "/"});
        } else {
            Message.error( "登录接口异常，请稍后重试");
            return false;
        }
    },
    resetAccessToken({ commit }) {
        commit("setAccessToken", "");
        commit("setusername", "");
        removeAccessToken();
        router.push({path: "/user"});
    },
};
export default { state, getters, mutations, actions };