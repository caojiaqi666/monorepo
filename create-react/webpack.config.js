/*
 * @Author: anjiang
 * @Date: 2023-01-29
 * @LastEditors: anjiang
 * @LastEditTime: 2023-01-30
 * @Description:
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	// context: path.join(__dirname, 'src'),
	entry: path.resolve(__dirname, "./src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	mode: "none",
	module: {
		rules: [
			{
				test: /\.jsx$/,
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-react",
							{
								runtime: "automatic",
							},
						],
					],
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.tsx$/,
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-react",
							{
								runtime: "automatic",
							},
						],
						"@babel/preset-typescript",
					],
				},
			},
		],
	},
	devServer: {
		hot: true,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
		// 此处用来解决process is not define的问题
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			"process.env.MY_ENV": JSON.stringify(process.env.MY_ENV),
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
	},
};
