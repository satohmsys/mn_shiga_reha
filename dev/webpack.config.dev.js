const merge = require( 'webpack-merge' );
const path	= require( 'path');
const baseConfig = require( './webpack.config.common.js' );
const MODE = 'development';

let vars = require('./webpack.variables.js');

let config = merge( baseConfig, {
	mode: MODE,
	devtool: 'source-map',

	devServer: {
		contentBase: vars.PATHS.devServer.contentBase,
		hot: true,
		inline: true,
		compress: true,
		open: true,
		port: 3000,
		host: '0.0.0.0'
	},

	module: {
		rules:[
			{
				test: /\.(eot|woff|ttf)$/,
				exclude: /node_modules\/^(slick-carousel)/,
				use: {
					loader: 'file-loader',
					options: {
						publicPath: '/',
						context: 'src',
						name: vars.PATHS.dir.output + '/fonts/[name].[ext]'
					}
				}
			},
			{
				test: /\.( gif|jpg|png|svg|ico)$/,
				use: {
					loader: 'file-loader',
					options: {
						publicPath: '/',
						context: 'src',
						name: vars.PATHS.dir.output + '/[path][name].[ext]'
					}
				}
			}
		]
	}
});

module.exports = config;