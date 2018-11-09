const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
module.exports = {
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-dynamic-import'],
					presets: [
						[
							'env',
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
						css: 'vue-style-loader!css-loader',
						less: 'vue-style-loader!css-loader!less-loader',
					},
					postLoaders: {
						html: 'babel-loader'
					}
				}
			},
			{
				test: /\.(less|css)$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(gif|jpg|png|woff|eot|ttf|svg)$/,
				loader: 'url-loader?limit=1024&name=res/[name].[ext]'
			}
		]
	},
	target: 'node',
	devtool: '#source-map',
	entry: {
		app: './src/entry-server.js',
	},
	output: {
		filename: 'server-bundle.js',
		path: path.resolve(__dirname, 'dist', 'server'),
		libraryTarget: 'commonjs2',
		publicPath: "/"
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'vue': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src'),
			'@assects': path.resolve(__dirname, 'src', 'assects')
		}
	},
	mode: 'development',
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development"),
			"process.env.Mode": "Client"
		}),
		new VueSSRServerPlugin()
	]
};
