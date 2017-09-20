const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/server.ts',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
          {
            loader: 'tslint-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tslint: path.resolve(__dirname, 'tslint.typecheck.json'),
      watch: path.resolve(__dirname, 'src'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      'src',
    ]
  },
  target: 'node',
};
