const path = require('path')
const express = require('express');
const cookieParser = require("cookie-parser");
var request = require('request');
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
// 热加载END
app.use(cookieParser())

const { createBundleRenderer } = require('vue-server-renderer')
const template = fs.readFileSync(path.resolve(__dirname, "./src/index-template.html"), 'utf-8');
var access_token = "";
function get_access_token(callback) {
    request.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww3589f3907e9ad0e5&corpsecret=lOV7xbGrbLKK7k1YgoHln50LSvlIi4Icy3zSH9nrjMQ", (e, r, b) => {
        access_token = JSON.parse(b).access_token;
        if (callback)
            callback();
    });
}
function getWeiXinBody(url, callback) {
    if (access_token == "") {
        get_access_token(() => {
            request.get(url + "&access_token=" + access_token, callback)
        })
    } else {
        request.get(url + "&access_token=" + access_token, (e, r, b) => {
            var result = JSON.parse(b);
            if (result.errcode == 40001) {
                access_token = "";
                getWeiXinBody(url, callback)
            } else {
                callback(e, r, b);
            }
        })
    }
}
function postWeiXinBody(url, params, callback) {
    if (!access_token) {
        get_access_token(() => {
            request.post(url + "?access_token=" + access_token, {
                body: params
            }, callback)
        })
    } else {
        request.post(url + "?access_token=" + access_token, {
            body: params
        }, (e, r, b) => {
            var result = JSON.parse(b);
            if (result.errcode == 40001 || result.errcode == 42001) {
                access_token = "";
                getWeiXinBody(url, params, callback)
            } else {
                callback(b);
            }
        })
    }
}
app.get("/weixin/*", (req, res) => {
    getWeiXinBody("https://qyapi.weixin.qq.com/cgi-bin/" + req.url.replace("/weixin/", ""), (e, r, b) => {
        res.send(b);
    })
});
app.post("/weixin/*", (req, res) => {
    postWeiXinBody("https://qyapi.weixin.qq.com/cgi-bin/" + req.url.replace("/weixin/", ""), JSON.stringify(req.body), (error, response, body) => {
        res.send(body);
    })
});
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





