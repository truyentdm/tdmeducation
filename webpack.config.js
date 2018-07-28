const path = require("path")
module.exports = {
	entry: ['babel-polyfill', './views/src/App.js'],
	output: {
		path: path.join(__dirname,'views/public/js'),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: '/node_modules/'
			},
			{
				loader: 'file-loader',
				test: /\.jpe?g$ | \.gif$ | \.png$ | \.svg | \.woff$ | \.woff2 | \.eot$ | \.ttf$ | \.wav$ | \.mp3$ | \.mp4$ | \.ico$/ 
			},
			{
				use: ['style-loader','css-loader'],
				test: /\.css$/
			}
		]
	}
}
//{
// 	bundle: "./views/src/App.js"
// },