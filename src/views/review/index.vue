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
  mounted() {
    this.list.push({
      title: "2018-11-1",
      link: "content",
      slot: "等待提交",
      status: "提交供货商"
    });
    this.list.push({
      title: "2018-11-1",
      link: "content",
      slot: "待报价",
      status: ""
    });
    this.list.push({
      title: "2018-11-1",
      link: "content",
      slot: "已报价",
      status: "确认计划"
    });
    for (var i = 0; i < 3; i++) {
      this.list.push({
        title: "2018-11-1" + i,
        link: "content",
        slot: "已完成"
      });
    }
  },
  methods: {
    click(item) {
      this.$router.push({
        path: "/review/list",
        query: { status: item.status }
      });
    }
  }
};
</script>