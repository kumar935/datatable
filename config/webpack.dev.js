const path = require('path');
const Webpack = require('webpack');
const PORT = 7070;
const PUBLIC_PATH = `http://localhost:${PORT}/dist/`;

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: {
      index: '../index.html'
    },
    port: PORT
  },
  entry: './src/modules/Main.jsx',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=[name].[hash].[ext]',
      },
      {
        test: /\.(jpg|jpeg)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(gif|png)$/,
        loader: 'url-loader?name=[name].[ext]',
      },
      {
        test: /\.(ico)$/,
        loader: 'file-loader?limit=1000&name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        DEV: true
      },
      'cdn': {
        publicPath: JSON.stringify(PUBLIC_PATH)
      }
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
};
