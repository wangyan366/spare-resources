<template>
  <div id="home">
    <keep-alive>
      <component :is="componentId" class="component"></component>
    </keep-alive>

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
import { mapMutations, mapActions, mapState } from "vuex";
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

  computed: {
  
  },
  watch: {
    tabBarActivewatcher: {
      immediate: true,
      handler: function (newval) {
        this.onChange(newval);
        this.active=newval
        console.log("🚀 ~ file: index.vue ~ line 108 ~ newval", newval);
      },
    },
  },

  mounted() {},

  methods: {
    // getPath() {
    //   console.log(this.$route.path);
    // },
    onChange(val) {
      switch (val) {
        case "center":
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