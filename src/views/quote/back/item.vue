<template>
  <div>
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">退货详情：</label>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">退货方：</label>
          <span class="weui-form-preview__value text-left">{{dept.name}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">退货日期：</label>
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
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">
        订单项目（{{datas.length}}）：
        <div>{{dept.name}}</div>
      </div>
      <div class="weui-panel__bd">
        <div v-for="(i,index) in datas" :key="index" class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">{{i.title}}</h4>
          <p class="weui-media-box__desc">{{i.content}}</p>
        </div>
      </div>
    </div>
    <div v-if="state==11" class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确认退货</a>
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
    id() {
      return this.$route.params.id;
    },
    time() {
      return this.$route.query.time;
    },
    deptID() {
      return this.$route.query.deptID;
    },
    state() {
      return this.$route.query.state;
    }
  },
  methods: {
    submit() {
      this.$dialog("提示", "是否确认退货", () => {
        this.$loading(true);
        this.$UPDATE("ChargeBack/VendorComfirm", {
          ChargeBackID: this.id,
          Result: true,
          UserID: this.$store.state.User.userid,
          Desc: ""
        }).then(r => {
          this.$loading(false);
          if (r.result != 0) {
            this.$warn(true, "提交错误");
          } else {
            this.$router.go(-1);
          }
        });
      });
    },
    load() {
      this.$loading(true);
      this.$GET("ChargeBackDetailList?ChargeBackID=" + this.id).then(r => {
        this.datas = r.data.map(i => {
          return {
            title: i.goods_name,
            content: i.count + i.goods_unit_name
          };
        });
        this.$loading(false);
      });
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
