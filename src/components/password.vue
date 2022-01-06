<template>
  <div id="password">
    <van-nav-bar
      title="密码管理"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />

    <div class="password">
      <van-form @submit="onSubmit" scroll-to-error show-error-message>
        <span class="title">原登录密码</span>
        <van-field
          v-model="oldPassword"
          placeholder="请输入原始密码 "
          :rules="[
            {
              required: true,
              trigger: 'onBlur',
            },
          ]"
          name="oldPassword"
        />
        <!-- <span class="bar"></span> -->
        <span class="title">新登录密码</span>
        <van-field
          v-model="newPassword"
          name="newPassword"
          placeholder="请设置密码，字母、数字、符号至少两种"
          :formatter="formatter"
          :error-message="errorText"
          :rules="[{ required: true, trigger: 'onBlur' }]"
          right-icon="eye"
          :type="!passwordStatus ? 'password' : 'text'"
          @click-right-icon="passwordStatus = !passwordStatus"
        />
        <!-- <span class="bar"></span> -->
        <!-- <span class="title"></span> -->
        <span class="title">确认新密码</span>
        <van-field
          v-model="newPassword1"
          name="newPassword1"
          placeholder="请设置密码，字母、数字、符号至少两种"
          :error-message="errorText1"
          :rules="[{ validator: validatornewPassword1, trigger: 'onBlur' }]"
        />
        <p class="explain">由字母加数字或符号至少两种以上字符组成的6-20位半角字符，区分大小写</p>
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
      oldPassword: "",
      errorText: "",
      errorText1: "",
      passwordStatus: false,
    };
  },

  mounted() {
    this.setTabbarShow(false);
  },

  methods: {
    validatornewPassword1(val) {
      if (!val) return true;
      if (val !== this.newPassword) {
        this.errorText1 = "重复输入密码错误";
        return false;
      }
      this.errorText1 = "";
      return true;
    },

    ...mapActions(["updatePassword"]),
    ...mapMutations(["mapActions"]),
    formatter(val) {
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
      if (!this.oldPassword || this.oldPassword == "") {
        Toast.fail("请填写原始密码");
        return;
      }
      if (!this.newPassword || this.newPassword == "") {
        Toast.fail("请填写新密码");
        return;
      }
      if (!this.newPassword1 || this.newPassword1 == "") {
        Toast.fail("请重复输入密码");
        return;
      }
      if (this.newPassword1 !== this.newPassword) {
        this.errorText1 = "重复输入密码错误";
        Toast.fail("重复输入密码错误");
        return;
      }
      let newObj = {
        oldPassword: val.oldPassword,
        newPassword: val.newPassword,
      };
      this.updatePassword(newObj).then((res) => {
        Toast.success("修改成功，请重新登录");
        this.$router.push({
          path: "/login",
        });
      });
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
  .explain {
  font-size: 12px;
  color: #333;
  margin-top: 20px;
  background: #eee;
  padding: 6px;
}
}
</style>