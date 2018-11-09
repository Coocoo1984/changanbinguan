import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
});

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
window.app = app;
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        //app.$progress(10);
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            //app.$progress(100);
            return next()
        }
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                //app.$progress(100);
                let timer = setInterval(() => {
                    let osTop =
                        document.documentElement.scrollTop || document.body.scrollTop;
                    let ispeed = Math.floor(-osTop / 3);
                    window.scrollTo(0, osTop + ispeed);
                    if (osTop === 0) {
                        clearInterval(timer);
                        timer = null;
                        window.scrollTo(0, 0);
                    }
                }, 30)
                next()
            })
            .catch((e) => {
                //app.$progress(100);
                next(e);
            })
    })
    app.$mount('#app')
}) 
