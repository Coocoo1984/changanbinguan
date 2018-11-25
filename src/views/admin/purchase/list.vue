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
  methods: {
    click(item) {
      this.$router.push({
        path: "/adm/purchase/content",
        query: {
          id: item.id,
          status: this.status
        }
      });
    },
    load() {
      this.busy = true;
      this.$loading(true);
      /* this.$store.commit("pushPurchaseList",{
                title: "XXXXXXXX",
                slot: "<span class='green'>完成</span>"
              }); */
      this.page = this.page + 1;
      this.$GET(
        "PurchasingOrderList?PageIndex=" + this.page + "&PageSize=10"
      ).then(r => {
        this.datas = r.data.map(i => {
          return {
            title: i.name || "采购单",
            slot: i.item_count + "个项目",
            status: i.purchasing_state_id
          };
        });
        this.$loading(false);
        if (r.data.lenght >= 10) this.busy = false;
      });
    }
  },
  activated() {
    this.load();
  }
};
</script>
 
 <style>
</style>
 