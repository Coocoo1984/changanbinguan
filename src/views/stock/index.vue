<template>
    <div>
        <div class="weui-cells__title">统计查询项</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购类型：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="type">
                        <option value="1">食材</option>
                        <option value="2">办公用品</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购项：</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="name" type="text" pattern="[0-9]*" placeholder="请输入采购项">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">时间段：</label></div>
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
                <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">查询入库</a>
            </div>
        </div>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">分类：<span class="categroy">食材</span></label>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">土豆</label>
                    <span class="weui-form-preview__value">总入库：50KG</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">洋芋</label>
                    <span class="weui-form-preview__value">总入库：50KG</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">番茄</label>
                    <span class="weui-form-preview__value">总入库：50KG</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      type: "1",
      name: "",
      number: 0,
      startDate: "2018-11-11",
      endDate: "2018-11-21"
    };
  },
  computed: {
    btnStyle() {
      return this.$route.query.style;
    },
    showUser() {
      return this.$route.query.show;
    }
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
    submit() {
      this.$router.push("/purchase/statistics/result");
    },
    download() {}
  }
};
</script>

