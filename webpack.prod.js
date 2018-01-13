const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');


module.exports = Merge(CommonConfig,{
	output: { // 输出，只可指定一个输出配置
	    filename: '[name].[chunkhash].js'
  	},
  	plugins: [
		new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production')
	    }),
	    new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
    	new webpack.optimize.UglifyJsPlugin({
		      compress: {
		        warnings: false
		      }
	    })
    ]
});


// module.exports = {

// 	entry: {
//   		editor: './src/editor/index.js'
//   	},
// 	output: { // 输出，只可指定一个输出配置
// 	    chunkFilename: '[name].bundle.js',
// 	    filename: '[name].[chunkhash].js'
// 	    path: path.resolve(__dirname, 'dist/') // 输出文件所在的目录
//   	},
//   	//devtool: 'inline-source-map',
// 	module: {
// 		rules: [

// 			{
// 				test: /\.less$/,
// 				exclude: /node_modules/,
// 				use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
// 			},
// 			{
// 				test: /\.vue$/,
// 				loader: 'vue-loader',
// 				options: {
// 					loaders: {
// 						less: ExtractTextPlugin.extract({
// 							use: ['css-loader', 'less-loader'],
// 							fallback: 'vue-style-loader'
// 						})
// 					}
// 				}
// 			},
// 			{
// 		        test: /\.css$/,
// 		        exclude: /node_modules/,
// 		        use: ExtractTextPlugin.extract(['style-loader','css-loader'])
//       		},
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loader: 'babel-loader'
// 			},
// 	        { // 增加加载图片的规则
// 	          test: /\.(png|svg|jpg|gif)$/,
// 	          use: [
// 	            'file-loader?name=[name].[ext]&outputPath=editor/assets/img/'
// 	          ],
// 	          include: [path.resolve(__dirname, "src/editor")]
// 	        },
// 	        { // 增加加载字体的规则
// 	          test: /\.(woff|woff2|eot|ttf|otf)$/,
// 	          use: ['file-loader?name=[name].[ext]&outputPath=editor/assets/fonts/'],
// 	          include: [path.resolve(__dirname, "src/editor")]
// 	        }

// 		]
// 	},
// 	plugins: [
// 		new webpack.DefinePlugin({
// 	      'process.env.NODE_ENV': JSON.stringify('production')
// 	    }),
// 		new ExtractTextPlugin({
// 			filename: 'css/[name].css'
// 		}),
// 		// 每次生成dist前先清空dist目录下的的内容
// 		new CleanWebpackPlugin(['dist'], {
// 			root: path.resolve(__dirname, 'dist/')
// 		}),
// 	    new webpack.HotModuleReplacementPlugin(),
// 	    new HtmlWebpackPlugin({
// 	  		title: '政通表单定制系统',
// 	  		filename: 'index.html'
// 	  	}),
// 	  	new webpack.ProvidePlugin({ // 设置全局变量
// 	      $: 'jquery',
// 	      jQuery: 'jquery'
// 	    }),
// 	    new webpack.ProgressPlugin(),
// 	    new webpack.optimize.CommonsChunkPlugin({
// 	      name: 'third-party',
// 	      filename: '',
// 	      minChunks: function (module, count) {
// 	          return (
// 	            module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
// 	          )
// 	        }
// 	      }),
// 	    // 提取公共文件
// 		new webpack.optimize.CommonsChunkPlugin({
// 			name: 'common'
// 		}),
// 	    new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
//     	new webpack.optimize.UglifyJsPlugin({
// 		      compress: {
// 		        warnings: false
// 		      }
// 	    })
//     ],
// 	resolve: {
// 		extensions: ['.js', '.vue', '.less'],
// 		alias: {
// 			less$: path.resolve(__dirname, 'src/assets/less'),
// 			components$: path.resolve(__dirname, 'src/components')
// 		}
// 	}

// }