<template>
  <div>
    <van-form validate-first @failed="onFailed">
      <div>必填</div>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            required: true,
            trigger: 'onBlur',
            message: '不能为空',
          },
          {
            pattern: /\d{6}/,
            message: '请填写6个数字',
            trigger: 'onBlur',
          },
        ]"
      />
      <!-- 通过 pattern 进行正则校验 -->
      <div>通过 pattern 进行正则校验</div>
      <van-field
        v-model="value1"
        name="pattern"
        placeholder="正则校验"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <div>通过 validator 进行函数校验</div>
      <van-field
        v-model="value2"
        name="validator"
        placeholder="函数校验"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <div>通过 validator 进行异步函数校验</div>
      <van-field
        v-model="value3"
        name="asyncValidator"
        placeholder="异步函数校验"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast, NavBar, Button,Form, Field, Cell, CellGroup } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Form.name]: Form,
  },
  data() {
    return {
      username: "",
      value1: "",
      value2: "",
      value3: "",
      pattern: /\d{6}/,
    };
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>

<style lang="less" scoped>
</style>