const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('dotenv').config();

module.exports = {
	mode: 'development',
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},

	devServer: {
		// Serve index.html as the base
		static: path.resolve(__dirname, 'public'),
		host: 'localhost',
		port: 8080,
		// Enable compression
		compress: true,
		// Enable hot reloading
		hot:true,
		historyApiFallback: true,
		proxy: {
		 	"/api": {
		 	  target: 'http://localhost:3000/',
		 	  secure: false,
		 	},
		},
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					}
				},
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},

	plugins: [new HtmlWebpackPlugin({
		title: "Scratch Project",
		template: "./public/index.html"
	  }), new Dotenv(), new MiniCssExtractPlugin()],
};