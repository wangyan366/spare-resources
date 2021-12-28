<template>
  <div id="home-index">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
      safe-area-inset-top
      :border="false"
    >
      <template #left>
        <div class="nav-bar-left">
          <div>Hello！</div>
          <div>让闲置资源更有价值</div>
        </div>
      </template>
      <template #right>
        <van-icon name="bell" size="18" dot color="#fff" />
      </template>
    </van-nav-bar>
    <div class="swipe">
      <van-swipe @change="onChange" :autoplay="3000">
        <van-swipe-item>
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" />
        </van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="mark">
      <van-grid :border="false" square class="grid">
        <van-grid-item @click="zhuceClick">
          <van-image :src="gridItem.zhuce" width="26" height="28" />
          <span class="grid-text">注册</span>
        </van-grid-item>
        <van-grid-item @click="certificationClick">
          <van-image :src="gridItem.renzheng" width="22" height="28" />
          <span class="grid-text">实名认证</span>
        </van-grid-item>
        <van-grid-item @click="tijiaokamiClick">
          <van-image :src="gridItem.tijiao" width="28" height="20" />
          <span class="grid-text">提交卡密</span>
        </van-grid-item>
        <van-grid-item @click="withdrawalClick">
          <van-image :src="gridItem.zhanghu" width="28" height="26" />
          <span class="grid-text">账户提现</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="card">
      <div class="card-header">
        <van-image :src="cardItem.component" width="66" height="16" />
        <van-image :src="cardItem.laba" width="15" height="15" />
      </div>
      <div class="card-top">
        <div class="text">{{ cardInfo.notice.title }}</div>
        <van-image :src="cardItem.you" width="10" height="10" />
      </div>
      <div class="card-content">
        <!-- <span class="label">天猫</span> -->
        <p>{{ cardInfo.notice.content }}</p>
        <span class="time">{{ cardInfo.notice.publishTimeLabel }}</span>
      </div>
    </div>
    <van-tabs
      swipeable
      color="#2ecc71"
      background="#f5f7fa"
      @click="onGridItemClick"
      v-model="vanActive"
    >
      <van-tab
        v-for="item in this.cardInfo.cardTypeList"
        :title="item.name"
        :key="item.id"
      >
      </van-tab>
    </van-tabs>
    <van-grid :border="false" :column-num="2" :gutter="12">
      <van-grid-item v-for="item in this.cardCategoryList" :key="item.index">
        <van-image :src="item.icon" height="100" fit="contain" />
        <template v-slot:error>加载失败</template>
      </van-grid-item>
    </van-grid>
    <div class="problem">
      <p>{{ this.cardInfo.faq.title }}</p>
      <div>{{ this.cardInfo.faq.content }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
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
  Toast,
} from "vant";
export default {
  name: "Home",
  components: {
    [Toast.name]: Toast,
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
      cardCategoryList: [],
      vanActive: 0,
      cardInfo: this.creatCardInfo(),
      active: 0,
      images: ["https://img01.yzcdn.cn/vant/apple-1.jpg"],
      gridItem: {
        zhuce: require("@/assets/images/zhuce.png"),
        renzheng: require("@/assets/images/renzheng.png"),
        tijiao: require("@/assets/images/tijiao.png"),
        zhanghu: require("@/assets/images/zhanghu.png"),
      },
      cardItem: {
        component: require("@/assets/images/component.png"),
        laba: require("@/assets/images/laba.png"),
        you: require("@/assets/images/you.png"),
      },
    };
  },

  mounted() {
    this.getHome()
      .then((res) => {
        this.cardInfo = res;
        this.cardCategoryList = res.cardCategoryList;
        console.log("🚀 ~ file: my.vue ~ line 63 ~ this.getHome ~ res", res);
      })
      .catch((err) => {
        console.log("🚀 ~ file: my.vue ~ line 65 ~ this.getHome ~ err", err);
      });
  },

  methods: {
    creatCardInfo() {
      return {
        faq: {
          title:"",
          content:"",
          },
          cardTypeList:[],
          notice:{
            "title":"",
            "content":"",
            "publishTimeLabel":"",
          }
      };
    },
    ...mapActions(["getHome", "listCardCategory"]),
    ...mapMutations(["getTabBarActive"]),
    gridClick(val) {
      console.log("🚀 ~ file: home.vue ~ line 166 ~ gridClick ~ val", val);
    },
    tijiaokamiClick() {
      this.getTabBarActive("center");
    },
    passwordClick() {
      this.$router.push({ path: "/password" });
    },
    certificationClick() {
      this.$router.push({ path: "/certification" });
    },
    withdrawalClick() {
      this.$router.push({ path: "/withdrawal" });
    },
    phoneClick() {
      this.$router.push({ path: "/phone" });
    },
    onGridItemClick(name, title) {
      let cardType = this.cardInfo.cardTypeList.find((m) => {
        return m.name == title;
      });
      this.listCardCategory({cardTypeId:cardType.id,limit: 4})
        .then((res) => {
          this.cardCategoryList = res;
          console.log(
            "🚀 ~ file: home.vue ~ line 170 ~ onGridItemClick ~ res",
            res
          );
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: home.vue ~ line 174 ~ onGridItemClick ~ err",
            err
          );
        });
    },
    onChange(index) {
      // Toast("当前 Swipe 索引：" + index);
    },
    zhuceClick() {
      console.log("522");
    },
    onClick(name, title) {
      console.log("🚀 ~ file: home.vue ~ line 135 ~ onClick ~ name", name);
      console.log("🚀 ~ file: home.vue ~ line 135 ~ onClick ~ title", title);
    },
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
/deep/ .van-nav-bar__content {
  background: rgba(46, 204, 113, 1);
  color: #fff;
}
/deep/ .van-swipe {
  height: 100%;
}
.problem {
  box-shadow: 0 1px 6px#eee;
  width: 94%;
  // height: 70px;
  margin: 0 auto;
  margin-top: 31px;
  box-sizing: border-box;
  font-size: 14px;
  background: #fff;
  padding: 6px 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  p {
    line-height: 28px;
    height: 28px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  div {
    color: #ccc;
    font-size: 12px;
    word-break: break-all;
    width: 100%;
    overflow: hidden;
  }
}
.swipe {
  background: rgba(46, 204, 113, 1);
  position: relative;
  box-sizing: border-box;
  height: 160px;
}
.swipe img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  height: 132px;
  object-fit: cover;
  width: 95%;
  border-radius: 14px;
}
.nav-bar-left {
  text-align: left;
  margin-top: 6px;
}
.nav-bar-left :first-child {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 2px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.nav-bar-left :nth-child(2) {
  font-size: 16px;
  font-weight: 400;
}
#home-index {
  background: #f5f7fa;
  height: 100%;
  overflow-x: auto;
}
.grid-text {
  font-size: 14px;
  font-weight: 500;
  margin-top: 6px;
}
.card {
  // margin: 0 10px;
  width: 94%;
  // height: 70px;
  margin: 0 auto;
  margin-top: 31px;
  box-sizing: border-box;
  font-size: 14px;
  background: #fff;
  padding-top: 6px;
  border-radius: 8px;
  .card-content {
    display: flex;
    align-items: center;
    height: 46px;
    border-bottom: 1px solid #f3f3f3;
  }
  .card-content p {
    word-break: break-all;
  }
  .card-content:nth-child(1) {
    border-bottom: 1px solid #f3f3f3;
  }
  .card-header {
    line-height: 28px;
    height: 28px;
    padding-left: 7px;
  }
  .card-top {
    line-height: 18px;
    height: 18px;
    background: #2ecc71;
    font-size: 12px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 100%;
    .text {
      flex: 1;
      transform: scale(0.94);
    }
    /deep/ .van-image {
      margin-right: 14px;
    }
  }
  .label {
    color: #fff;
    background: #2ecc71;
    padding: 0 6px;
    font-size: 12px;
    line-height: 18px;
    margin-left: 8px;
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
    margin-right: 16px;
  }
}

.grid {
  background: #f5f7fa;
  width: 94%;
  background: #f5f7fa;
  width: 94%;
  border-radius: 8px;
  margin: auto;
}
.mark {
  width: 100%;
  position: relative;
}
.mark::before {
  content: "";
  width: 100%;
  height: 50%;
  background: #2ecc71;
  display: block;
  position: absolute;
  top: 0px;
}
/deep/ .van-tab .van-tab__text {
  font-weight: 600;
}
/deep/ .van-tabs {
  background: #f5f7fa;
  padding-top: 20px;
  padding-bottom: 10px;
}
/deep/ .van-tab__pane {
  padding-top: 20px;
}
/deep/ .grid {
  box-shadow: 0 1px 6px#84f1b2;
}
/deep/ .grid .van-grid-item:nth-child(1) .van-grid-item__content {
  border-radius: 8px 0 0 8px;
}
/deep/ .grid .van-grid-item:nth-child(4) .van-grid-item__content {
  border-radius: 0px 8px 8px 0;
}
</style>