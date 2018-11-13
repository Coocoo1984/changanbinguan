const path = require('path')
const express = require('express');
const cookieParser = require("cookie-parser");
const fs = require("fs");
const app = express();
// 热加载
const webpack = require("webpack")
const devMiddle = require("webpack-dev-middleware");
const hotMiddle = require("webpack-hot-middleware");
const client = require("./webpack.client")
client.entry.webpack = "webpack-hot-middleware/client?noInfo=true&reload=true"
client.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);
const complier = {
    client: webpack(client),
    server: webpack(require("./webpack.server"))
}
const middles = {
    dev: {
        client: devMiddle(complier.client, {
            publicPath: client.output.publicPath,
        }),
        server: devMiddle(complier.server, {
            publicPath: client.output.publicPath,
        })
    },
    hot: {
        client: hotMiddle(complier.client, {
            publicPath: client.output.publicPath,
        }),
        server: hotMiddle(complier.server)
    }
}
app.use(middles.dev.client, middles.hot.client)
app.use(middles.dev.server)
// 热加载END
app.use(cookieParser())

const { createBundleRenderer } = require('vue-server-renderer')
const template = fs.readFileSync(path.resolve(__dirname, "./src/index-template.html"), 'utf-8');

app.get("*", (req, res) => {
    const clientManifest = complier.client.outputFileSystem.readFileSync(path.resolve(__dirname, 'dist', 'client', "vue-ssr-client-manifest.json"));
    const serverBunlder = complier.server.outputFileSystem.readFileSync(path.resolve(__dirname, 'dist', 'server', "vue-ssr-server-bundle.json"));
    const renderer = createBundleRenderer(JSON.parse(serverBunlder), {
        template,
        clientManifest: JSON.parse(clientManifest),
        basedir: path.resolve(__dirname, 'dist'),
        // recommended for performance
        runInNewContext: false
    })
    const context = {
        url: req.url,
        title: "Vue",
        cookies: req.cookies
    }
    
    renderer.renderToString(context).then(html => {
        res.send(html)
    }).catch(err => {
        res.send(err)
    })
});

app.listen(8080)





