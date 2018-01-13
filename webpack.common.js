const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {

	entry: {
  		editor: './src/main.js',
  		parser: './src/parser/index.js'
  		//third_party: ['vue']
  	},
	output: { // 输出，只可指定一个输出配置
	    chunkFilename: '[name].bundle.js',// 指定非入口块文件输出的名字
	    path: path.resolve(__dirname, 'dist/') // 输出文件所在的目录
  	},
  	devtool: 'inline-source-map',
	module: {
		rules: [

			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use:['css-loader','postcss-loader','less-loader'],
					fallback : 'style-loader'
				})
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						less: ExtractTextPlugin.extract({
							use: ['css-loader','postcss-loader', 'less-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			{
		        test: /\.css$/,
		        exclude: /node_modules/,
		        use: ExtractTextPlugin.extract({
		        	use:['css-loader','postcss-loader'],
		        	fallback : 'style-loader'
		        })
      		},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
	        { // 增加加载图片的规则
	          test: /\.(png|svg|jpg|gif)$/,
	          use: [
	            'file-loader?name=[name].[ext]&outputPath=assets/img/'
	          ]//,
	          //include: [path.resolve(__dirname, "src/editor")]
	        },
	        { // 增加加载字体的规则
	          test: /\.(woff|woff2|eot|ttf|otf)$/,
	          use: ['file-loader?name=[name].[ext]&outputPath=assets/fonts/&publicPath=../']//,
	         // include: [path.resolve(__dirname, "src/editor")]
	        }

		]
	},
	plugins: [
	new ExtractTextPlugin({
		filename: 'css/[name].css'
	}),
	// 每次生成dist前先清空dist目录下的的内容
	new CleanWebpackPlugin(['dist/*'], {
		root: path.resolve(__dirname),
		verbose: true,
		dry: false
	}),
    new HtmlWebpackPlugin({
  		title: '政通表单定制系统',
  		filename: 'index.html',
  		template: './src/template/index.html'
  	}),
  	// new webpack.ProvidePlugin({ // 设置全局变量
   //    $: 'jquery',
   //    jQuery: 'jquery'
   //  }),
    new webpack.ProgressPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name:'third-party',
      //chunks: ['editor','parser'],
      minChunks: function (module, count) {
          return (
            module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
          )
        }
      }),
    // webpack自身运行时代码
	new webpack.optimize.CommonsChunkPlugin({
		name: 'webpack-runtime'
	})
	],
	resolve: {
		extensions: ['.js', '.vue', '.less'],
		alias: {
			'less$': path.resolve(__dirname, 'src/assets/less'),
			'components$': path.resolve(__dirname, 'src/components'),
			'vue$': path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
			'store': path.resolve('src/store/')
		}
	}

}