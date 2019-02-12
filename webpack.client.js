const webpack = require("webpack");
const path = require("path");
const htmlWebPackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const VueSSRClinetPlugin = require("vue-server-renderer/client-plugin");
module.exports = {
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        options: {
          plugins: ["syntax-dynamic-import"],
          presets: [
            [
              "env",
              {
                modules: false
              }
            ]
          ]
        },
        test: /\.js$/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: "vue-style-loader!css-loader",
            less: "vue-style-loader!css-loader!less-loader"
          },
          postLoaders: {
            html: "babel-loader"
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=1024&name=res/[name].[ext]"
      }
    ]
  },

  entry: {
    app: "./src/entry-client.js"
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "dist", "client"),
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"), //本地服务器所加载的页面所在的目录
    inline: true, //实时刷新,
    port: 8082,
    host: "localhost",
    historyApiFallback: {
      index: "index.html"
    }
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src"),
      "@assects": path.resolve(__dirname, "src", "assects")
    }
  },
  mode: "development",
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: -50
        }
      },
      minChunks: 1,
      minSize: 30000
    },
    runtimeChunk: { name: "manifest" }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
      chunkFilename: "css/chunk-[name].css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.Mode": "Client"
    }),
    new VueSSRClinetPlugin()
  ]
};
