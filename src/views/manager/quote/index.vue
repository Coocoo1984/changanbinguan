<template>
  <div class="weui-panel">
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
          <a
            v-for="(item,index) in list"
            :key="index"
            @click="click(item)"
            class="weui-cell weui-cell_access"
            href="javascript:;"
          >
            <div class="weui-cell__bd weui-cell_primary">
              <p>{{item.name}}</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
        </div>
      </div>
    </div>
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
      this.$router.push({
        path: "/manager/quote/info",
        query: {
          id: item.id,
          name: item.name
        }
      });
    },
    getDepartment() {
      WeiXin.GetDepartment(5).then(r => {
        this.list = r.data.department;
      });
    }
  },
  mounted() {
    this.getDepartment();
  }
};
</script>
