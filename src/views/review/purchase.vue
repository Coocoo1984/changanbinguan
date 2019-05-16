<template>
  <div>
    <purchase-list @click="click" :datas="datas"></purchase-list>
    <v-scroll :load="load" :busy="busy" :not-data="page>1&&datas.length<=0" :more="more"></v-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
      busy: false,
      datas: [],
      more: true
    };
  },

  props: {
    state: {
      type: [Number, String]
    }
  },
  watch: {
    state() {
      console.log(this.state);
      this.page = 0;
      this.datas = [];
      this.busy = false;
      this.load();
    }
  },
  methods: {
    click(item) {
      this.$router.push({
        path: "/adm/purchase/item",
        query: {
          id: item.id,
          status: this.state,
          planStatus: item.purchasing_state_id,
          count: item.item_count,
          title: item.name || "采购单",
          code: item.deptCode
        }
      });
    },
    load() {
      if (this.busy) return;
      var url =
        this.state.toString() == "1"
          ? "PurchasingPlanCount4Audit"
          : this.state.toString() == "2"
          ? "PurchasingPlanCount4Audit2"
          : "PurchasingPlanCount4Audit3";

      this.busy = true;
      this.$loading(true);
      this.page = this.page + 1;
      url = url + "?PageSize=10&PageIndex=" + this.page;
      this.$GET(url).then(r => {
        for (var i of r.data) {
          this.datas.push({
            title: i.department_name || "采购单",
            code: i.purchasing_plan_code || i.code,
            slot: i.item_count + "个项目",
            status: i.purchasing_state_id,
            item_count: i.item_count,
            purchasing_state_id: i.purchasing_state_id,
            id: i.purchasing_plan_id || i.id,
            deptCode: i.department_code
          });
        }
        this.$loading(false);
        if (r.data.lenght >= 10) this.busy = false;
        else this.more = false;
      });
    }
  },
  mounted() {
    this.page = 0;
    this.datas = [];
    this.load();
  }
};
</script>

<style>
</style>
