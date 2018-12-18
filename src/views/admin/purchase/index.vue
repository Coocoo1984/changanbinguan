 <template>
  <!-- <cells :datas="list" @item-click="click"></cells> -->
  <purchase-list v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10" @click="click" :datas="datas"></purchase-list>
</template>

 <script>
export default {
  data() {
    return {
      page: 0,
      busy: false,
      datas: []
    };
  },
  computed: {
    status() {
      return this.$route.query.status;
    }
  },
  watch: {
    status() {
      this.datas = [];
      this.page = 0;
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
          status: this.status,
          planStatus: item.purchasing_state_id,
          count: item.item_count,
          title: item.name || "采购单",
          code: item.deptCode
        }
      });
    },
    load() {
      var url =
        this.status == 2
          ? "PurchasingPlanCount4Audit"
          : "PurchasingPlanCount4Audit2";
      if (this.$route.path == "/adm/purchase") {
        this.busy = true;
        this.$loading(true);
        var url =
          this.status == 1
            ? "PurchasingPlanCount4Audit"
            : "PurchasingPlanCount4Audit2";

        this.page = this.page + 1;
        url = url + "?PageSize=10&PageIndex=" + this.page;
        this.$GET(url).then(r => {
          for (var i of r.data) {
            this.datas.push({
              title:
                i.department_name ||
                "采购单" + (i.purchasing_plan_code || i.code),
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
        });
      }
    }
  },
  activated() {
    this.page = 0;
    this.datas = [];
    this.load();
  }
};
</script>
 
 <style>
</style>
 