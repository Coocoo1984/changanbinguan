<template>
  <div>
    <div v-if="notPer" class="weui-panel weui-panel_access" style="padding-bottom:10px">
      <div class="weui-panel__bd">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="weui-btn-area">
              <a
                @click="Aduit(true,'')"
                class="weui-btn weui-btn_primary"
                href="javascript:"
              >{{status==1?'初审通过':'终审确认'}}</a>
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
    <div v-for="(v,k) in datas" :key="k" class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">{{k}}（{{v.length}}）</div>
      <div class="weui-panel__bd">
        <div v-for="(item,index) in v" :key="index" class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">
            {{item.goods_name}}
            <span class="menmoy">
              <font class="red">￥{{item.unit_price}}</font>
            </span>
          </h4>
        </div>
      </div>
    </div>

    <div v-if="show">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">退回</strong>
        </div>
        <div class="weui-dialog__bd">
          <div>
            <p>是否退回</p>
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">原因</label>
                </div>
                <div class="weui-cell__bd">
                  <textarea v-model="backTxt" class="weui-textarea"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="Cancel">否</a>
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="OK">是</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      datas: {},
      show: false,
      backTxt: "",
      notPer:false
    };
  },
  computed: {
    quoteID() {
      return this.$route.query.id;
    },
    status() {
      return this.$route.query.status;
    },
    user() {
      return this.$store.state.User;
    }
  },
  methods: {
    load() {
      this.$loading(true);
      this.$GET("GetDetailByQuoteID?quoteID=" + this.quoteID).then(r => {
        for (var i of r.data) {
          if (!this.datas[i.goods_class_name])
            Vue.set(this.datas, i.goods_class_name, []);
          this.datas[i.goods_class_name].push(i);
        }
        this.notPer = true;
        this.$loading(false);
      });
    },
    GoBack() {
      this.show = true;
    },
    Cancel() {
      this.show = false;
    },
    OK() {
      this.Aduit(false, this.backTxt);
      this.show = false;
    },
    Aduit(result, desc) {
      this.$dialog("提示", result ? "是否通过审核" : "是否退回", () => {
        this.$loading(true);
        var url =
          "QuoteAudit/" + (this.status == 1 ? "QuoteAudit" : "QuoteAudit2");
        var data = {
          WechatID: this.user.wechatID,
          QuoteID: this.quoteID,
          Result: result,
          UserID: this.user.userID,
          Desc: desc
        };
        this.$UPDATE(url, data).then(r => {
          if (r.data.result == 1) {
            this.$succecs(true);
          }
          this.$loading(false);
          if (r.data.result == 1) this.$router.go(-1);
        });
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style>
</style>
