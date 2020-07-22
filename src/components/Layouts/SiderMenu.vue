<template>
	<a-layout-sider v-model="collapsed" :trigger="null" collapsible>
		<div class="logo">
			<img src="../../assets/logo.png" />
			<span :class="collapsed ? 'hiddenContent' : ''">工兵家管理系统</span>
		</div>
		<a-menu
			:openKeys.sync="openKeys"
			:selectedKeys="selectedKeys"
			@openChange="onOpenChange"
			mode="inline"
			theme="dark"
		>
			<template v-for="item in menuInfo">
				<a-menu-item
					v-if="!item.children"
					:key="item.name"
					@click="() => $router.push({ name: item.name, query: $route.query })"
				>
					<a-icon v-if="item.meta.icon" :type="item.meta.icon" />
					<span>{{ item.meta.title }}</span>
				</a-menu-item>
				<SubMenu v-else :menu-info="item" :key="item.name" />
			</template>
		</a-menu>
	</a-layout-sider>
</template>

<script>
	import SubMenu from './SubMenu';
	export default {
		name: 'SiderMenu',
		props: [
			"collapsed",
		],
		components: {
			SubMenu,
		},
		created() {
			this.menuInfo = this.getRouterInfo(this.$router.options.routes);
			this.selectedKeys = [this.$route.name];
			this.openKeys = [this.$route.path.split("/")[1]];
		},
		data() {
			return {
				menuInfo: [],
				selectedKeys: [this.$route.name], // 当前选中的菜单项 key 数组
				openKeys: [''], // 当前展开的 SubMenu 菜单项 key 数组
			};
		},
		watch: {
			// 路由发生变化时，重新赋值选中的项
			'$route.path': function () {
				this.selectedKeys = [this.$route.name];
				this.openKeys = [this.$route.path.split("/")[1]];
			}
		},
		methods: {
			// 整合菜单数据
			getRouterInfo(routes) {
				let menuData = [];
				let that = this;
				routes.forEach(function(route) {
					// 避免操作原对象
					let newItem = { ...route };
					// 先删除其子数组，1.可避免数组的引用对源对象造成一些bug，2.有一些子路由不展示，这里可以先删除，后面根据情况处理后再加回来
					delete newItem.children; 
					if (!route.hideInMenu) {
						if (route.name && !route.children) {
							menuData.push(newItem);
						} else if (route.name && route.children && route.hideChildrenInMenu) {
							that.getRouterInfo(route.children);
							menuData.push(newItem);
						} else if (route.children && !route.hideChildrenInMenu) {
							newItem.children = [...that.getRouterInfo(route.children)];
							// 如果当前路由有name则加入当前路由及其子路由，如果当前路由没有name，表示只加入其子路由
							route.name ? menuData.push(newItem) : menuData.push(...newItem.children);
						}
					}
				});
				return menuData;
			},
			// SubMenu 展开/关闭的回调
			onOpenChange(openKeys) {
				if (openKeys.length !== 0) {  
					this.openKeys = [openKeys[1]]
				} else {
					this.openKeys = ['']
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	#trigger {
		.logo {
			height: 32px;
			background: rgba(255, 255, 255, 0.2);
			margin: 16px;
			color: #fff;
			text-align: center;
			font-size: 16px;
			line-height: 32px;

			img {
				width: 26px;
				height: 26px;
				margin-bottom: 4px;
			}
			
			.hiddenContent {
				display: none;
			}
		}
	} 
</style>