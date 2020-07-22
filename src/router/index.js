import Vue from 'vue';
import Router from 'vue-router';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import HelloWorld from '@/components/HelloWorld';
import Hello from '@/components/Hello';
import BasicLayout from '@/components/Layouts/BasicLayout';
import FinancialIndex from '@/views/FinancialManagement/Index';
import Login from '@/views/Login/Index';

// vue全局使用Router
Vue.use(Router);

const routes = [{
	path: '/',
	component: BasicLayout,
	redirect: { name: "financial" },
	children: [{
		path: "financial",
		name: "financial",
		component: HelloWorld,
		meta: { icon: "dollar", title: "财务管理" },
	}, {
		path: "power",
		name: "power",
		component: FinancialIndex,
		redirect: { name: "role" },
		meta: { icon: "team", title: "权限管理" },
		children: [{
			path: "role",
			name: "role",
			component: Hello,
			meta: { title: "角色管理" },
		}, {
			path: "admin",
			name: "admin",
			component: HelloWorld,
			meta: { title: "管理员管理" },
		}]
	}, {
		path: "project",
		name: "project",
		component: FinancialIndex,
		redirect: { name: "item" },
		meta: { icon: "project", title: "工程管理" },
		children: [{
			path: "item",
			name: "item",
			component: Hello,
			meta: { title: "工程管理" },
		}, {
			path: "dropOrder",
			name: "dropOrder",
			component: HelloWorld,
			meta: { title: "弃单申请列表" },
		}]
	}]
},
{
    path: "/user",
    name: "user",
    redirect: { name: "login" },
    hideInMenu: true,
    component: Login,
    children: [
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "register",
        name: "register",
        component: HelloWorld
      }
    ]
},
// , {
// 	path: '/hello',
// 	name: 'HelloWorld',
// 	component: HelloWorld
// }
]

// 解决重复点击同一路由报错问题
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
  
// 利用路由守卫，在路由跳转前和跳转后进行动画过渡条提示
router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;