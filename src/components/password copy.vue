<template>
  <div id="password">
    <van-nav-bar
      title="密码管理"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />

    <div class="password">
      <van-form @submit="onSubmit">
        <span class="title">旧密码</span>
        <van-field
          v-model="value"
          placeholder="请输入原始密码 "
          :rules="[{ required: true, trigger: 'onBlur' }]"
          name="oldPassword"
        />
        <!-- <span class="bar"></span> -->
        <span class="title">新密码</span>
        <van-field
          v-model="newPassword"
          name="newPassword"
          placeholder="请设置密码，字母、数字、符号至少两种"
          :formatter="formatter"
          :error-message="errorText"
          :rules="[{ required: true, trigger: 'onBlur' }]"
        />
        <!-- <span class="bar"></span> -->
        <!-- <span class="title"></span> -->
        <span class="title">重复输入密码</span>
        <van-field
          v-model="newPassword1"
          name="newPassword1"
          placeholder="请设置密码，字母、数字、符号至少两种"
 
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <van-button type="primary" native-type="submit">提交</van-button>
        <van-button type="default" @click="onClickLeft">取消</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Field, Cell, CellGroup, Form, Toast } from "vant";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Phone",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Toast.name]: Toast,
  },
  data() {
    return {
      newPassword1: "",
      newPassword: "",
      value: "",
      errorText: "",
      errorText1: "",
      pattern: /\d{6}/,
    };
  },

  mounted() {
    this.setTabbarShow(false);
  },

  methods: {
        // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return val!== this.newPassword;
    },
    ...mapMutations(["setTabbarShow"]),
    phoneBlur(val) {
      console.log("🚀 ~ file: password.vue ~ line 67 ~ phoneBlur ~ val", val);
      if (this.newPassword1 !== this.newPassword) {
        this.errorText1 = "输入与上次不同";
      }
      this.errorText1 = "";
    },
    formatter(val) {
      //  修改密码   密码正则   /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$/       请输入字母、数字、符号至少两种组合的字符
      const reg =
        /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$/;

      if (!val) return "";
      // return reg.test(val);
      if (!reg.test(val)) {
        this.errorText = "请输入字母、数字、符号至少两种组合的字符";
      } else {
        this.errorText = "";
      }
      return val;
    },

    onSubmit(val) {
      console.log("🚀 ~ file: password.vue ~ line 57 ~ onSubmit ~ val", val);
    },
    onClickLeft() {
      if (this.$route.query.redirect) {
        this.$router.push({
          path: decodeURIComponent(this.$route.query.redirect),
        });
        this.setTabbarShow(true);
      }
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