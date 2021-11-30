
<template>
	<div class="online">
		<van-image :src="img" />
	</div>
</template>

<script>
import {

	Image as VanImage,

} from "vant";
export default {
	name: "Online",
	components: {
		[VanImage.name]: VanImage,
	},
	data() {
		return {
			img: require("@/assets/images/header.png")
		};
	},
	mounted() {
		setTimeout(() => {
			this.$router.push({ path: "/home" }); // 强制切换当前路由 path
		}, 3000);
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.online{
  width: 100%;
  height: 100%;
  position: relative;
}
.deep/ .van-image{
    position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align: center;
}
</style>
