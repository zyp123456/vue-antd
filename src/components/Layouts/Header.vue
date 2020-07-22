<template>
	<a-layout-header style="background: #fff; padding: 0">
		<a-icon
			class="trigger"
			:type="collapsed ? 'menu-unfold' : 'menu-fold'"
			@click="changeCollapsed"
		/>
		<a-popover class="user" placement="bottom">
			<template slot="content">
				<span class="logout" @click="logout()"><a-icon type="logout" />退出登录</span>
			</template>
			<template>
				<a-avatar icon="user" />
				{{this.$store.state.user.username}}
				<a-icon type="down" />
			</template>
		</a-popover>
	</a-layout-header>
</template>

<script>
	export default {
		name: 'Header',
		props: [
			"collapsed",
			"changeCollapsed",
		],
		methods: {
			// 退出登录
			logout() {
				this.$store.dispatch("user/resetAccessToken");
			}
		},
	}
</script>

<style lang="less">
	#trigger {
		.trigger {
			font-size: 18px;
			line-height: 64px;
			padding: 0 24px;
			cursor: pointer;
			transition: color 0.3s;
		}

		.trigger:hover {
			color: #1890ff;
		}
	}

	.user {
		float: right; 
		margin-right: 24px; 
		cursor: pointer;
	}

	.logout {
		i {
			margin-right: 5px;
		}
	}

	.logout:hover {
		color: #1890ff;
		cursor: pointer;
	}
</style>