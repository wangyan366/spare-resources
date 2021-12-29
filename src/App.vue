<template>
  <div id="app">
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top /> -->
    <!-- <div v-if="!network" class="network">
      <h3>我没网了</h3>
      <div @click="onRefresh">刷新</div>
    </div> -->
    <router-view />
    <van-tabbar
      v-model="active"
      :border="false"
      active-color="#2ecc71"
      v-show="tabbarShow"
      safe-area-inset-bottom
      @change="tabbarChange"
    >
      <van-tabbar-item name="home" replace to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="carCenter" replace to="/carCenter">
        <span>兑卡中心</span>
        <template #icon="props">
          <img :src="props.active ? center.active : center.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my" replace to="/my">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? my.active : my.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 开启底部安全区适配 -->
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
  </div>
</template>

<script>
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
} from "vant";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
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
    //  'van-lazyload': Lazyload
  },
  data() {
    return {
      // componentId: home,
      active: "home",
      home: {
        active: require("@/assets/images/bar/home-page-tri.png"),
        inactive: require("@/assets/images/bar/home-page.png"),
      },
      center: {
        active: require("@/assets/images/bar/center-tri.png"),
        inactive: require("@/assets/images/bar/center.png"),
      },
      my: {
        active: require("@/assets/images/bar/my-tri.png"),
        inactive: require("@/assets/images/bar/my.png"),
      },
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  computed: {
    ...mapState(["tabbarShow"]),
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.query.active) {
          this.active = val.query.active
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    tabbarChange(val) {},
    // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
    onRefresh() {
      // this.$router.replace("/refresh");
    },
  },
};
</script>

<style>
.network {
  text-align: center;
  margin: 100px auto;
}
.network h3 {
  font-size: 26px;
}
.network div {
  background: #2ecc71;
  padding: 10px 60px;
  color: #fff;
  display: inline-block;
  border-radius: 8px;
  margin-top: 30px;
  font-size: 16px;
  cursor: pointer;
}
#app {
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
}
</style>
