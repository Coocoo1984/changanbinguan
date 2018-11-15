const path = require('path')
const express = require('express');
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { createBundleRenderer } = require('vue-server-renderer')
const app = express();

app.use(express.static('../dist/client'))
app.use(cookieParser())
const root = path.resolve(__dirname);
const dist = path.resolve(root, '../', 'dist');

const template = fs.readFileSync(path.resolve(root, "./index-template.html"), 'utf-8');
const clientManifest = require(path.resolve(dist, 'client', "vue-ssr-client-manifest.json"));
const serverBunlder = require(path.resolve(dist, 'server', "vue-ssr-server-bundle.json"));

app.get("*", (req, res) => {
    const renderer = createBundleRenderer(serverBunlder, {
        template,
        clientManifest: clientManifest,
        basedir: root,
        runInNewContext: false
    })
    const context = {
        url: req.url,
        title: "BeLab",
        cookies: req.cookies
    }
    renderer.renderToString(context).then(html => {
        res.send(html)
    }).catch(err => {
        res.send(err)
    })
});
app.listen(4000)