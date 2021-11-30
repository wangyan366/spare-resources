<template>
	<div id="my">
		<van-nav-bar safe-area-inset-top :border="false" />
		<van-card desc="132525555" title="解忧1112" thumb="https://img01.yzcdn.cn/vant/cat.jpeg" />
		<div class="card">
			<div class="left">
				<div class="yuan">500000.55555
					<van-icon name="eye-o" class="icn" />
				</div>
				<div>账户余额（元）</div>
			</div>
			<div class="view">
				<span>查看</span>
			</div>
		</div>
	</div>
</template>

<script>
import { NavBar, Card, Icon } from 'vant';
export default {
	name: 'My',
	components: {
		[NavBar.name]: NavBar,
		[Card.name]: Card,
		[Icon.name]: Icon,
	},

	data() {
		return {

		};
	},

	mounted() {

	},

	methods: {

	},
};
</script>

<style lang="less" scoped>
#my {
	.card {
		font-size: 14px;
		width: 90%;
		background-image: url("../assets/images/bg2.png");
		background-color: #2ecc71;
		    background-size: cover;
		margin: auto;
		border-radius: 16px;
		color: #fff;
		display: flex;
		align-items: center;
		padding: 20px 0 20px 34px;
		box-sizing: border-box;
		margin-top: 30px;
		.left {
			flex: 1;
			.yuan {
				font-size: 26px;
				font-weight: 600;
				margin-bottom: 4px;
			}
			.icn {
				font-size: 22px;
				font-weight: 100;
			}
		}
		.view {
			width: 60px;
			text-align: left;
			span {
				display: inline-block;
				width: 100%;
				line-height: 30px;
				background: rgba(252, 252, 252, 0.3);
				text-align: center;
				border-radius: 30px 0 0 30px;
			}
		}
	}
}
/deep/ .van-card__title {
	line-height: 50px;
	font-size: 20px;
	height: 50px;
	max-height: 50px;
}
/deep/ .van-card__desc {
	color: #dedede;
	font-size: 14px;
}
/deep/ .van-card__thumb img {
	border-radius: 50%;
}
</style>