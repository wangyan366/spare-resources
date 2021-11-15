<template>
  <div id="car-center">
    <div class="car-center-header">
      <van-image
        src="https://img01.yzcdn.cn/vant/apple-1.jpg"
        width="30"
        height="30"
      />
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          safe-area-inset-top
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </form>
    </div>
    <van-sidebar v-model="activeKey" @change="onChange">
      <van-sidebar-item title="标签名1" />
      <van-sidebar-item title="标签名2" />
      <van-sidebar-item title="标签名3" />
    </van-sidebar>
    <div class="van-sidebar-content">
      <div>1111</div>
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item title="标签名1" />
        <van-sidebar-item title="标签名2" />
        <van-sidebar-item title="标签名3" />
      </van-sidebar>
    </div>
  </div>
</template>

<script>
import { Search, NavBar, Image, Sidebar, SidebarItem, Notify } from "vant";
export default {
  name: "carCenter",
  components: {
    [Search.name]: Search,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Notify.name]: Notify,
  },
  data() {
    return {
      value: "",
      activeKey: 0,
    };
  },

  mounted() {},

  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onSearch(val) {
      console.log("🚀 ~ file: car-center.vue ~ line 30 ~ val", val);
    },
    onCancel(val) {
      console.log("🚀 ~ file: car-center.vue ~ line 33 ~ val", val);
    },
  },
};
</script>

<style lang="less" scoped>
#car-center {
  //   width: 100%;
  //   height: 100%;
  .car-center-header {
    display: flex;
    align-items: center;
    form {
      flex: 1;
    }
  }
  .van-sidebar {
    float: left;
  }
  .van-sidebar-content {
    float: left;
  }
}
</style>