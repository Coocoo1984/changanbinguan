<template>
    <div>
        <div class="weui-cells__title">筛选项</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">订单类型：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="type">
                        <option value="0">全部</option>
                        <option value="1">食材</option>
                        <option value="2">办公用品</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">订单日期：</label></div>
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
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">订单状态：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="status">
                        <option value="0">全部</option>
                        <option value="1">食材</option>
                        <option value="2">办公用品</option>
                    </select>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:">查询筛选</a>
            </div>
        </div>
        <div class="weui-panel__hd">订单列表：</div>
        <div class="weui-panel__bd">
            <div @click="click(1)" class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">[待确认] XXXXX食堂
                    <span class="desc">23 项</span>
                </h4>
                <p class="weui-media-box__desc">2018-11-12 21:21</p>
            </div>
            <div @click="click(1)" class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">[待确认] XXXXX食堂<span class="desc">23 项</span></h4>
                <p class="weui-media-box__desc">2018-11-12 21:21</p>
            </div>
            <div @click="click(2)" class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">[已确认] XXXXX食堂<span class="desc">23 项</span></h4>
                <p class="weui-media-box__desc">2018-11-12 21:21</p>
            </div>
            <div @click="click(3)" class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">[已发货] XXXXX食堂<span class="desc">23 项</span></h4>
                <p class="weui-media-box__desc">2018-11-12 21:21</p>
            </div>
            <div @click="click(3)" class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title">[已发货] XXXXX食堂<span class="desc">23 项</span></h4>
                <p class="weui-media-box__desc">2018-11-12 21:21</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      type: "0",
      status: "0",
      startDate: "2018-11-11",
      endDate: "2018-11-30"
    };
  },
  methods: {
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
    click(status) {
      this.$router.push({
        path: "/quote/order/item",
        query: {
          status: status
        }
      });
    }
  }
};
</script>

<style>
.desc {
  float: right;
}
</style>
