<template>
  <div class="weui-panel">
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
          <a v-for="(item,index) in list" :key="index" @click="click(item)" class="weui-cell weui-cell_access" href="javascript:;">
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
  methods: {
    click(item) {
      this.$router.push({
        path: "/manager/purchase/info",
        query: {
          id: item.id,
          name: item.name
        }
      });
    }
  },
  mounted() {
    WeiXin.GetDepartment(8).then(r => {
      this.list = r.data.department.filter(i => i.id != 8);
    });
  }
};
</script>
