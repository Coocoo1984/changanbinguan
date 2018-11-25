<template>
    <div>
        <div class="weui-cells__title">添加采购项</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购类型：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="good_class_id">
                        <option v-for="(c,index) in categoryList" :key="index" :value="c.id">{{c.name}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">采购项：</label></div>
                <div class="weui-cell__bd">
                    <select v-model="good_id">
                        <option v-for="(c,index) in goods" :key="index" :value="c.goods_id">{{c.goods_name}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">数量：</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="number" type="number" pattern="[0-9]*" placeholder="数量">
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" @click="submit" href="javascript:">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      good_class_id: 0,
      good_id: 0,
      datas: [],
      good_class: [],
      number: 0
    };
  },
  asyncData({ store, route }) {
    return store.dispatch("loadHomeData");
  },
  computed: {
    categoryList() {
      return this.$store.state.Home.categoryList;
    },
    goods() {
      if (this.good_class_id == 0) return this.datas;
      return this.datas.filter(i => i.goods_class_id == this.good_class_id);
    }
  },
  methods: {
    submit() {
      this.$store.commit("pushAddData", {
        goods_id: this.good_id,
        goods_class_id: this.good_class_id,
        count: this.number,
        goods_unit_name: "KG",
        goods_name: this.datas.filter(i => i.goods_id == this.good_id)[0]
          .goods_name
      });
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$GET("Goods", {}).then(r => {
      this.datas = r.data;
    });
  }
};
</script>

