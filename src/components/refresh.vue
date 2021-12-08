<template>
  <div></div>
</template>

<script>
export default {
  name: "refresh",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  // refresh.vue
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$router.replace(from.fullPath);
    });
  },
};
</script>

<style lang="less" scoped>
</style>