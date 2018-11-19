 <template>
  <!-- <cells :datas="list" @item-click="click"></cells> -->
  <purchase-list v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10" @click="click" :datas="datas"></purchase-list>
</template>

 <script>
export default {
  data() {
    return {
      datas: [],
      page: 1,
      busy: false
    };
  },
  computed: {
    status() {
      return this.$route.query.status;
    }
  },
  methods: {
    refresh(done) {
      done();
    },
    infinite(done) {
      done();
    },
    click(item) {
      if (this.status == 1)
        this.$router.push({
          path: "/adm/purchase/item",
          query: {
            id: 1,
            status: this.$route.query.type
          }
        });
      else if (this.status == 2)
        this.$router.push({
          path: "/adm/purchase/content",
          query: {
            id: 1,
            status: item.status
          }
        });
    },
    load() {
      if (this.$route.path == "/adm/purchase") {
        this.busy = true;
        this.$loading(true);
        setTimeout(() => {
          for (var i = 0; i < 20; i++) {
            this.datas.push({
              title: "XXXXXXXX",
              slot: "17个项目"
            });
          }
          this.busy = false;
          this.$loading(false);
        }, 1000);
      }
    }
  },
  mounted() {}
};
</script>
 
 <style>
</style>
 