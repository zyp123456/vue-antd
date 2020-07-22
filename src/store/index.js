import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
    console.log(key, 'ffffffffffffffffffff')
    modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

Object.keys(modules).forEach((key) => {
    modules[key]["namespaced"] = true;
});

const store = new Vuex.Store({
    // 状态
    state: {
        loadding: false
    },
    // 状态修改方法
    // 使用store.commit()来调用
    mutations: {
        showloadding(state, load) {
            state.loadding = load
        }
    },
    // 可以用store.dispatch来调用
    actions: {
        setloadding(context, load) {
            context.commit("showloadding", load);
        }
    },
    getters: {
        isloading: (state) => {
            return state.loadding
        }
    },
    modules,
});

export default store;