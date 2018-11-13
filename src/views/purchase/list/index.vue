<template>
  <div>
    <div class="weui-tab">
      <div class="weui-navbar">
        <div class="weui-navbar__item" @click="status=1" :class="[status==1?'weui-bar__item_on':'']">
          未确认
        </div>
        <div class="weui-navbar__item" @click="status=2" :class="[status==2?'weui-bar__item_on':'']">
          已确认
        </div>
        <div class="weui-navbar__item" @click="status=3" :class="[status==3?'weui-bar__item_on':'']">
          需修改
        </div>
      </div>
      <div class="weui-tab__panel">
        <cells :datas="list" @item-click="click"></cells>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: 1,
      ismounted: false,
      optID: -1,
      munes: [
        {
          name: "修改采购单",
          handler: () => {
            this.$router.push("/purchase/add");
          },
          status: [1, 3]
        },
        {
          name: "查看采购单",
          handler: () => {
            this.$router.push("/purchase/content");
          },
          status: [2]
        },
        {
          name: "确认采购单",
          handler: () => {},
          status: [1]
        },
        {
          name: "删除",
          handler: () => {
            this.$dialog("是否删除", "删除操作不可恢复！", () => {});
          },
          status: [1]
        }
      ]
    };
  },
  computed: {
    list() {
      return this.$store.state.Purchase.quote_datas.filter(
        i => i.status == this.status
      );
    }
  },
  methods: {
    click(item, index) {
      console.log(index);
      this.$actionSheet(
        "操作",
        this.munes.filter(
          i => i.status.filter(k => k == this.status).length > 0
        ),
        item => {
          item.handler();
        }
      );
    }
  },
  mounted() {}
};
</script>