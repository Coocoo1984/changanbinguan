 <template>
  <cells :datas="list" @item-click="click"></cells>
</template>

 <script>
export default {
  data() {
    return {};
  },
  computed: {
    list() {
      if (this.status == 1) return this.$store.state.Admin.purchaseing;
      if (this.status == 2) return this.$store.state.Admin.purchaseList;
      return [];
    },
    status() {
      return this.$route.query.status;
    }
  },
  methods: {
    click(item) {
      if (this.status == 1)
        this.$router.push({
          path: "/adm/purchase/item",
          query: {
            id: 1
          }
        });
      if (this.status == 2)
        this.$router.push({
          path: "/adm/purchase/content",
          query: {
            id: 1,
            status: item.status
          }
        });
    }
  }
};
</script>
 
 <style>
</style>
 