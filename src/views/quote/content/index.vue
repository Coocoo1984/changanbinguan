<template>
  <div>
    <preview v-bind="previewData"></preview>
    <preview static v-bind="previewInfo"></preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewData: {
        title: "2018-11-1 XXX采购计划",
        datas: [],
        status: "已报价",
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
      }
    };
  },
  mounted() {
    for (var i = 0; i < 5; i++) {
      this.previewData.datas.push({
        title: "商品1",
        content: "1KG  报价：$100 已验收"
      });
    }
  }
};
</script>
