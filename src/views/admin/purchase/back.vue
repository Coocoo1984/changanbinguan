<template>
  <div>
    <div class="weui-cells__title">退回理由</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="text" class="weui-textarea" placeholder="请输入文本" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{text.length}}</span>/200
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确定</a>
    </div>
  </div>
</template>
<script>
import WeiXin from "@/common/weixin";

export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    submit() {
      var date = new Date();
      this.$UPDATE("PurchasingPlan/SubmitFirst", {
        IDs: [this.id],
        UserID: 1,
        Status: this.status - 1
      })
        .then(() => {
          return WeiXin.SendMessageToUsers(
            this.access_token,
            "http://" + window.location.host + "/purchase",
            this.deptID,
            "采购单已经被退回",
            date.getFullYear() +
              "年" +
              (date.getMonth() + 1) +
              "月" +
              date.getDate(),
            this.text
          );
        })
        .then(r => {
          this.$router.push({
            path: "/adm/purchase"
          });
        });
    }
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    status() {
      return this.$route.query.status;
    },
    access_token() {
      return this.$store.state.WeiXin.access_token;
    },
    deptID() {
      return this.$route.query.deptID;
    }
  },
  mounted() {
    if (!this.access_token) {
      this.$store.dispatch("getAccessToken").then(r => {});
    }
  }
};
</script>
<style>
</style>
