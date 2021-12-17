<template>
  <div id="home">
    <keep-alive>
      <component :is="componentId" class="component"></component>
    </keep-alive>
    <van-tabbar
      v-model="active"
      :border="false"
      @change="onChange"
      active-color="#2ecc71"
    >
      <van-tabbar-item name="home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="search">
        <span>兑卡中心</span>
        <template #icon="props">
          <img :src="props.active ? center.active : center.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? my.active : my.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <div style="height: 43px"></div>
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
import home from "./home.vue";
import caCenter from "./car-center.vue";
import my from "./my.vue";
export default {
  name: "Home",
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name == "phone"||from.name =="withdrawal"||from.name =="certification" ||from.name =="password") {
        vm.onChange("my");
        vm.active = "my";
      }
    });
  },
  data() {
    return {
      componentId: home,
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

  //   watch: {
  //     $route(to, from) {
  // 		debugger
  //       if (from.name == "phone") {
  //         this.componentId = home;
  //       }
  //       console.log(from.path); //从哪来
  //       console.log(to.path); //到哪去
  //     },
  //   },
  mounted() {},

  methods: {
    // getPath() {
    //   console.log(this.$route.path);
    // },
    onChange(val) {
      switch (val) {
        case "search":
          this.componentId = caCenter;
          break;
        case "home":
          this.componentId = home;
          break;
        case "my":
          this.componentId = my;
          break;
        default:
          this.componentId = home;
      }
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
#home {
  width: 100%;
  height: 100%;
  .component {
    height: calc(100% - 45px);
  }
  .grid-text {
    font-size: 14px;
  }
  .card {
    width: 96%;
    height: 100px;
    display: flex;
    flex-direction: column;
    background: red;
    border-radius: 10px;
    margin: auto;
    font-size: 13px;
  }
}
</style>