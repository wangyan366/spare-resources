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
					<img src="https://img01.yzcdn.cn/vant/cat.jpeg" style="" />
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
		<van-action-sheet v-model="show" title="中国联通充值卡" :closeable="false" safe-area-inset-bottom>
			<div class="action-sheet-content">
				<div class="van-sidebar-content-header2">
					<div class="sola">
						单张面值
					</div>
					<div class="money">
						20
					</div>
					<div class="money2">
						￥19.7
					</div>
					<div class="fold">
						9.5折
					</div>
				</div>
				<div class="submit-way">提交方式</div>
				<van-tabs swipeable color="#2ecc71" background="#ffffff">
					<van-tab v-for="(item,index) in submitWay" :title="item.title" :key="index">
						<div class="form-card" v-if="show">
							<van-form @submit="onSubmit">
								<van-field v-model="cardnumber" name="卡号" label="卡号" :rules="[{ required: true, message: '请填写卡号' }]" :border="false" :colon="true" label-width="36" />
								<van-field v-model="password" type="password" name="密码" label="密码" :rules="[{ required: true, message: '请填写密码' }]" :border="false" :colon="true" label-width="36" />
								<div style="margin: 16px;">
									<van-button block type="primary" native-type="submit">提交</van-button>
								</div>
							</van-form>
						</div>
					</van-tab>
				</van-tabs>
			</div>
		</van-action-sheet>

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
	ActionSheet,
	Tab, Tabs,
	Form,
	Field,
	Button
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
		[ActionSheet.name]: ActionSheet,
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		[Form.name]: Form,
		[Field.name]: Field,
		[Button.name]: Button,
	},
	data() {
		return {
			cardnumber: '',
			password: '',
			submitWay:
				[{ id: 1, title: "单张提交" },
				{ id: 2, title: "批量提交" }],
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
		onSubmit(values) {
			console.log('submit', values);
		},
		handleRechargeClick(index) {
			this.rechargeCurrent = index
			this.show = true
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
	background: #f5f7fa;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	overflow-y: auto;
	.van-sidebar-content-header2 {
		width: 300px;
		height: 100px;
		margin: auto;
		background-color: #2ecc71;
		background-image: url("../assets/images/bg1.png");
		background-size: cover;
		border-radius: 10px;
		color: #fff;
		position: relative;
		.sola {
			font-size: 16px;
			font-family: Alibaba PuHuiTi-Bold, Alibaba PuHuiTi;
			position: absolute;
			left: 12px;
			top: 6px;
		}
		.money {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			font-weight: 600;
			font-size: 80px;
		}
		.money2 {
			position: absolute;
			right: 54px;
			bottom: 44px;
			font-family: DIN-Bold, DIN;
			font-size: 16px;
		}
		.fold {
			position: absolute;
			right: 58px;
			bottom: 24px;
			font-family: DIN-Bold, DIN;
			font-size: 16px;
		}
	}
	/deep/ .van-action-sheet__header {
		font-size: 20px;
		font-weight: 600;
	}
	.form-card {
		border: 1px solid #f0f0f0;
		border-radius: 10px;
		margin-top: 10px;
		padding-top: 16px;
	}
	.action-sheet-content {
		padding: 0 30px 36px;

		/deep/ .van-field__control {
			border: 1px solid #ccc;
		}
	}
	.submit-way {
		font-size: 16px;
		font-weight: 600;
		line-height: 40px;
		margin-top: 10px;
		margin-left: 8px;
	}
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
	/deep/ .van-tabs__nav {
		width: 150px;
	}
	/deep/ .van-button--block {
		border-radius: 10px;
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
			width: 252px;
			height: 84px;
			object-fit: cover;
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