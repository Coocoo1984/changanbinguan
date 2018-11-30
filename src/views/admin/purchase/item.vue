<template>
  <div>
    <div class="weui-panel weui-panel_access" style="padding-bottom:10px">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title" style="font-size:14px">
            {{title}}
            <span class="count">{{count}}个项目</span>
          </h4>
          <p class="weui-media-box__desc">201828112312</p>
        </div>
      </div>
      <div class="weui-panel__bd">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="weui-btn-area">
              <a
                @click="Aduit"
                class="weui-btn weui-btn_primary"
                href="javascript:"
              >{{status==1?'初审通过':'复审确认'}}</a>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="weui-btn-area">
              <a class="weui-btn weui-btn_warn" href="javascript:" @click="GoBack">退回</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-for="gc in goods_class">
      <preview
        v-if="getGoods(gc.id).length>0"
        :key="gc.name"
        style="margin-top:10px"
        static
        :title="'采购单项目（'+getGoods(gc.id).length+'）：'+gc.name"
        @handler="SelectQuoter(gc.id)"
        :btnGray="btnGray"
        :btnText="btnText"
        :datas="getGoods(gc.id)"
      ></preview>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnText: "",
      btnGray: true,
      previewDatas: {},
      select: "",
      goods: [],
      goodsPrice: []
    };
  },
  methods: {
    GoBack() {
      this.$router.push({
        path: "/adm/purchase/back",
        query: {
          id: this.id,
          status: this.planStatus
        }
      });
    },
    SelectQuoter(id) {
      var goods_ids = this.goods
        .filter(i => i.goods_class_id == id)
        .map(i => i.goods_id)
        .join(",");
      this.$GET(
        "PurchasingPlanGoodsClassVendorQuetoSUM?purchasingPlanID=" +
          this.id +
          "&goodsClassID=" +
          id +
          "&listIntGoodsIds=" +
          goods_ids
      )
        .then(r => {
          return r.data.map(i => {
            return {
              name: i.vendor_name,
              value: i.vendor_id,
              money: "￥" + i.subtotal
            };
          });
        })
        .then(r => {
          this.$selectQuoter(
            "选择供货商",
            r,
            this.select,
            item => {
              this.select = item;
            },
            () => {
              this.btnGray = false;
              this.$UPDATE("PurchasingPlan/ConfirmVendor", {
                PlanID: this.id,
                VendorID: this.select,
                GoodsClassID: id
              });
            }
          );
        });
    },
    Aduit() {
      if (this.status == 2) {
        //初审
        this.$UPDATE("PurchasingAudit/PlanAudit", {
          PlanID: this.id,
          Result: true,
          UserID: 1
        }).then(r => {
          if (r.data.result == 1) this.$router.go(-1);
        });
      } else {
        //复审
        this.$UPDATE("PurchasingAudit2/PlanAudit", {
          PlanID: this.id,
          Result: true,
          UserID: 1
        }).then(r => {
          if (r.result == 1) this.$router.go(-1);
        });
      }
    },
    load() {
      this.$GET("PurchasingPlanDetail?purchasingPlanId=" + this.id)
        .then(r => {
          this.goods = r.data;
          return this.$GET("GoodsQuoteDetailVendorPriceRange");
        })
        .then(r => {
          this.goodsPrice = r.data;
        });
    },
    getGoods(class_id) {
      return this.goods
        .filter(i => i.goods_class_id == class_id)
        .map(i => {
          console.log(this.goods);
          var goods_price = this.goodsPrice.filter(
            g => g.goods_id == i.goods_id
          )[0];

          var max = goods_price ? goods_price.max_unit_price : "无";
          var min = goods_price ? goods_price.min_unit_price : "无";
          return {
            title: i.goods_name,
            content: i.count + i.goods_unit_name
          };
        });
    }
  },
  computed: {
    status() {
      return this.$route.query.status;
    },
    id() {
      return this.$route.query.id;
    },
    title() {
      return this.$route.query.title;
    },
    goods_class() {
      return this.$store.state.Home.categoryList;
    },
    count() {
      return this.$route.query.count;
    },
    planStatus() {
      return this.$route.query.plan;
    }
  },
  activated() {
    if (this.$route.query.status == 2) this.btnText = "确认供货商";
    this.load();
  }
};
</script>

<style>
.weui-media-box__title span.count {
  float: right;
}
</style>
