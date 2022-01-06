<template>
  <div class="loginBox">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <div class="banner">
      <div class="login">
        <van-form @submit="loginClick">
          <van-field
            v-model="username"
            name="用户名"
            placeholder="用户名"
            :rules="[{ required: true }]"
            id="nameBlur"
          />
          <van-field
            v-model="password"
            name="密码"
            placeholder="请填写登录密码"
            right-icon="eye"
            :type="!passwordStatus ? 'password' : 'text'"
            @click-right-icon="passwordStatus = !passwordStatus"
            id="passwordBlur"
            :rules="[{ required: true }]"
            v-on:input="inputFunc"
          />

          <van-field
            v-model="verifyCode"
            name="验证码"
            placeholder="请填写验证码"
            :rules="[{ required: true }]"
          />
          <img
            class="capchaImg"
            :src="captchaSrc"
            @click.stop="getCaptchaSrc()"
          />
          <!-- <span @click.stop="getCaptchaSrc()" class="barter">换一张</span> -->
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { Field, Form, Toast, NavBar, Button } from "vant";
import base from "@/api/base.js"; // 导入接口域名列表
import axios from "axios";
export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      time: "",
      captchaSrc: "",
      verifyCode: "",
      password: "",
      username: "",
      passwordStatus: false,
    };
  },
  watch: {},
  mounted() {
    this.setTabbarShow(false);
    //监听事件
    this.getCaptchaSrc();
  },
  methods: {
    onClickLeft() {
      if (this.$route.query.redirect && this.$route.query.redirect != "/my") {
        this.$router.push({
          path: decodeURIComponent(this.$route.query.redirect),
        });
        this.setTabbarShow(true);
      } else {
        this.$router.push({
          path: "/home",
          query: {
            redirect: this.$router.currentRoute.fullPath,
            active: "home",
          },
        });
      }
    },
    // 获取图片验证码
    getCaptchaSrc() {
      // 也可以处理图片
      this.time = new Date().getTime();
      this.captchaSrc = `${base.VUE_APP_BASE_API}/voucher/login/randImage.do?time=${this.time}`;
    },
    ...mapMutations(["changeLogin", "setTabbarShow"]),
    ...mapActions(["login"]),
    inputFunc() {
      if (!this.password || this.password == "") {
        this.errorInfoShow = false;
      }
    },

    loginClick(values) {
      if (!this.username || this.username == "") {
        Toast.fail("请填写账号");
        return;
      }
      if (!this.password || this.password == "") {
        Toast.fail("请填写密码");
        return;
      }
      if (!this.verifyCode || this.verifyCode == "") {
        Toast.fail("请填写验证码");
        return;
      }
      var new_obj = {
        abc: this.username,
        def: this.password,
        time: this.time,
        verifyCode: this.verifyCode,
      };
      let that = this;
      this.login(new_obj)
        .then((response) => {
          console.log(
            "🚀 ~ file: login.vue ~ line 108 ~ .then ~ response",
            response
          );
          Toast.loading({
            message: "登陆中...",
            forbidClick: true,
          });
          this.setTabbarShow(true);
          that.changeLogin(response.userId);
          if (that.$route.query.redirect) {
            that.$router.push({
              path: decodeURIComponent(that.$route.query.redirect),
            });
          } else {
            that.$router.push({
              path: "/home",
            });
          }
        })
        .catch((err) => {
          this.getCaptchaSrc();
        });
    },
  },
};
</script>

<style scoped="scoped" lang="less">
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
.capchaImg {
  border: 1px solid #ccc;
  position: relative;
  right: -95px;
  top: -43px;
}
.title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;

  span {
    color: #111111;
    font-size: 18px;
    line-height: 25px;
    font-weight: 500;
    font-family: PingFang Medium;
  }
}

.banner {
  height: 235px;
  width: 100%;
  //   background-image: url('../../assets/login1.png');
  background-size: 100% 100%;
  margin-top: 130px;
}

.banner-title {
  text-align: center;
  width: 77.33%;
  line-height: 30px;
  padding-top: 29px;
  padding-bottom: 25px;
  margin: 0 auto;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  span {
    font-size: 20px;
    color: #111111;
    font-family: PingFang Medium;
    font-weight: bold;
    line-height: 30px;
    display: block;
    overflow: hidden;
  }
}

.login {
  position: relative;
  width: 88%;
  height: 283px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 1px 10px 0px rgba(137, 175, 234, 0.25);

  .error-info {
    color: #2ecc71;
    margin-top: 5px;
    line-height: 16px;
    font-size: 12px;
    text-align: left;
  }

  form {
    width: 85%;
    padding-top: 25px;
    padding-left: 25px;
    text-align: center;

    > div {
      background-color: #f5f5f5;
    }

    > div:nth-child(2) {
      margin: 10px 0;
    }
  }
}

.submit-button {
  width: 100%;
  background: #2ecc71 !important;
  color: #ffffff;
  border-radius: 3px;
  line-height: normal;
  font-size: 16px;
  padding: 11px 0px;
  // margin-top: 15px;

  span {
    font-size: 16px;
    font-weight: 400;
    font-family: PingFang Regular;
  }
}

.type-phone {
  margin-top: 20px;
  font-size: 14px;
  color: #111111;
  font-weight: 400;
  font-family: PingFang Regular;
}

.agree {
  margin: 0 auto;
  position: absolute;
  bottom: 30px;
  width: 100%;

  p {
    margin: 0 auto;
    width: 75%;
    line-height: 18px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    font-family: PingFang Regular;

    span {
      color: #2ecc71;
    }
  }
}

.autologon {
  margin-top: 25px;
  background: #fff !important;
  text-align: left;
}

.autologon img {
  width: 15px;
  height: 15px;
  vertical-align: -2px;
}

.autologon span {
  font-size: 12px;
  color: #111111;
}
/deep/ .van-cell:nth-child(3) {
  width: 65%;
}
</style>
