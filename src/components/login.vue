<template>
  <div class="loginBox">
    <div class="title">
      <span>登录</span>
    </div>
    <div class="banner">
      <div class="login">
        <van-form>
          <van-field
            v-model="username"
            name="用户名"
            placeholder="用户名"
            :rules="[{ required: true }]"
            id="nameBlur"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            placeholder="请填写登录密码"
            id="passwordBlur"
            :rules="[{ required: true }]"
            v-on:input="inputFunc"
          />
          <p class="error-info" v-show="errorInfoShow">*密码输入错误</p>
          <div class="submit-button" @click="loginClick">登录</div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { Field, Form, Toast } from "vant";
import { get, post } from "../request/http";
export default {
  components: {
    [Field.name]: Field,
    [Form.name]: Form,
    [Toast.name]: Toast,
  },
  data() {
    return {
      password: "",
      username: "",
      groupId: "",
      errorInfoShow: false,
      _ngx: "",
      hideshow: true, //显示或者隐藏footer,
      loginTime: "",
      Autologon: true,
    };
  },
  watch: {},
  mounted() {
    //监听事件
  },
  methods: {
    ...mapMutations(["changeLogin"]),
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
      var new_obj = {
        captcha: "",
        username: this.username,
        password: this.password,
        target: "WEB_UI",
        groupId: this.groupId,
      };
      this.$ajax({
        method: "post",
        url: this._ngx + "/v1/token",
        data: new_obj,
      })
        .then((res) => {
          // 储存vuex和localStorage
          this.changeLogin(res.data);
        })
        .catch((error) => {
          this.$toast(error.message);
          if (error.message == "用户名或密码错误") {
            this.errorInfoShow = true;
          }
        });
    },
  },
};
</script>

<style scoped="scoped" lang="less">
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
      margin-top: 10px;
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
  margin-top: 15px;

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
</style>
