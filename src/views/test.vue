<template>
  <div class="weui-flex box">
    <div class="categroy">
      <ul>
        <li>分类1</li>
        <li class="active">分类2</li>
      </ul>
    </div>
    <div class="commodity">
      <div class="item">
        <span>name:</span>
        <div class="number">
          <i class="iconfont icon-ios-remove-circle"></i>
          <input type="number">
          <i class="iconfont icon-ios-add-circle"></i>
        </div>
      </div>
      <div class="item">
        <span>name:</span>
        <div class="number">
          <i class="iconfont icon-ios-remove-circle"></i>
          <input type="number">
          <i class="iconfont icon-ios-add-circle"></i>
        </div>
      </div>
      <div class="item">
        <span>name:</span>
        <div class="number">
          <i class="iconfont icon-ios-remove-circle"></i>
          <input type="number">
          <i class="iconfont icon-ios-add-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
}
.commodity .item .number {
  float: right;
  padding-right: 25px;
}
</style>
