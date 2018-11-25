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
                    <div @click="update(item)" class="weui-cell__bd">
                        <p>{{item.goods_name}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <a class="weui-swiped-btn weui-swiped-btn_warn" @click="del(item.goods_id)" style="color:#fff" href="javascript:">删除</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="weui-tab__panel">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">商品名称</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="addInput.Name" type="text" placeholder="请输入商品名称">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">选择分类</label></div>
                    <div class="weui-cell__bd">
                        <select name="" id="" class="weui-select" v-model="addInput.ClassID">
                            <option v-for="(c,index) in  categoryList" :key="index" :value="c.id">{{c.name}}</option>
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
      addInput: {
        ID: 0,
        Name: "",
        ClassID: 0,
        UnitID: 1
      },
      list: []
    };
  },
  asyncData({ store, route }) {
    return store.dispatch("loadHomeData");
  },
  computed: {
    categoryList() {
      return this.$store.state.Home.categoryList;
    }
  },
  methods: {
    update(item) {
      this.addInput.ID = item.goods_id;
      this.addInput.Name = item.goods_name;
      this.addInput.ClassID = item.goods_class_id;
      this.showTab = 2;
    },
    submit() {
      var api = "add";
      if (this.addInput.ID) {
        api = "update";
      }
      this.$loading(true, "数据提交中");
      this.$UPDATE("Goods/" + api, this.addInput).then(r => {
        this.load();
        this.$loading(false);
        this.addInput = {
          ID: 0,
          Name: "",
          ClassID: 0,
          UnitID: 1
        };
      });
    },
    del(id) {
      this.$dialog("是否删除分类", "删除的数据不可恢复", () => {
        this.$UPDATE("Goods/Disable", { GoodsID: [id] }).then(r => {
          var _list = [];
          for (var i of this.list) {
            if (i.goods_id == id) continue;
            _list.push(i);
          }
          this.list = _list;
        });
      });
    },
    load() {
      this.$GET("Goods", { PageIndex: 1, PageSize: 20 }).then(r => {
        this.list = r.data;
        console.log(r.data);
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style>
</style>
