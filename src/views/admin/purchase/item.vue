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
              >{{status==1?'初审通过': status == 2 ?'复审确认' : '终审确认'}}</a>
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
    <preview
      style="margin-top:10px"
      static
      :title="'采购单项目（'+getGoods().length+'）：'"
      @handler="SelectQuoter()"
      :btnGray="btnGray"
      :btnText="btnText"
      :datas="getGoods()"
    ></preview>
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
          status: this.status,
          deptID: this.code
        }
      });
    },
    SelectQuoter(id) {
      var goods_ids = this.goods.map(i => i.goods_id).join(",");
      this.$loading(true);
      this.$GET(
        "PurchasingPlanGoodsClassVendorQuetoSUM?purchasingPlanID=" +
          this.id +
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
          this.$loading(false);
          this.$selectQuoter(
            "选择供货商",
            r,
            this.select,
            item => {
              this.select = item;
            },
            () => {
              this.$dialog("提示", "是否确认", () => {
                this.btnGray = false;
                this.$loading(true, "提交数据中");
                this.$UPDATE("PurchasingPlan/ConfirmVendor", {
                  PlanID: this.id,
                  VendorID: this.select,
                  GoodsClassID: id
                }).then(r => {
                  this.$loading(false);
                });
              });
            }
          );
        });
    },
    Aduit() {
      this.$dialog("提示", "是否通过审核", () => {
        this.$loading(true, "提交数据中");
        if (this.status == 1) {
          //初审
          this.$UPDATE("PurchasingAudit/PlanAudit", {
            PlanID: this.id,
            Result: true,
            UserID: this.userID,
            WechatID: this.wechatID
          }).then(r => {
            if (r.data.result == 1) {
              this.$succecs(true);
              this.$SendDeptMsg(
                "http://changan.91ytt.com/",
                this.code,
                "采购订单已通过初审",
                this.$Now(),
                "采购订单已通过初审"
              );
            }
            this.$loading(false);
            if (r.data.result == 1) this.$router.go(-1);
          });
        } else if (this.status == 2) {
          //复审
          this.$UPDATE("PurchasingAudit/PlanAudit2", {
            PlanID: this.id,
            Result: true,
            UserID: this.userID,
            WechatID: this.wechatID
          }).then(r => {
            if (r.data.result == 1) {
              this.$succecs(true);
              this.$SendDeptMsg(
                "http://changan.91ytt.com/",
                this.code,
                "采购订单已通过审核",
                this.$Now(),
                "采购订单已通过审核"
              );
            }
            this.$loading(false);
            if (r.data.result == 1) this.$router.go(-1);
          });
        } else {
          this.$UPDATE("PurchasingAudit/PlanAudit3", {
            PlanID: this.id,
            Result: true,
            UserID: this.userID,
            WechatID: this.wechatID
          }).then(r => {
            if (r.data.result == 1) {
              this.$succecs(true);
              this.$SendDeptMsg(
                "http://changan.91ytt.com/",
                this.code,
                "采购订单已通过审核",
                this.$Now(),
                "采购订单已通过审核"
              );
            }
            this.$loading(false);
            if (r.data.result == 1) this.$router.go(-1);
          });
        }
      });
    },
    load() {
      this.$loading(true);
      this.$GET("PurchasingPlanDetail?purchasingPlanId=" + this.id)
        .then(r => {
          this.goods = r.data;
          return this.$GET("GoodsQuoteDetailVendorPriceRange");
        })
        .then(r => {
          this.goodsPrice = r.data;
          this.$loading(false);
        });
    },
    getGoods(class_id) {
      var m = this.goods.map(i => {
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
      return m;
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
    },
    code() {
      return this.$route.query.code;
    },
    userID() {
      return this.$store.state.User.userid;
    },
    wechatID() {
      return this.$store.state.User.weichatID;
    }
  },
  mounted() {
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
