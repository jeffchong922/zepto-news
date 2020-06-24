const path = require('path'),
      uglifyjs = require('uglifyjs-webpack-plugin'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      autoprefixer = require('autoprefixer'),
      miniCssExtractPlugin = require('mini-css-extract-plugin'),
      optimizeCssAssetsPlugins = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/scripts/index.js'),
    collection: path.resolve(__dirname, 'src/scripts/collection.js'),
    detail: path.resolve(__dirname, 'src/scripts/detail.js')
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        use: [
          {
            loader: 'url-loader', // 如果不做图片转 base64 可以用file-loader
            options: {
              limit: 8192, // 8KB 以下转 base64 限制 转换后会稍微大一点
              name: process.env.NODE_ENV === 'development' ? 'img/[name].[ext]' : 'img/[name]-[hash:16].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|svg)(\?.*)?$/i,
        loader: [
          'url-loader?name=fonts/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new uglifyjs(),
    new optimizeCssAssetsPlugins({}),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: '新闻头条',
      chunksSortMode: 'manual',
      chunks: ['index'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'collection.html',
      template: path.resolve(__dirname, 'src/collection.html'),
      title: '新闻收藏',
      chunksSortMode: 'manual',
      chunks: ['collection'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/detail.html'),
      title: '新闻详情',
      chunksSortMode: 'manual',
      chunks: ['detail'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new miniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    open: false,
    host: 'localhost',
    port: 5050
  }
}