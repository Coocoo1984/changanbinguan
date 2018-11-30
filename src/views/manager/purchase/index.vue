<template>
    <div>
        <cells :datas="list" @item-click="click"></cells>
        
    </div>
</template>
<script>
import WeiXin from "@/common/weixin"
export default {
  data() {
    return {
      list: [
        {
          title: "XXX",
          link: "info"
        }
      ]
    };
  },
  methods: {
    click(item) {
      this.$router.push("/manager/purchase/info");
    },

  },
  mounted(){
    WeiXin
  }
};
</script>
