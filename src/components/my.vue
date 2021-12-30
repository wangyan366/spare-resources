<template>
  <div id="my">
    <van-nav-bar safe-area-inset-top :border="false" />
    <div style="background: #fff; padding-bottom: 10px">
      <van-card
        :desc="userInfo.mobileLabel"
        :title="userInfo.realName"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="card">
        <div class="left">
          <div class="yuan">
            {{ userInfo.balance }}
            <van-icon name="eye-o" class="icn" />
          </div>
          <div>账户余额（元）</div>
        </div>
        <!-- <div class="view">
          <span>查看</span>
        </div> -->
      </div>
    </div>

    <div class="my-down">
      <div class="down-card" @click="certificationClick">
        <div class="pic"></div>
        <span>实名认证</span>
      </div>
      <div class="down-card" @click="passwordClick">
        <div class="pic"></div>
        <span>修改密码</span>
      </div>
      <div class="down-card" @click="phoneClick">
        <div class="pic"></div>
        <span>更换手机</span>
      </div>
      <div class="down-card" @click="withdrawalClick">
        <div class="pic"></div>
        <span>提现记录</span>
      </div>
      <div class="down-card" @click="maikaClick">
        <div class="pic"></div>
        <span>卖卡记录</span>
      </div>
    </div>
    <div style="height: 43px"></div>
  </div>
</template>

<script>
import { NavBar, Card, Icon, Toast } from "vant";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "My",
  components: {
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },

  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState({
      userId: "userId", // 第一种写法
    }),
  },
  mounted() {},

  methods: {
    ...mapActions(["getMy"]),
    maikaClick() {
      this.$router.replace({
        path: "/maikapage",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    passwordClick() {
      this.$router.replace({
        path: "/password",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });

    },
    certificationClick() {
      this.$router.replace({
        path: "/certification",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    withdrawalClick() {
      this.$router.replace({
        path: "/withdrawal",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    phoneClick() {
      this.$router.replace({
        path: "/phone",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.userId == "") {
        vm.$router.replace({
          path: "/login",
          query: {
            redirect: vm.$router.currentRoute.fullPath,
          },
        });
        return;
      }
      vm.getMy()
        .then((res) => {
          vm.userInfo = res;
          console.log("🚀 ~ file: my.vue ~ line 63 ~ this.getMy ~ res", res);
        })
        .catch((err) => {
          console.log("🚀 ~ file: my.vue ~ line 65 ~ this.getMy ~ err", err);
        });
      next();
    });
  },
};
</script>

<style lang="less" scoped>
#my {
  background: rgba(245, 247, 250, 1);
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
  .down-card {
    width: 166px;
    height: 90px;
    background-color: #ffffff;
    border-radius: 10px 10px 10px 10px;
    // margin: auto;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    .pic {
      width: 40px;
      height: 40px;
      margin-right: 16px;
      margin-left: 20px;
    }
  }
  .my-down {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 16px;
  }
  .down-card:nth-child(1) {
    background-image: url("../assets/images/Component4.png");
    background-size: cover;
  }
  .down-card:nth-child(1) .pic {
    background-image: url("../assets/images/Group1.png");
    background-size: cover;
  }
  .down-card:nth-child(2) {
    background-image: url("../assets/images/Component1.png");
    background-size: cover;
  }
  .down-card:nth-child(2) .pic {
    background-image: url("../assets/images/Group2.png");
    background-size: cover;
  }
  .down-card:nth-child(3) {
    background-image: url("../assets/images/Component2.png");
    background-size: cover;
  }
  .down-card:nth-child(3) .pic {
    background-image: url("../assets/images/Group3.png");
    background-size: cover;
  }
  .down-card:nth-child(4) {
    background-image: url("../assets/images/Component3.png");
    background-size: cover;
  }
  .down-card:nth-child(4) .pic {
    background-image: url("../assets/images/Group4.png");
    background-size: cover;
  }
  .down-card:nth-child(5) {
    background-image: url("../assets/images/Component5.png");
    background-size: cover;
  }
  .down-card:nth-child(5) .pic {
    background-image: url("../assets/images/Group4.png");
    background-size: cover;
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