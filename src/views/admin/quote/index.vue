 <template>
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item" @click="tabChange(1)" :class="[status==1?'weui-bar__item_on':'']">
                报价筛选
            </div>
            <div class="weui-navbar__item" @click="tabChange(2)" :class="[status==2?'weui-bar__item_on':'']">
                报价单
            </div>
            <div class="weui-navbar__item" @click="tabChange(3)" :class="[status==3?'weui-bar__item_on':'']">
                报价记录
            </div>
        </div>
        <div v-if="status==1" class="weui-tab__panel">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">类型：</label></div>
                    <div class="weui-cell__bd">
                        <select v-model="type">
                            <option value="1">食材</option>
                            <option value="2">办公用品</option>
                        </select>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">报价时间：</label></div>
                    <div class="weui-cell__bd">
                        <div class="weui-flex">
                            <div class="weui-flex__item">
                                <div class="placeholder" @click="selectStartDate()">{{startDate}} 到 </div>
                            </div>
                            <div class="weui-flex__item">
                                <div class="placeholder" @click="selectEndDate()"> {{endDate}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="weui-btn-area">
                    <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确定</a>
                </div>
            </div>
        </div>
        <div v-else-if="status==2" class="weui-tab__panel">
            <div class="weui-panel weui-panel_access">
                <div class="weui-panel__hd">蔬菜类（17）</div>
                <div class="weui-panel__bd">
                    <div @click="goContent" class="weui-media-box weui-media-box_text">
                        <h4 class="weui-media-box__title">土豆
                            <span class="menmoy">
                                <font class="red">￥2.5</font> - <font class="greed">￥3.5</font>
                            </span>
                        </h4>
                        <p class="weui-media-box__desc" style="text-align:right">共 5 家供应商报价</p>
                    </div>
                    <div class="weui-media-box weui-media-box_text">
                        <h4 class="weui-media-box__title">番茄
                            <span class="menmoy">
                                <font>￥2.5</font> - <font>￥3.5</font>
                            </span>
                        </h4>
                        <p class="weui-media-box__desc" style="text-align:right">共 5 家供应商报价</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="weui-tab__panel">
            <div class="weui-cells__title">近3月供货商报价情况</div>
            <purchase-list v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10" @click="goQuqter" :datas="quote"></purchase-list>
        </div>
    </div>
</template>
 
 <script>
export default {
  data() {
    return {
      status: 1,
      type: "1",
      busy: false,
      quote: [
        {
          title: "XXX供货商",
          slot: "2018-11-11 12:11:22"
        },
        {
          title: "XXX供货商",
          slot: "2018-11-11 12:11:22"
        }
      ],
      startDate: "2018-11-11",
      endDate: "2018-11-30"
    };
  },
  methods: {
    tabChange(status) {
      this.status = status;
      if (status == 3) this.load();
    },
    load() {
      this.busy = false;
      this.$loading(true);
      setTimeout(() => {
        for (var i = 0; i < 10; i++)
          this.quote.push({
            title: "XXX供货商",
            slot: "2018-11-11 12:11:22"
          });
        this.$loading(false);
        this.busy = true;
      }, 500);
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
    goContent() {
      this.$router.push({
        path: "/adm/quote/content",
        query: {
          id: 1
        }
      });
    },
    goQuqter(item) {
      this.$router.push({
        path: "/adm/quote/quoter",
        query: {
          id: 1
        }
      });
    }
  }
};
</script>
 
 