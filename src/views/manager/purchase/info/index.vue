<template>
  <div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">采购商名称</label>
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
          <input class="weui-input" disabled :value="user.mobile || '无'" type="text" placeholder>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">联系人</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled :value="user.name || '无'" type="text" placeholder>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">通讯地址</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="address" type="text" placeholder="请输入地址">
        </div>
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
      address: "",
      dept: {},
      isAdd: false,
      user: {}
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    name() {
      return this.$route.query.name;
    }
  },
  methods: {
    loadDept() {
      this.$UPDATE_GET("Department/GetByName?name=" + this.name, {}).then(r => {
        if (r.data.data) {
          this.isAdd = true;
        }
        this.dept = r.data.data;
        this.address = this.dept.address;
      });
    },
    load() {
      WeiXin.GetUser(this.id).then(r => {
        this.user = r.data.userlist[0] || {};
        return this.loadDept();
      });
    },
    submit() {
      if (!this.isAdd) {
        this.$UPDATE("Department/Add", {
          WechatID: this.user.userid,
          Code: this.id,
          Name: this.name,
          Desc: this.name,
          Mobile: this.user.mobile,
          Address: this.address
        });
      } else {
        this.$UPDATE("Department/Update", {
          WechatID: this.user.userid,
          Code: this.id,
          ID: this.dept.id,
          Desc: this.name,
          Name: this.name,
          Mobile: this.user.mobile,
          Address: this.address
        });
      }
    }
  },
  activated() {
    this.dept = {};
    this.user = {};
    this.load();
  }
};
</script>

<style>
</style>
