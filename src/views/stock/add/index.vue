<template>
    <div class="weui-tab">
        <div class="weui-navbar">
            <div @click="showTab=1" class="weui-navbar__item" :class="[showTab==1?'weui-bar__item_on':'']">
                入库
            </div>
            <div @click="showTab=2" class="weui-navbar__item" :class="[showTab==2?'weui-bar__item_on':'']">
                出库
            </div>
        </div>
        <div class="weui-tab__panel">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>商品1</p>
                </div>
                <div class="weui-cell__ft" style="margin-right:10px">
                    <input style="text-align:right;" class="weui-input" value="100" type="number">
                </div>
                <div class="weui-cell__ft">
                    件
                </div>
                <div class="weui-cell__ft">
                    <a class="weui-swiped-btn weui-swiped-btn_warn btn" style="color:#fff;background-color: #2f7dcd;" href="javascript:">{{showTab==1?"入库":"出库"}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showTab: 1,
      addInput: "",
      list: [
        {
          title: "商品1"
        }
      ]
    };
  },
  methods: {
    submit() {
      this.list.push({
        title: this.addInput
      });
    },
    del(index) {
      var _list = [];
      for (var i in this.list) {
        if (i == index) continue;
        _list.push(this.list[i]);
      }
      this.list = _list;
    }
  }
};
</script>

<style>
</style>
