<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <goods @change="change" :init-data="initData" :static-biz-type="staticBizType"></goods>
      <div class="weui-panel__ft">
        <div style="padding:10px">
          <a href="javascript:;" @click="submit" class="weui-btn weui-btn_primary">录入库存</a>
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
      loop: null,
      showAddBox: true,
      optIndex: -1,
      datas: {},
      initData: {},
      staticBizType: "",
      isSubmit: false
    };
  },
  asyncData({ store }) {
    return store.dispatch("loadHomeData");
  },
  computed: {
    purchaseID() {
      return this.$route.query["id"];
    },
    submitData() {
      var sb = [];
      for (var k in this.datas) {
        sb.push({
          GoodsID: k,
          Count : this.datas[k]
        });
      }
      return sb;
    },
    categroys() {
      return this.$store.state.Home.categoryList;
    },
    user(){
        return this.$store.state.User;
    }
  },
  methods: {
    submit() {
      this.$dialog("提示", "是否信息", () => {
        this.$loading(true);
        this.$UPDATE("Depot/DeptStockCheck", {
            WechatID:this.user.wechatID,
            DepartmentID :this.user.deptID,
            UserID :this.user.userID,
            ListDepotDetails :this.submitData
        }).then(r => {
          this.$loading(false);
        });
      });
    },
    addItems(id) {
      this.$router.push({
        path: "/purchase/add/item",
        query: {
          id: id
        }
      });
    },
    showDeleteButton(index) {
      this.optIndex = index;
      this.loop = setTimeout(() => {
        this.$actionSheet(
          "确认删除",
          [
            {
              name: "删除"
            }
          ],
          item => {
            if (this.optIndex < 0) return;
            this.$store.commit("removeAddData", this.optIndex);
            this.optIndex = -1;
          }
        );
      }, 1000);
    },
    clearLoop() {
      clearTimeout(this.loop);
    },
    change(v) {
      this.datas = v;
    }
  },
  mounted() {
    this.initData = {};
    if (this.purchaseID) {
      this.$GET(
        "PurchasingPlanDetail?purchasingPlanId=" + this.purchaseID
      ).then(r => {
        this.$nextTick(() => {
          for (var i of r.data) {
            if (!this.staticBizType)
              this.staticBizType = this.categroys
                .filter(k => k.id == i.goods_class_id)[0]
                .biz_type_id.toString();
            Vue.set(this.initData, i.goods_id, i.count);
          }
        });
      });
    }
  }
};
</script>
<style>
.num {
  color: #000;
}
.add_btn {
  float: right;
  color: #000;
}
</style>
