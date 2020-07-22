import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
// require('@/mock/index')
import { Button, Icon, Layout, Menu, Avatar, Popover, Form, Input, Spin } from 'ant-design-vue'

Vue.use(Button);
Vue.use(Icon);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Avatar);
Vue.use(Popover);
Vue.use(Form);
Vue.use(Input);
Vue.use(Spin);

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
