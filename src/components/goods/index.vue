<template>
  <div class="weui-tab main">
    <div class="weui-navbar">
      <div
        v-for="b in bizTypes"
        :key="b.biz_type_id"
        :class="b.biz_type_id==current.bizType?'weui-bar__item_on':''"
        @click="changeBiz(b.biz_type_id)"
        class="weui-navbar__item"
      >{{b.biz_type_name}}</div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-cell search">
        <div class="weui-cell__hd">
          <label class="weui-label">搜索：</label>
        </div>
        <div class="weui-cell__bd">
          <autocomplete
            url="0"
            :onShouldGetData="getData"
            class="weui-input"
            anchor="goods_name"
            label="writer"
            :options="options"
            :onSelect="onSelect"
          ></autocomplete>
        </div>
      </div>
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
          <div :id="'g_'+g.goods_id" class="item" v-for="g in goods" :key="g.goods_id">
            <span>{{g.goods_name}}（{{g.goods_unit_name}}）</span>
            <div class="number">
              <i @click="changeNumber(g.goods_id,-1)" class="iconfont icon-ios-remove-circle"></i>
              <input
                @change="change(g.goods_id,$event.srcElement.value)"
                type="number"
                :value="orders[g.goods_id+'']||0"
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
import Autocomplete from "vue2-autocomplete-js";
export default {
  components: {
    Autocomplete
  },
  data() {
    return {
      current: {
        bizType: 1,
        goodclass: null
      },
      orders: {},
      options: [],
      height: 100
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
    },
    initData: {
      deep: true,
      handler() {
        this.orders = JSON.parse(JSON.stringify(this.initData));
      }
    },
    staticBizType() {
      if (this.staticBizType) this.current.bizType = this.staticBizType;
    }
  },
  methods: {
    change(good_id, number) {
      Vue.set(this.orders, good_id + "", number);
    },
    getData(v) {
      if (v)
        this.options = this.allGoods.filter(g => g.goods_name.indexOf(v) >= 0);
      else this.options = [];
    },
    onSelect(v) {
      if (v) {
        this.current.goodclass = v.goods_class_id;
        this.$nextTick(() => {
          window.setTimeout(() => {
            this.scroller(v.goods_id, 300);
          }, 200);
        });
      }
    },
    changeNumber(good_id, number) {
      Vue.set(
        this.orders,
        good_id,
        parseInt(
          this.orders[good_id.toString()] ? this.orders[good_id.toString()] : 0
        ) + number
      );
    },
    changeBiz(i) {
      if (this.staticBizType) return;
      this.current.bizType = i;
    },
    scroller(el, duration) {
      if (typeof el != "object") {
        el = document.getElementById("g_" + el);
      }
      if (!el) return;
      el.scrollIntoView();
    }
  },
  props: {
    initData: {
      type: Object,
      default: () => {}
    },
    staticBizType: {
      type: Number | String,
      default: ""
    }
  },
  mounted() {
    this.height = document.body.scrollHeight - 100;
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
    },
    allGoods() {
      return this.$store.state.Home.goods;
    }
  }
};
</script>


<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.autocomplete {
  background-color: #ffffff;
  border: 1px #c7c7c7 solid;
}
.autocomplete-anchor-text {
  color: #000;
  font-weight: normal;
}
.main {
  height: 527px;
  overflow-x: hidden;
  overflow-y: auto;
}
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
.search {
  background-color: #f8f8f8;
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