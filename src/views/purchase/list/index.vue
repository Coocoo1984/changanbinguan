<template>
  <cells :datas="list" @item-click="click"></cells>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    click(item) {
      this.$router.push({
        path: "/purchase/" + item.link,
        query: {
          status: item.status
        }
      });
    }
  },
  mounted() {
    this.list.push({
      title: "2018-11-1 XX采购计划",
      link: "content",
      slot: "进行中",
      status: "1"
    });
    for (var i = 0; i < 12; i++) {
      this.list.push({
        title: "2018-11-1 XX采购计划" + i,
        link: "content",
        slot: "已完成"
      });
    }
  }
};
</script>