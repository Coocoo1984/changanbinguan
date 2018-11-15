<template>
  <div>
    <preview static v-bind="previewData"></preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewData: {
        title: "2018-11-1 XXX采购计划",
        datas: [],
        status: "5个项目"
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
        content: "15KG"
      });
    }
  }
};
</script>
