<template>
  <div id="password">
    <van-nav-bar
      title="密码管理"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="password">
      <span class="title">旧密码</span>
      <van-field v-model="value" placeholder="请输入原始密码 " />
      <!-- <span class="bar"></span> -->
      <span class="title">新密码</span>
      <van-field v-model="value" placeholder="请设置密码，长度6-20位" :rules="[{ required: true }]"/>
      <!-- <span class="bar"></span> -->
      <!-- <span class="title"></span> -->
      <span class="title">新密码</span>
      <van-field v-model="value" placeholder="请设置密码，长度6-20位" />
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
#password {
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
}
.van-button--default {
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, 0%);
  color: rgba(224, 224, 224, 1);
}
.password {
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