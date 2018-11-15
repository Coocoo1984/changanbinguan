<template>
  <div>
    <preview static v-bind="total"></preview>
    <cells :datas="list" @item-click="click"></cells>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:">{{btn}}</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: {
        title: "总计",
        datas: [],
        status: ""
      },
      list: [
        {
          title: "XXX采购",
          slot: "供货商：LLL",
          link: "1"
        }
      ]
    };
  },
  computed: {
    btn() {
      return this.$route.query["status"];
    }
  },
  methods: {
    click(item) {
      this.$router.push("/review/list/" + item.link);
    }
  },
  mounted() {
    console.log(this.btn);
    for (var i = 0; i < 10; i++) {
      this.total.datas.push({
        title: "商品1",
        content: "555KG  报价：$100 已验收"
      });
    }
  }
};
</script>