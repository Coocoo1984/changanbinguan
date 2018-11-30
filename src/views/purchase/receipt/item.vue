<template>
  <div>
    <div class="weui-cells__title">XXX采购计划</div>
    <div class="weui-cell weui-cell_swiped">
      <div class="weui-cell__bd">
        <div v-for="(item,index) in datas" :key="index" class="weui-cell">
          <div class="weui-cell__bd">
            <p>{{item.goods_name}}</p>
          </div>
          <div class="weui-cell__ft">
            <input
              style="text-align:right;"
              class="weui-input"
              v-model="item.actual_count"
              type="number"
            >
          </div>
          <div class="weui-cell__ft" style="padding-left:10px">    {{  item.goods_unit_name}}</div>
        </div>
      </div>
    </div>
    <div style="padding:55px"></div>
    <div class="weui-btn-area flex">
      <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">收货提交</a>
      <a v-if="type" class="weui-btn weui-btn_primary" @click="confim" href="javascript:">确定收货</a>
    </div>
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
      return this.$route.params.id;
    },
    type() {
      return this.datas.filter(i => i.actual_count).length > 0;
    }
  },
  methods: {
    submit() {
      this.$UPDATE("Order/CheckIn", {
        OrderID: this.id,
        Result: true,
        UserID: 1,
        Desc: "",
        ListOrderDetailIDAndActualCount: this.datas.map(e => {
          return {
            id: e.purchasing_order_detail_id,
            ActualCount: e.actual_count
          };
        })
      });
    },
    confim() {
      this.$UPDATE("Order/StockIn", {
        OrderID: this.id,
        Result: true,
        UserID: 1,
        Desc: ""
      }).then(r => {
        this.$router.push("/purchase");
      });
    }
  },
  activated() {
    this.$GET("PurchasingOrderDetailList?purchasingOrderID=" + this.id).then(
      r => {
        this.datas = r.data.map(i => {
          i.actual_count = i.actual_count || "";
          return i;
        });
      }
    );
  }
};
</script>

<style>
.flex {
  position: fixed;
  bottom: 0px;
  width: 92%;
  background-color: #ffffff;
  z-index: 1000;
}
.flex a {
  width: 100%;
}
</style>
