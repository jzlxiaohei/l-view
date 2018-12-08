const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // for prod


const devMode = process.env.NODE_ENV !== 'production'

const resolvePath = _path => {
  return path.resolve(__dirname, _path);
};

const DIST_PATH = resolvePath('../dist');

const port = 4444;

const config = {
  mode: 'development',
  entry: {
    app: "./src/index.jsx",
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/',
    path: DIST_PATH,
  },
  externals: {
    moment: 'moment',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, "../src"),
        options: {
          cacheDirectory: true,
          highlightCode: true
        }
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader'
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port,
    inline: true,
    hot: true,
    publicPath: '/',
    contentBase: resolvePath('../src'),
    disableHostCheck: true,
    historyApiFallback: true,
    // quiet: true,
    open:true,
    clientLogLevel: 'none',
    overlay: true,
    stats: 'minimal',
    watchOptions: {
      ignored: [
        resolvePath('../dist'),
        resolvePath('../node_modules'),
      ],
    },
  },
};

// const origin = `http://0.0.0.0:${port}`;


module.exports = config;
