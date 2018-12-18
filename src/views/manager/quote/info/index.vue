<template>
  <div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">供应商名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled :value="name" type="text" placeholder>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">联系电话</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled :value="user.mobile" placeholder>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">联系人</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled :value="user.name" type="text" placeholder>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">通讯地址</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="vendor.address" type="text" placeholder="输入地址">
        </div>
      </div>
      <div class="weui-cells__title">提供商品</div>
      <div class="weui-cells weui-cells_checkbox">
        <label v-for="(item,index) in categoryList" :key="index" class="weui-cell weui-check__label" :for="item.name">
          <div class="weui-cell__hd">
            <input type="checkbox" class="weui-check" :value="item.id" v-model="select_ids" :id="item.name">
            <i class="weui-icon-checked"></i>
          </div>
          <div class="weui-cell__bd">
            <p>{{item.name}}</p>
          </div>
        </label>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">确定</a>
    </div>
  </div>
</template>

<script>
import WeiXin from "@/common/weixin";
export default {
  data() {
    return {
      user: {},
      vendor: {},
      isAdd: false,
      select_ids: []
    };
  },
  computed: {
    name() {
      return this.$route.query.name;
    },
    id() {
      return this.$route.query.id;
    },
    categoryList() {
      return this.$store.state.Home.categoryList;
    }
  },
  methods: {
    submit() {
      if (this.isAdd) {
        this.$UPDATE("Vendor/Update", {
          ID: this.vendor.id,
          Code: this.id,
          Name: this.name,
          Mobile: this.vendor.mobile,
          Address: this.vendor.address,
          GoodsClassIDs: this.select_ids
        }).then(this.callback);
      } else {
        this.$UPDATE("Vendor/Add", {
          Name: this.name,
          Code: this.user.id,
          Mobile: this.user.mobile,
          Address: this.vendor.address,
          GoodsClassIDs: this.select_ids
        }).then(this.callback);
      }
    },
    callback(r) {
      if (r.data.result == 1) {
        this.$router.go(-1);
      } else {
      }
    },
    getUser() {
      WeiXin.GetUser(this.id)
        .then(r => {
          this.user = r.data.userlist[0];
          return this.$UPDATE_GET("Vendor/Get?name=" + this.name);
        })
        .then(r => {
          if (r.data.data != null) {
            this.isAdd = true;
            this.vendor = r.data.data;
            this.select_ids = this.vendor.rsVendors.map(i => i.goodsClassID);
          }
        });
    }
  },
  activated() {
    this.select_ids = [];
    this.isAdd = false;
    this.user = {};
    this.vendor = {
      name: "",
      mobile: "",
      address: ""
    };
    this.getUser();
  }
};
</script>

<style>
</style>
