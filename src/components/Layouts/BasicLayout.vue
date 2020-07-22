<template>
	<a-layout id="trigger" style="min-height: 100vh">
		<SiderMenu :collapsed="collapsed" />
		<a-layout>
			<Header :collapsed="collapsed" :changeCollapsed="changeCollapsed" />
			<a-layout-content
				:style="{ margin: '24px 16px', padding: '24px', background: '#fff' }"
				:loading="this.$store.state.loadding"
			>
				<router-view />
			</a-layout-content>
			<Footer />
		</a-layout>
	</a-layout>
</template>

<script>
	import SiderMenu from './SiderMenu';
	import Header from './Header';
	import Footer from './Footer';
	export default {
		name: 'BasicLayout',
		components: {
			SiderMenu,
			Header,
			Footer,
		},
		data() {
			return {
				collapsed: false,
			};
		},
		beforeCreate() {
			// 先暂时验证用户有没有登录，无token跳转登录页面
			if (!this.$store.state.user.accessToken) {
				this.$router.push({ path: "/user" });
			}
		},
		methods: {
			changeCollapsed: function() {
				this.collapsed = !this.collapsed;
			},
			increment() {
				this.$store.commit('increment')
				console.log(this.$store.state.count)
			}
		},
	}
</script>
