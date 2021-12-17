<template>
  <div id="certification">
    <van-nav-bar
      title="实名认证"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="certification">
      <span class="title">真实姓名</span>
      <van-field v-model="value" placeholder="请填写您本人的真实姓名 " />
      <!-- <span class="bar"></span> -->
      <span class="title">真实姓名</span>
      <van-field v-model="value" placeholder="请填写您本人的真实姓名" />
      <!-- <span class="bar"></span> -->
      <!-- <span class="title"></span> -->
      <van-button type="primary">提交</van-button>
      <van-button type="default">取消</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Field, Cell, CellGroup } from "vant";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      value: "",
    };
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.push({ path: "/index" }); //返回上一层
    },
  },
};
</script>

<style lang="less" scoped>
#certification {
  position: relative;
  width: 100%;
  height: 100%;
}
/deep/ .van-nav-bar__content {
  background: rgba(44, 193, 107, 1);
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
/deep/ .van-button--normal {
  width: 86%;

  // text-align: center;
}
.van-button--primary {
  background: rgba(224, 224, 224, 1);
  border-color: rgba(224, 224, 224, 1);
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0%);
}
.van-button--default {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, 0%);
  color: rgba(224, 224, 224, 1);
}
.certification {
  padding: 20px 10px;
  box-sizing: border-box;
  .title {
    font-size: 14px;
    color: #333333;
    // margin-top: 20px;
    padding: 2.667vw 4.267vw;
  }
  .bar {
    display: inline-block;
    width: 100%;
    height: 1px;
    background: rgba(51, 51, 51, 0.1);
  }
}
</style>