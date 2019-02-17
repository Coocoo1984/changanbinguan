<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div
        v-for="b in bizTypes"
        :key="b.biz_type_id"
        :class="b.biz_type_id==current.bizType?'weui-bar__item_on':''"
        @click="current.bizType=b.biz_type_id"
        class="weui-navbar__item"
      >{{b.biz_type_name}}</div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-flex box">
        <div class="categroy">
          <ul>
            <li
              v-for="(c,index) in categroys"
              :key="c.id"
              :class="c.id==current.goodclass||(current.goodclass==null&&index==0)?'active':''"
              @click="current.goodclass=c.id"
            >{{c.name}}</li>
          </ul>
        </div>
        <div class="commodity">
          <div class="item" v-for="g in goods" :key="g.goods_id">
            <span>{{g.goods_name}}（{{g.goods_unit_name}}）</span>
            <div class="number">
              <i @click="changeNumber(g.goods_id,-1)" class="iconfont icon-ios-remove-circle"></i>
              <input
                @change="change(g.goods_id,$event.srcElement.value)"
                type="number"
                :value="orders[g.goods_id+'']"
              >
              <i @click="changeNumber(g.goods_id,1)" class="iconfont icon-ios-add-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      current: {
        bizType: 1,
        goodclass: null
      },
      orders: {}
    };
  },
  watch: {
    categroys() {
      if (this.categroys[0]) this.current.goodclass = this.categroys[0].id;
      else this.current.goodclass = null;
    },
    orders: {
      deep: true,
      handler() {
        for (var k in this.orders) {
          if (this.orders[k] <= 0) {
            Vue.delete(this.orders, k);
          }
        }
        this.$emit("change", JSON.parse(JSON.stringify(this.orders)));
      }
    }
  },
  methods: {
    change(good_id, number) {
      Vue.set(this.orders, good_id + "", number);
    },
    changeNumber(good_id, number) {
      Vue.set(
        this.orders,
        good_id,
        parseInt(
          this.orders[good_id.toString()] ? this.orders[good_id.toString()] : 0
        ) + number
      );
    }
  },
  props: {
    initData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    bizTypes() {
      return this.$store.state.Home.bizTypes;
    },
    categroys() {
      return this.$store.state.Home.categoryList.filter(
        i => i.biz_type_id == this.current.bizType
      );
    },
    goods() {
      return this.$store.state.Home.goods.filter(
        i => i.goods_class_id == this.current.goodclass
      );
    }
  },
  mounted() {
    this.orders = this.initData;
  }
};
</script>


<style>
.categroy {
  flex: 1;
}
.categroy ul {
}
.categroy ul li {
  font: 14px;
  font-weight: normal;
  line-height: 34px;
  padding: 0 10px;
  background-color: #f8f8f8;
}
.categroy ul li.active {
  background-color: #ffffff;
  font-weight: bold;
}
.commodity {
  flex: 2;
  background-color: #ffffff;
}
.commodity .item {
  padding: 5px 10px;
  width: 100%;
  line-height: 33px;
}
.commodity .item i {
  color: #467db9;
  font-size: 20px;
}
.commodity .item input {
  width: 20px;
  height: 20px;
  border: 0px;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  text-align: center;
}
.commodity .item .number {
  float: right;
  padding-right: 25px;
}
</style>