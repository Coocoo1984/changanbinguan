<template>
  <div v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="more" v-if="!notData&&!more">没有更多数据</div>
    <div class="not" v-else-if="notData">没有数据</div>
  </div>
</template>

<script>
export default {
  props: {
    busy: Boolean,
    more: Boolean,
    notData: Boolean,
    load: Function
  },
  watch: {
    notData() {
      console.log(this.notData);
    }
  }
};
</script>

<style>
.more {
  text-align: center;
}
.not {
  text-align: center;
}
</style>
