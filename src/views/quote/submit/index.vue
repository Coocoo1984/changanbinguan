<template>
    <div>
        <div class="weui-cells__title">筛选项</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购类型：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="type">
                        <option value="0">全部</option>
                        <option value="1">食材</option>
                        <option value="2">办公用品</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="search" href="javascript:">查询筛选</a>
        </div>
        <div class="weui-cells__title">采购入库项目(3): 蔬菜类</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
        </div>
        <div class="weui-cells__title">采购入库项目(3): 佐料类</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">番茄</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="0.00">
                </div>
            </div>
            <div class="weui-btn-area">
            </div>
        </div>

        <div class="weui-btn-area flex">
            <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">提交价格</a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      type: "1"
    };
  },
  methods: {
    submit() {
      this.$dialog("是否提交", "是否提交报价", () => {});
    },
    search() {}
  }
};
</script>
<style scoped>
.weui-input {
  text-align: right;
}
.flex {
  position: fixed;
  bottom: 0px;
  width: 92%;
  background-color: #ffffff;
  z-index: 1000;
}
.flex a {
  width: 100%;
}
</style>

