const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/modules/Main.jsx",
  output: {
    path: __dirname + "/dist",
    filename: "main.bundle.js",
    publicPath: "dist"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
