<template>
	<div id="car-center">
		<div class="car-center-header" ref="header">
			<form action="/">
				<van-search v-model="value" placeholder="搜索商品名称" @search="onSearch" safe-area-inset-top border>
				</van-search>
			</form>
		</div>
		<div class="car-center-content" ref="content">
			<van-sidebar v-model="activeKey" @change="onChange">
				<van-sidebar-item title="标签名1" />
				<van-sidebar-item title="加油充值卡" />
				<van-sidebar-item title="标签名3" />
			</van-sidebar>
			<div class="van-sidebar-content">
				<img src="https://img01.yzcdn.cn/vant/apple-3.jpg" style="width:252px;height: 84px;" />

			</div>
		</div>
		<van-dialog v-model="show" :closeOnClickOverlay="true" :showConfirmButton="false">
			<img src="https://img01.yzcdn.cn/vant/apple-3.jpg" style="height:300px" />
		</van-dialog>
	</div>
</template>

<script>
import {
	Search,
	NavBar,
	Image,
	Sidebar,
	SidebarItem,
	Notify,
	Dialog,
} from "vant";
export default {
	name: "carCenter",
	components: {
		[Search.name]: Search,
		[NavBar.name]: NavBar,
		[Image.name]: Image,
		[Sidebar.name]: Sidebar,
		[SidebarItem.name]: SidebarItem,
		[Notify.name]: Notify,
		[Dialog.Component.name]: Dialog.Component,
	},
	data() {
		return {
			value: "",
			activeKey: 0,
			show: false,
		};
	},

	mounted() {

	},

	methods: {
		showClick() {
			this.show = true
		},
		onChange(index) {
			Notify({ type: "primary", message: index });
		},
		onSearch(val) {
		},
		onCancel(val) {
		},
	},
};
</script>

<style lang="less" scoped>
#car-center {
	//   width: 100%;
	//   height: 100%;
	background: #f5f7fa;
	height: 100%;
	display: flex;
	flex-direction: column;
	.car-center-content {
		flex: 1;
		display: flex;
	}
	.car-center-header {
		display: flex;
		align-items: center;
		form {
			flex: 1;
		}
	}
	.van-sidebar {
		float: left;
		height: 100%;
		background: #fff;
	}
	.van-sidebar-content {
		flex: 1;
	}
	.card {
		background: red;
	}
	/deep/ .van-field__left-icon .van-icon,
	.van-field__right-icon .van-icon {
		color: #c7cad1;
	}
	/deep/ .van-search {
		border-bottom: 1px solid #f5f7fa;
	}
	/deep/ .van-sidebar-item--select::before {
		position: absolute;
		top: 46px;
		left: 50%;
		width: 32px;
		height: 5px;
		border-radius: 4px;
		background-color: #2ecc71;
		-webkit-transform: translateY(-50%);
		transform: translateX(-50%);
		// content: "";
	}
	/deep/ .van-sidebar-item {
		text-align: center;
		font-weight: 600;
	}
}
</style>