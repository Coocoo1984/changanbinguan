<template>
    <div class="weui-tab">
        <div class="weui-navbar">
            <div @click="showTab=1" class="weui-navbar__item" :class="[showTab==1?'weui-bar__item_on':'']">
                商品名录
            </div>
            <div @click="showTab=2" class="weui-navbar__item" :class="[showTab==2?'weui-bar__item_on':'']">
                添加商品
            </div>
        </div>
        <div v-if="showTab==1" class="weui-tab__panel">
            <div class="weui-cells">
                <div v-for="(item,index) in list" :key="index" class="weui-cell">
                    <div class="weui-cell__bd">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <a class="weui-swiped-btn weui-swiped-btn_warn" @click="del(index)" style="color:#fff" href="javascript:">删除</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="weui-tab__panel">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">商品名称</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="addInput" type="text" placeholder="请输入商品名称">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">选择分类</label></div>
                    <div class="weui-cell__bd">
                        <select name="" id="" class="weui-select">
                            <option value="">分类1</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">确定</a>
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
      this.$dialog("是否删除分类", "删除的数据不可恢复", () => {
        var _list = [];
        for (var i in this.list) {
          if (i == index) continue;
          _list.push(this.list[i]);
        }
        this.list = _list;
      });
    }
  }
};
</script>

<style>
</style>
