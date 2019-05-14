<template>
  <div>
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单详情：</label>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单方：</label>
          <span class="weui-form-preview__value text-left">{{dept.name}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单日期：</label>
          <span class="weui-form-preview__value text-left">{{time}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">联系电话：</label>
          <span class="weui-form-preview__value text-left">
            <a :href="'tel:'+dept.mobile">{{dept.mobile}}</a>
          </span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">地址：</label>
          <span class="weui-form-preview__value text-left">{{dept.address}}</span>
        </div>
      </div>
    </div>
    <div v-for="(v,k) in datas" :key="k" class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">
        订单项目（{{v.length}}）：{{k}}
        <div>{{v.department_name}}</div>
      </div>
      <div class="weui-panel__bd">
        <div v-for="(i,index) in v" :key="index" class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">{{i.goods_name}}</h4>
          <p class="weui-media-box__desc">
            数量：{{i.count}}{{i.goods_unit_name}}
            <span
              v-if="status>3"
              class="number red"
            >实收：{{i.actual_count}}{{i.goods_unit_name}}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-if="btnText" class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">{{btnText}}</a>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      datas: {},
      dept: {}
    };
  },
  computed: {
    status() {
      return this.$route.query.status;
    },
    id() {
      return this.$route.query.id;
    },
    deptID() {
      return this.$route.query.deptID;
    },
    time() {
      return this.$route.query.time;
    },
    btnText() {
      return this.status == 1 ? "确认订单" : this.status == 3 ? "确认发货" : "";
    }
  },
  methods: {
    submit() {
      if (this.status == 1) {
        this.$UPDATE("Order/VendorComfirm", {
          OrderID: this.id,
          Result: true,
          UserID: 1,
          Desc: ""
        }).then(r => {
          if (r.data.result == 1) this.$succecs(true);
          this.$router.go(-1);
        });
      } else if (this.status == 3) {
        this.$UPDATE("Order/ComfirmDelivery", {
          OrderID: this.id,
          Result: true,
          UserID: 1,
          Desc: ""
        }).then(r => {
          if (r.data.result == 1) this.$succecs(true);
          this.$router.go(-1);
        });
      }
    },
    load() {
      this.$loading(true);
      this.$GET("PurchasingOrderDetailList?purchasingOrderID=" + this.id).then(
        r => {
          for (var i of r.data) {
            if (!this.datas[i.goods_class_name]) {
              Vue.set(this.datas, i.goods_class_name, []);
            }
            this.datas[i.goods_class_name].push(i);
          }
        }
      );
      this.$UPDATE_GET("Department/Get?id=" + this.deptID).then(r => {
        this.dept = r.data.data;
        this.$loading(false);
      });
    }
  },
  mounted() {
    this.datas = {};
    this.load();
  }
};
</script>
<style scoped>
.text-left {
  text-align: left;
}
</style>

<style>
</style>
