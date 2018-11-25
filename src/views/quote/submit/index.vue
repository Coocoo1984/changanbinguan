<template>
    <div>
        <div class="weui-cells__title">筛选项</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购类型：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="goods_class_id">
                        <option :value="0">全部</option>
                        <option v-for="(i,index) in goods_class" :key="index" :value="i.id">{{i.name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="search" href="javascript:">查询筛选</a>
        </div>
        <template v-for="(gc,index) in goods_class_list" v-if="getGoods(gc.id).length>0">
        <div class="weui-cells__title" :key="'t'+index">采购入库项目({{getGoods(gc.id).length}}): {{gc.name}}</div>
        <div class="weui-cells weui-cells_form" :key="'item'+index">
            <div class="weui-cell" v-for="(g,index) in getGoods(gc.id)" :key="index">
                <div class="weui-cell__hd"><label class="weui-label" style="width:200px">{{g.GoodsName}}</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="g.Price" type="number" placeholder="0.00">
                </div>
            </div>
        </div>
        </template>
        <div style="padding:55px"></div>
        <div class="weui-btn-area flex">
            <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">提交价格</a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      goods_class_id: 0,
      goods: [],
      vendorID: 1
    };
  },
  computed: {
    goods_class_list() {
      if (this.goods_class_id == 0) return this.$store.state.Home.categoryList;
      return this.$store.state.Home.categoryList.filter(
        i => i.id == this.goods_class_id
      );
    },
    goods_class() {
      return this.$store.state.Home.categoryList;
    }
  },
  methods: {
    submit() {
      var g = this.goods.filter(i => i.Price);
      if (g.length <= 0) {
        return;
      }
      this.$dialog("是否提交", "是否提交报价", () => {
        this.$loading(true, "数据提交中");
        this.$UPDATE("Quote/Add", {
          BizTypeID: 1,
          Details: this.goods.filter(i => i.Price),
          VendorID: this.vendorID,
          Name: "供货商",
          Code: "xxx"
        }).then(r => {
          this.$loading(false);
        });
      });
    },
    search() {},
    getGoods(id) {
      return this.goods.filter(g => g.goods_class_id == id);
    }
  },
  mounted() {
    this.$GET("Goods", {}).then(r => {
      this.goods = r.data.map(i => {
        return {
          goods_class_id: i.goods_class_id,
          GoodsID: i.goods_id,
          GoodsName: i.goods_name,
          Price: ""
        };
      });
    });
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

