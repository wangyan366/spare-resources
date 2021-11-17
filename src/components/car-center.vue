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
				<div class="van-sidebar-content-header">
					<img src="https://img01.yzcdn.cn/vant/apple-3.jpg" style="width:252px;height: 84px;" />
				</div>
				<div class="van-sidebar-content-nav">
					<div class="nav-title">移动运营商</div>
					<div class="nav-choose-content">

						<div class="nav-choose" v-for="(item,index) in dataList" :key="index" :class="current==index?'active':''" @click="handleClick(index)">
							<span>{{item.title}}</span>
						</div>
					</div>
					<div class="nav-title">充值金额</div>
					<div class="nav-panel">
						<div class="nav-panel-choose" v-for="(item,index) in rechargeList" :key="index" :class="rechargeCurrent==index?'rechargeActive':''" @click="handleRechargeClick(index)">
							<div class="choose-box">
								<div class="choose-top">
									<span class="choose-title">{{item.title}}元</span>
									<span class="choose-discount">{{item.discount}}折</span>
								</div>
								<div class="choose-down">售价{{item.price}}元</div>
							</div>
						</div>
					</div>

				</div>

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
			rechargeCurrent: 0,
			current: 0,
			value: "",
			activeKey: 0,
			show: false,
			rechargeList:
				[{ id: 1, title: "30", price: 26, discount: 8 },
				{ id: 1, title: "30", price: 26, discount: 8 },
				{ id: 1, title: "30", price: 26, discount: 8 },
				{ id: 1, title: "30", price: 26, discount: 8 },
				{ id: 1, title: "30", price: 26, discount: 8 },
				{ id: 1, title: "30", price: 26, discount: 8 },],
			dataList:
				[{ id: 1, title: "中国移动" },
				{ id: 1, title: "中国电信" },
				{ id: 1, title: "中国联通" },
				{ id: 1, title: "中国移动" },
				{ id: 1, title: "中国电信" },
				{ id: 1, title: "中国联通" },]
		};
	},

	mounted() {

	},

	methods: {
		handleRechargeClick(index) {
			this.rechargeCurrent = index
		},
		handleClick(index) {
			this.current = index;
		},
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
		padding: 0 16px;
		box-sizing: border-box;
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
	.van-sidebar-content-header {
		height: 100px;
		width: 100%;
		padding-top: 14px;
		margin-bottom: 16px;
		box-sizing: border-box;
		img {
			margin: auto;
			display: block;
		}
	}
	.van-sidebar-content-nav {
		.nav-title {
			font-size: 16px;
			font-weight: 600;
			margin-bottom: 10px;
		}
		.nav-choose-content {
			display: flex;
			flex-flow: row wrap;
			align-content: flex-start;
		}

		.nav-choose {
			font-size: 12px;
			line-height: 30px;
			display: inline-block;
			width: 33%;
			box-sizing: border-box;
			margin-bottom: 10px;
			span {
				display: inline-block;
				background: #fff;
				padding: 0 13px;
				border-radius: 6px;
				border: 1px solid #fff;
			}
		}
		.active {
			span {
				border: 1px solid #2ecc71;
			}
		}
	}

	.nav-panel {
		background: #fff;
		display: flex;
		flex-flow: row wrap;
		align-content: flex-start;
		padding-top: 16px;
		border-radius: 6px;
		.choose-box {
			display: inline-block;
			border: 1px solid #2ecc71;
			box-sizing: border-box;
			border-radius: 6px;
			padding: 10px;
			min-width: 88%;
			margin-bottom: 16px;
		}
		.nav-panel-choose {
			color: #2ecc71;
			font-size: 14px;
			width: 50%;
			text-align: center;

			.choose-top {
				display: flex;
				align-items: flex-end;
				justify-content: center;
				.choose-discount {
					font-size: 12px;
					margin-left: 4px;
				}
			}
			.choose-down {
				font-size: 14px;
			}
		}
		.rechargeActive {
			color: #fff;
			.choose-box {
				background: #2ecc71;
			}
		}
	}
}
</style>