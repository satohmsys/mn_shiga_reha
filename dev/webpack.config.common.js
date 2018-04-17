const 	webpack = require( 'webpack' ),
		path = require( 'path' ),
		ExtractTextPlugin = require( 'extract-text-webpack-plugin' ), 
		HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
		CopyWebpackPlugin = require( 'copy-webpack-plugin' );

let vars  = require( './webpack.variables.js' );


let config = {
	
	entry: path.resolve( __dirname, './main.js'),

	output: {
		path: vars.PATHS.output.path,
		publicPath: '/',
		filename: vars.PATHS.dir.output + '/js/[name].js',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude : /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['env', {'modules': false}],
							'es2015'
						]
					}
				}]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								url: true,
								minimize: true,
								sourceMap: vars.enabledSourceMap,
								importLoaders: 2
							}

						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: ( loader )=>[ require( 'autoprefixer') ],
								sourceMap: vars.enabledSourceMap
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: vars.enabledSourceMap,
								minimize: true
							}
						}
					]
				})
			},
			{
				test: /\.ejs$/,
				exclude : /node_modules/,
				use: [
					{
						loader: 'html-loader'
					},
					{
						loader: 'ejs-html-loader'
					}
				]
			}
		]
	},

	// optimization: {

	// },

	plugins: [
		new ExtractTextPlugin({
			filename: vars.PATHS.dir.output + '/css/main.css',
			allChunks: true
		}) ,
	    new CopyWebpackPlugin([{
	      from: './src/img/',
	      to: vars.PATHS.dir.output + '/img'
	    }]),			
        new HtmlWebpackPlugin({ 
			filename: 'index.html',
			// favicon: './src/img/common/favicon.ico',
			template: './src/ejs/index.ejs',
			// inject: 'head',
		}),

	],

	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss' ]
	}
}

module.exports = config;