import Vue from "vue";
import "es6-promise/auto";
import Calendar from "vue2-datepick";
Vue.use(Calendar);
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);
import { createApp } from "./app";

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  }
});

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

window.app = app;
router.onReady(() => {
  router.beforeEach((to, from, next) => {
    if (to.query.weichatID) {
      next();
    } else {
      to.query.weichatID = store.state.User.weichatID || window.userID;
      next({ path: to.path, query: to.query });
    }
  });
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next();
      })
      .catch(e => {
        next(e);
      });
  });

  app.$mount("#app");
});
