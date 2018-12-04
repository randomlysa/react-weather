const path = require('path');

const webpack = require('webpack');

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new UglifyJSPlugin(),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/style/', to: 'style/' },
      { from: 'sqlite', to: 'sqlite' }
    ]),
    // Remove moment locales.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          // import file path containing node_modules
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          // sync + async chunks
          chunks: 'all'
        }
      }
    }
  }
});
