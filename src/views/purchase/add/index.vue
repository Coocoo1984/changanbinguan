<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">
        采购单 ({{datas.length}})项目：
        <span class="add_btn" @click="addItems(0)">+新增采购项</span>
      </div>
      <div class="weui-panel__bd">
        <a v-for="(item,index) in datas" :key="index" @click="addItems(index)" @touchstart="showDeleteButton(index)" @touchend="clearLoop" class="weui-cell weui-media-box weui-media-box_text" href="javascript:;">
          <div class="weui-cell__bd">
            <p>{{item.goods_name}}</p>
          </div>
          <div class="weui-cell__ft">
            <p class="num">数量：{{item.count}}{{item.goods_unit_name}}</p>
          </div>
        </a>
      </div>
      <div class="weui-panel__ft">
        <div style="padding:10px">
          <a href="javascript:;" @click="submit" class="weui-btn weui-btn_primary">新增采购单</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loop: null,
      showAddBox: true,
      optIndex: -1
    };
  },
  computed: {
    datas() {
      return this.$store.state.Purchase.add_datas;
    },
    purchaseID() {
      return this.$route.query["id"];
    },
    submitData() {
      return this.datas.map(i => {
        return {
          GoodsID: i.goods_id,
          PurocumentCount: i.count
        };
      });
    }
  },
  methods: {
    submit() {
      if (this.purchaseID) {
        //更新
        this.$UPDATE("PurchasingPlan/Update", {
          ID: this.purchaseID,
          UserID: this.$store.state.User.userid,
          Details: this.submitData
        }).then(r => {
          if (r.data.result == 1) this.$succecs(true);
          this.$router.push("/purchase/list");
        });
      } else {
        this.$UPDATE("PurchasingPlan/Add", {
          DepartmentID: this.$store.state.User.deptid,
          BizTypeID: 1,
          Details: this.submitData,
          CreateUserID: this.$store.state.User.userid
        }).then(r => {
          if (r.data.result == 1) this.$succecs(true);
          this.$router.push("/purchase/list");
        });
      }

      //this.$router.push("/purchase/list");
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
    }
  },
  mounted() {
    if (this.purchaseID) {
      this.$GET(
        "PurchasingPlanDetail?purchasingPlanId=" + this.purchaseID
      ).then(r => {
        for (var i of r.data) {
          this.$store.commit("pushAddData", i);
        }
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
