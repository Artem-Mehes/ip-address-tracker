const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	plugins: [
		new HTMLPlugin({
			template: './public/index.html',
			favicon: './public/favicon.ico'
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|ttf|ico)$/,
				use: ['file-loader']
			}
		]
	}
};
