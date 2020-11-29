const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CopyBundlePlugin = require('webpack-copy-bundle');

module.exports = {
  entry: {
    content: './src/content.ts',
    test: {
      import: './test/test.ts',
      filename: '../test/dist/test.js',
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/i,
        loader: 'file-loader',
        options: { postTransformPublicPath: p => `browser.runtime.getURL(${p})` },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'assets' },
        { from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js' },
        { from: 'test/index.html', to: '../test/dist' },
      ],
    }),
    new CopyBundlePlugin({
      content: './test/dist',
    }),
  ],
  watchOptions: {
    ignored: ['dist/**', 'test/dist/**', 'out/**'],
  },
};
