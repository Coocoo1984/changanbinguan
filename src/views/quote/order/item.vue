<template>
    <div>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单详情：</label>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单方：</label>
                    <span class="weui-form-preview__value  text-left">XXXXX食堂</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单日期：</label>
                    <span class="weui-form-preview__value text-left">2018-11-13 12:23</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">联系电话：</label>
                    <span class="weui-form-preview__value text-left">
                        <a href="tel:13600000000">13600000000</a>
                    </span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">地址：</label>
                    <span class="weui-form-preview__value text-left">XXXXXXXXXXXXXXXXXXX</span>
                </div>
            </div>
        </div>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单项目(3): 蔬菜类</label>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">番茄</label>
                    <span class="weui-form-preview__value">总入库：34kg</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">黄瓜</label>
                    <span class="weui-form-preview__value">总入库：34kg</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">金针菇</label>
                    <span class="weui-form-preview__value">总入库：34kg</span>
                </div>
            </div>
        </div>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单项目(3): 蔬菜类</label>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">番茄</label>
                    <span class="weui-form-preview__value">总入库：34kg</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">黄瓜</label>
                    <span class="weui-form-preview__value">总入库：34kg</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">金针菇</label>
                    <span class="weui-form-preview__value">总入库：34kg</span>
                </div>
            </div>
        </div>
        <div v-if="status<3" class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">{{btnText}}</a>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    status() {
      return this.$route.query.status;
    },
    btnText() {
      return this.status == 1 ? "确认订单" : "确认发货";
    }
  },
  methods: {
    submit() {}
  }
};
</script>
<style scoped>
.text-left {
  text-align: left;
}
</style>

<style>
</style>
