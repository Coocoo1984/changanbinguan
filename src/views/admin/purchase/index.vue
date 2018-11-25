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
          title: item.name || "采购单"
        }
      });
    },
    load() {
      if (this.$route.path == "/adm/purchase") {
        this.busy = true;
        this.$loading(true);
        /* this.$store.commit("pushPurchaseList",{
                title: "XXXXXXXX",
                slot: "<span class='green'>完成</span>"
              }); */
        this.page = this.page + 1;
        this.$GET(
          "PurchasingPlanLists4Dept?state=" +
            this.status +
            "&PageIndex=" +
            this.page +
            "&PageSize=10"
        ).then(r => {
          for (var i of r.data) {
            this.datas.push({
              title: i.name || "采购单",
              slot: i.item_count + "个项目",
              status: i.purchasing_state_id,
              item_count: i.item_count,
              purchasing_state_id: i.purchasing_state_id,
              id: i.id
            });
          }
          this.$loading(false);
          if (r.data.lenght >= 10) this.busy = false;
        });
      }
    }
  },
  mounted() {
    this.load();
  }
};
</script>
 
 <style>
</style>
 