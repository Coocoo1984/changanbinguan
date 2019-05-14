 <template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div
        class="weui-navbar__item"
        @click="tabChange(1)"
        :class="[status==1?'weui-bar__item_on':'']"
      >报价筛选</div>
      <div
        class="weui-navbar__item"
        @click="tabChange(2)"
        :class="[status==2?'weui-bar__item_on':'']"
      >报价单</div>
      <div
        class="weui-navbar__item"
        @click="tabChange(3)"
        :class="[status==3?'weui-bar__item_on':'']"
      >报价记录</div>
    </div>
    <div v-if="status==1" class="weui-tab__panel">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">类型：</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="type">
              <option
                v-for="(b,index) in bizTypes"
                :key="index"
                :value="b.biz_type_id"
              >{{b.biz_type_name}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">报价时间：</label>
          </div>
          <div class="weui-cell__bd">
            <div class="weui-flex">
              <div class="weui-flex__item">
                <div class="placeholder" @click="selectStartDate()">{{startDate}} 到</div>
              </div>
              <div class="weui-flex__item">
                <div class="placeholder" @click="selectEndDate()">{{endDate}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-btn-area">
          <a class="weui-btn weui-btn_primary" @click="loadList" href="javascript:">确定</a>
        </div>
      </div>
    </div>
    <div v-else-if="status==2" class="weui-tab__panel">
      <div v-for="(q,k) in quote" :key="k" class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">{{k}}（{{q.length}}）</div>
        <div class="weui-panel__bd">
          <div
            v-for="(item,index) in q"
            :key="index"
            @click="goContent(item)"
            class="weui-media-box weui-media-box_text"
          >
            <h4 class="weui-media-box__title">
              {{item.goods_name}}
              <span class="menmoy">
                <font class="red">￥{{item.min_unit_price}}</font> -
                <font class="greed">￥{{item.max_unit_price}}</font>
              </span>
            </h4>
            <p class="weui-media-box__desc" style="text-align:right">共 {{item.vendor_count}} 家供应商报价</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="weui-tab__panel">
      <div class="weui-cells__title">近3月供货商报价情况</div>
      <purchase-list
        v-infinite-scroll="load"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
        @click="goQuqter"
        :datas="quoteList"
      ></purchase-list>
    </div>
  </div>
</template>
 
 <script>
import Vue from "vue";
export default {
  data() {
    return {
      status: 1,
      type: "1",
      busy: false,
      quote: [],
      quoteList: [],
      quoteOld: {},
      startDate: "2018-11-11",
      endDate: "2018-11-30",
      page: 1
    };
  },
  computed: {
    bizTypes() {
      return this.$store.state.Home.bizTypes;
    }
  },
  methods: {
    tabChange(status) {
      this.status = status;
      if (status == 3) this.load();
    },
    loadList() {
      this.$loading(true);
      this.quote = {};
      this.$GET(
        "GoodsQuoteDetailVendorPriceRange?bizTypeID=" +
          this.type +
          "&startTime=" +
          this.startDate +
          "&endTime=" +
          this.endDate
      ).then(r => {
        this.status = 2;
        this.$loading(false);
        if (r.data.length <= 0) {
          return;
        }
        for (var i of r.data) {
          if (!this.quote[i.goods_class_name])
            Vue.set(this.quote, i.goods_class_name, []);
          this.quote[i.goods_class_name].push(i);
        }
      });
    },
    load() {
      this.busy = true;
      this.$loading(true);
      this.$GET("QuoteListAll?PageIndex=" + this.page + "&PageSize=20").then(
        r => {
          this.quoteList = r.data.map(r => {
            return {
              title: r.vendor_name,
              slot: r.quote_create_time,
              code: "",
              id: r.quote_id
            };
          });
          this.$loading(false);
          if (r.data.length > 20) {
            this.busy = false;
            this.page++;
          }
        }
      );
    },
    selectStartDate() {
      this.$picker.show({
        type: "datePicker",
        date: this.startDate,
        endTime: "3000-09-08",
        startTime: "2000-06-09",
        onOk: date => {
          this.startDate = date;
        }
      });
    },
    selectEndDate() {
      this.$picker.show({
        type: "datePicker",
        date: this.endDate,
        endTime: "3000-09-08",
        startTime: this.startDate,
        onOk: date => {
          this.endDate = date;
        }
      });
    },
    submit() {},
    goContent(item) {
      this.$router.push({
        path: "/adm/quote/content",
        query: {
          id: item.goods_id,
          max: item.max_unit_price,
          min: item.min_unit_price,
          name: item.goods_name,
          count: item.vendor_count
        }
      });
    },
    goQuqter(item) {
      this.$router.push({
        path: "/adm/quote/quoter",
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    this.startDate = year + "-" + (mouth - 2) + "-1";
    this.endDate = year + "-" + mouth + "-30";
  }
};
</script>
 
 