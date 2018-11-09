<template>
  <div>
    <preview static v-bind="previewData"></preview>
    <div v-if="status=='1'" class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:">确认计划</a>
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
        status: ""
      }
    };
  },
  computed: {
    status() {
      return this.$route.query["status"];
    }
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
