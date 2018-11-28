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
        <!-- <purchase-list v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="20" @click="click" :datas="list"></purchase-list> -->
         <div class="weui-cells">
            <a v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="20" @click="click(item)" v-for="(item,index) in list" :key="index" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>{{item.name|| "采购单"}}</p>
                </div>
                <div class="weui-cell__ft">
                   {{item.item_count}}个项目
                </div>
            </a>
        </div>
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
          handler: item => {
            console.log(item);
            this.$router.push({
              path: "/purchase/add",
              query: {
                id: item.id
              }
            });
          },
          status: [1, 3]
        },
        {
          name: "查看采购单",
          handler: item => {
            this.$router.push({
              path: "/purchase/content",
              query: {
                title: item.name || "采购单",
                id: item.id,
                count: item.item_count
              }
            });
          },
          status: [2]
        },
        {
          name: "确认采购单",
          handler: item => {
            this.$dialog("是否确认", "是否确认采购单", () => {
              this.$UPDATE("PurchasingPlan/SubmitFirst", {
                IDs: [item.id],
                UserID: 1
              }).then(r => {
                this.load();
              });
            });
          },
          status: [1]
        },
        {
          name: "删除",
          handler: () => {
            this.$dialog("是否删除", "删除操作不可恢复！", () => {});
          },
          status: [1]
        }
      ],
      datas: {
        1: [],
        2: [],
        3: []
      },
      page: {
        1: 1,
        2: 1,
        3: 1
      }
    };
  },
  watch: {
    status(s) {
      this.load();
    }
  },
  computed: {
    list() {
      return this.datas[this.status.toString()];
    }
  },
  methods: {
    click(item, index) {
      this.$actionSheet(
        "操作",
        this.munes.filter(
          i => i.status.filter(k => k == this.status).length > 0
        ),
        mune => {
          mune.handler(item);
        }
      );
    },
    load() {
      this.$GET(
        "PurchasingPlanLists4Dept?state=" +
          this.status +
          "&PageIndex=" +
          this.page[this.status.toString()] +
          "&PageSize=10",
        {}
      ).then(r => {
        this.datas[this.status.toString()] = r.data;
      });
    }
  },
  activated() {
    this.load();
  }
};
</script>