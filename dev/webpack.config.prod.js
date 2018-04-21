const merge = require( 'webpack-merge' );
const path	= require( 'path');
const baseConfig = require( './webpack.config.common.js' );
const MODE = 'production';

let vars = require('./webpack.variables.js');

vars.PATHS.output.path = path.resolve(__dirname,'../dist');
vars.enabledSourceMap = false;

let config = merge( baseConfig, {
	mode: MODE,

	output: {
		path: vars.PATHS.output.path
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