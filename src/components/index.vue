<template>
	<div id="home-index">
		<van-nav-bar @click-left="onClickLeft" @click-right="onClickRight" safe-area-inset-top :border="false">
			<template #left>
				<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" width="124" height="48" />
			</template>
			<template #right>
				<van-icon name="bell" size="18" dot color="#000000" />
			</template>
		</van-nav-bar>
		<div class="swipe">
			<van-swipe :autoplay="3000" height="140">
				<van-swipe-item v-for="(image, index) in images" :key="index">
					<van-image :src="image" fit="contain" width="100%" height="100%" />
				</van-swipe-item>
			</van-swipe>
		</div>

		<van-grid :border="false" square class="grid">
			<van-grid-item>
				<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" width="68" height="68" />
				<span class="grid-text">注册</span>
			</van-grid-item>
			<van-grid-item>
				<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" width="68" height="68" />
				<span class="grid-text">实名认证</span>
			</van-grid-item>
			<van-grid-item>
				<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" width="68" height="68" />
				<span class="grid-text">提交卡密</span>
			</van-grid-item>
			<van-grid-item>
				<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" width="68" height="68" />
				<span class="grid-text">账户提现</span>
			</van-grid-item>
		</van-grid>
		<div class="card">
			<div class="logo">
				<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" width="38" height="100%" />
			</div>
			<span class="label">天猫</span>
			<p>天猫超市...天猫超市天猫超市天猫超市天猫超市天猫超市..</p>
			<span class="time">2021-10-25</span>
		</div>
		<van-tabs swipeable color="#2ecc71" background="#f5f7fa">
			<van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
				<van-grid :border="false" :column-num="2" :gutter="12">
					<van-grid-item>
						<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" height="100" fit="contain" />
					</van-grid-item>
					<van-grid-item>
						<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" height="100" fit="contain" />
					</van-grid-item>
					<van-grid-item>
						<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" height="100" fit="contain" />
					</van-grid-item>
					<van-grid-item>
						<van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" height="100" fit="contain" />
					</van-grid-item>
				</van-grid>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import {
	NavBar,
	Icon,
	Swipe,
	SwipeItem,
	Lazyload,
	Image as VanImage,
	Grid,
	GridItem,
	Tabbar,
	TabbarItem,
	Tab,
	Tabs,
	Badge,
} from "vant";
export default {
	name: "Home",
	components: {
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		[NavBar.name]: NavBar,
		[Icon.name]: Icon,
		[Swipe.name]: Swipe,
		[SwipeItem.name]: SwipeItem,
		[VanImage.name]: VanImage,
		[Lazyload.name]: Lazyload,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem,
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem,
		[Badge.name]: Badge,
		//  'van-lazyload': Lazyload
	},
	data() {
		return {
			active: 0,
			images: [
				"https://img01.yzcdn.cn/vant/apple-1.jpg",
			],
		};
	},

	mounted() { },

	methods: {
		onClickLeft() {
			Toast("返回");
		},
		onClickRight() {
			Toast("按钮");
		},
	},
};
</script>

<style lang="less" scoped>
#home-index {
	background: #f5f7fa;
	height: 100%;
}
.grid-text {
	font-size: 12px;
	font-weight: 600;
	margin-top: 6px;
}
.card {
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	padding: 0 12px;
	box-sizing: border-box;
	font-size: 14px;
	background: #fff;
	padding-top: 20px;
	.label {
		color: #fff;
		background: #2ecc71;
		padding: 0 6px;
		font-size: 12px;
		line-height: 18px;
		margin-left: 18px;
		margin-right: 8px;
		border-radius: 4px;
	}
	p {
		flex: 1;
		font-weight: 600;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.time {
		font-size: 14px;
		color: #e6e6e6;
	}
}
.swipe {
	padding-top: 20px;
	background: #fff;
}
.grid {
	padding-top: 20px;
	background: #fff;
}
/deep/ .van-tab .van-tab__text {
	font-weight: 600;
}
/deep/ .van-tabs {
	background: #f5f7fa;
	padding-top: 20px;
}
/deep/ .van-tab__pane {
	padding-top: 20px;
}
/deep/ .van-grid-item__content {
	border-radius: 8px;
}
</style>