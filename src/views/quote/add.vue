<template>
  <div>
    <preview v-bind="previewData"></preview>
    <w-form ref="form" @change="change" form-title="报价" :form-items="formItems"></w-form>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">确定</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewData: {
        title: "2018-11-1 XXX采购计划",
        datas: [],
        status: "等待报价",
        show: true
      },
      previewInfo: {
        title: "XXX商家信息",
        status: "",
        datas: [
          {
            title: "收货地址",
            content: "了科技撒赖打开发了深刻搭街坊"
          }
        ]
      },
      formItems: []
    };
  },
  methods: {
    change(item) {
      console.log(item);
    },
    submit() {}
  },
  mounted() {
    for (var i = 0; i < 5; i++) {
      this.previewData.datas.push({
        title: "商品1",
        content: "1KG "
      });
      this.formItems.push({
        type: "1",
        title: "商品1",
        name: "apple",
        default: 0,
        placeholder: "输入价格",
        unit: "元",
        disabled: true
      });
    }
  }
};
</script>

<style>
</style>
