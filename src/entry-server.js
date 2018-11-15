import { createApp } from './app'

const isDev = true //process.env.NODE_ENV !== 'production'

export default context => {
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const { app, router, store } = createApp()
        const { url, cookies } = context
        const { fullPath } = router.resolve(url).route
        if (fullPath !== url) {
            //return reject({ url: fullPath })
            router.push(fullPath)
        } else {
            router.push(url)
        }
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                context.state = store.state;
                resolve(app)
            }).catch((e) => {
                console.log(e)
                reject();
            })
        }, reject)
    })
}