<template>
  <div class="weui-cells">
    <a v-for="(item,index) in list" :key="index" @click="click(item)" class="weui-cell link" href="javascript:;">
    <div class="weui-cell__bd">
      <p>{{item.name}}</p>
    </div>
    <div class="weui-cell__ft">
      >
    </div>
  </a>
  </div>
</template>
<script>
import WeiXin from "@/common/weixin";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    access_token() {
      return this.$store.state.WeiXin.access_token;
    }
  },
  methods: {
    click(item) {
      this.$router.push("/manager/quote/info");
    },
    getUser() {
      WeiXin.GetUser(this.access_token, 5).then(r => {
        this.list = r.data.userlist;
      });
    }
  },
  mounted() {
    if (!this.access_token) {
      this.$store.dispatch("getAccessToken").then(r => {
        this.getUser();
      });
    } else {
      this.getUser();
    }
  }
};
</script>
