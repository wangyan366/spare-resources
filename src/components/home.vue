<template>
  <div>
    <component :is="componentId"></component>
    <van-tabbar v-model="active" :border="false" @change="onChange">
      <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
    </van-tabbar>
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
import index1 from "./index.vue";
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
      componentId: index1,
      active: "home",
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },

  mounted() {},

  methods: {
    onChange(val) {
    console.log("🚀 ~ file: home.vue ~ line 60 ~ onChange ~ index", index)
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
</style>