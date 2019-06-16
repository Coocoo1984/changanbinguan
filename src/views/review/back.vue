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
        path: "/back/item/" + item.id,
        query: {
          qid: item.planId,
          oid: item.orderId,
          title: item.title
        }
      });
    },
    load() {
      if (this.busy) return;
      //api/ChargeBackList?listDepartmentIDs=1,2,3&StartTime=2018-01-01&EndTime=2020-01-01

      var url = "ChargeBackList";

      this.busy = true;
      this.$loading(true);
      this.page = this.page + 1;
      url = url + "?listStateIds=11&PageSize=10&PageIndex=" + this.page;
      this.$GET(url).then(r => {
        for (var i of r.data) {
          this.datas.push({
            title: i.department_name,
            code: i.create_time,
            slot: i.purchasing_state_name,
            status: i.purchasing_state_id,
            id: i.id,
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
