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
      this.page = 0;
      this.datas = [];
      this.busy = false;
      this.load();
    }
  },
  methods: {
    click(item) {
      console.log(item);
      this.$router.push({
        path: "/adm/quote/quoter",
        query: {
          id: item.id,
          status: item.purchasing_state_id,
          title: item.title,
          code: item.deptCode
        }
      });
    },
    load() {
      if (this.busy) return;
      var url = "QuoteListAll";

      this.busy = true;
      this.$loading(true);
      this.page = this.page + 1;
      url =
        url +
        "?listQuoteStateIDs=" +
        this.state +
        "&disable=true&PageSize=10&PageIndex=" +
        this.page;
      this.$GET(url).then(r => {
        for (var i of r.data) {
          this.datas.push({
            title: i.vendor_name,
            code: i.quote_create_time,
            slot: i.quote_state_name,
            status: i.purchasing_state_id,
            item_count: i.item_count,
            purchasing_state_id: i.quote_state_id,
            id: i.quote_id,
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
