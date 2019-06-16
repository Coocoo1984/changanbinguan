<template>
  <div>
    <div class="weui-cells__title">采购计划</div>
    <div class="weui-cell weui-cell_swiped">
      <div class="weui-cell__bd">
        <div v-for="(item,index) in datas" :key="index" class="weui-cell">
          <div class="weui-cell__bd">
            <p>{{item.goods_name}}</p>
          </div>
          <div class="weui-cell__bd">
            <p>收货：{{item.count}}{{item.goods_unit_name}}</p>
          </div>
          <div class="weui-cell__bd">
            退货：
            <input
              style="text-align:right;width:50px"
              class="weui-input"
              v-model="item.actual_count"
              type="number"
            >
          </div>
          <div class="weui-cell__ft" style="padding-left:10px">{{ item.goods_unit_name}}</div>
        </div>
      </div>
    </div>
    <div style="padding:55px"></div>
    <div class="weui-btn-area flex">
      <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">收货提交</a>
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
      return this.$route.query.id;
    },
    type() {
      return this.datas.filter(i => i.actual_count).length > 0;
    },
    user() {
      return this.$store.state.User;
    }
  },
  methods: {
    submit() {
      var r = this.datas.filter(i => i.actual_count).length > 0;
      if (!r) {
        this.$warn(true, "不能提交空数据");
        return;
      }
      this.$dialog("提示", "确认退货", () => {
        this.$UPDATE("ChargeBack/Add", {
          OrderID: this.id,
          CreateUserID: this.user.userid,
          DepartmentID: this.user.deptid,
          Details : this.datas.map(e => {
            return {
              PurchasingOrderDetailId: e.purchasing_order_detail_id,
              Count: e.actual_count,
              GoodsID: 0,
              UnitPrice: 0
            };
          })
        }).then(r => {
          if (r.data.result == 1) {
            this.$succecs(true);
            this.$router.go(-1);
          }
        });
      });
    },
    confim() {
      this.$UPDATE("Order/StockIn", {
        OrderID: this.id,
        Result: true,
        UserID: 1,
        Desc: ""
      }).then(r => {
        if (r.data.result == 1) this.$succecs(true);
        this.$router.push("/purchase");
      });
    }
  },
  mounted() {
    this.$GET("PurchasingOrderDetailList?purchasingOrderID=" + this.id).then(
      r => {
        this.datas = r.data.map(i => {
          i.actual_count = "";
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
