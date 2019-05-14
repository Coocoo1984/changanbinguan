 <template>
  <div>
    <div class="weui-panel">
      <div class="weui-panel__hd">
        <span>统计结果</span>
      </div>
    </div>
    <div v-for="(v,k) in list" :key="k" class="weui-panel">
      <div class="weui-panel__hd">
        分类：
        <span class="categroy">{{k}}</span>
      </div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div v-for="(item,index)  in v" :key="index" class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="item">{{item.goods_name}}</p>
                <span class="number">数量：{{item['SUM( actual_count )']}}{{item.goods_unit_name}}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Vue from "vue";
export default {
  asyncData({ store }) {
    return store.dispatch("loadGoods");
  },
  data() {
    return { list: {} };
  },
  computed: {
    bType() {
      return this.$route.query.bType == 0 ? "" : this.$route.query.bType;
    },
    dType() {
      return this.$route.query.dType == 0 ? "" : this.$route.query.dType;
    },
    start() {
      return this.$route.query.start;
    },
    end() {
      return this.$route.query.end;
    },
    keyword() {
      return this.$route.query.s;
    },
    goods() {
      return this.$store.state.Home.goods;
    }
  },
  mounted() {
    var k_reg = new RegExp("[" + this.keyword + "]+");
    var goods_ids = this.goods
      .filter(i => k_reg.test(i.goods_name))
      .map(i => i.goods_id);
    var goods_class_ids = this.goods
      .filter(i => k_reg.test(i.goods_class_name))
      .map(i => i.goods_class_id);
    this.$GET(
      "PurchasingOrderGoodsCountStatics?listBizTypeIDs=" +
        this.bType +
        "&listDepartmentIDs=" +
        this.dType +
        "&listGoodsClassIDs=" +
        goods_class_ids.join(",") +
        "&listGoodsIDs=" +
        goods_ids.join(",") +
        "&StartTime=" +
        this.start +
        "&EndTime=" +
        this.end,
      {}
    ).then(r => {
      this.list = {};
      for (var item of r.data) {
        if (!this.list[item.goods_class_name]) {
          Vue.set(this.list, item.goods_class_name, []);
        }
        this.list[item.goods_class_name].push(item);
      }
    });
  }
};
</script>
 
 <style>
.categroy {
  font-weight: bold;
}
.box {
  margin-top: 10px;
}
.item {
  float: left;
}
.number {
  float: right;
}
</style>
 