<template>
  <div id="app" class="page">
    <div class="vux-header" style="width: 100%; position: absolute; left: 0px; top: 0px; z-index: 100;">
      <div v-if="showBack" class="vux-header-left" @click="Back"><a class="vux-header-back"></a>
        <div class="left-arrow"></div>
      </div>
      <h1 class="vux-header-title"><span>采购管理系统</span></h1>
    </div>
    <div class="body">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showBack: false
    };
  },
  methods: {
    Back() {
      history.back();
    }
  },
  watch: {
    $route(to, from) {
      if (to.path != "/" || to.path != "") {
        this.showBack = true;
      }
    }
  },
  mounted() {}
};
</script>

<style>
.vux-header {
  position: relative;
  padding: 3px 0;
  box-sizing: border-box;
  background-color: #35495e;
}
.vux-header .vux-header-left {
  left: 18px;
}
.vux-header .vux-header-left .vux-header-back {
  padding-left: 16px;
}

.vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {
  float: left;
  margin-right: 8px;
  color: #ccc;
}
.vux-header .vux-header-left .left-arrow {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 8px;
  left: -1px;
}
.vux-header .vux-header-left .left-arrow:before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid #ccc;
  border-width: 1px 0 0 1px;
  -webkit-transform: rotate(315deg);
  transform: rotate(315deg);
  top: 8px;
  left: 7px;
}
.vux-header-title-area,
.vux-header .vux-header-title {
  margin: 0 88px;
  height: 40px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vux-header .vux-header-title {
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
}
.vux-header .vux-header-title > span {
  display: inline-block;
}
.body {
  padding-top: 49px;
}
._v-container {
  padding-top: 49px;
}
</style>

