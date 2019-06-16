<template>
  <preview style="margin-top:10px" static :title="'退货项目（'+goods.length+'）：'" :datas="goods"></preview>
</template>

<script>
export default {
  data() {
    return {
      goods: []
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    load() {
      this.$loading(true);
      this.$GET("ChargeBackDetailList?ChargeBackID=" + this.id).then(r => {
        this.goods = r.data.map(i => {
          return {
            title: i.goods_name,
            content: i.count + i.goods_unit_name
          };
        });
        this.notPer = true;
        this.$loading(false);
      });
    }
  },
  mounted(){
      this.load();
  }
};
</script>

<style>
</style>
