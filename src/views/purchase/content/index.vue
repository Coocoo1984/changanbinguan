<template>
  <div>
    <preview static :datas="datas" :title="title" :status="count"></preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: []
    };
  },
  computed: {
    id() {
      return this.$route.query["id"];
    },
    title() {
      return this.$route.query["title"];
    },
    count() {
      return this.$route.query["count"] + "个项目";
    }
  },
  methods: {
    load() {
      this.$GET("PurchasingPlanDetail?purchasingPlanId=" + this.id).then(r => {
        this.datas = r.data.map(i => {
          return {
            title: i.goods_name,
            content: i.count + i.goods_unit_name
          };
        });
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>
