const {
  createConfig,
  match,
  defineConstants,
  env,
  entryPoint,
  setOutput,
  sourceMaps,
  addPlugins,
  file,
  postcss,
  sass,
  typescript,
  extractText
} = require('webpack-blocks');
const babel = require('@webpack-blocks/babel');
const devServer = require('@webpack-blocks/dev-server');
const tslint = require('@webpack-blocks/tslint');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');

module.exports = createConfig([
  entryPoint(path.join(process.cwd(), 'src', 'index.ts')),
  entryPoint(path.join(process.cwd(), 'src', 'css', 'styles.scss')),
  setOutput(path.join(process.cwd(), 'build', 'bundle.js')),
  babel(),
  typescript(),
  tslint(),
  sass(),
  extractText('[name].css', 'text/x-sass'),
  postcss({ autoprefixer: autoprefixer({ browsers: ['last 2 versions'] }) }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV
  }),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg', '*.webp'], [file()]),
  addPlugins([
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: true,
      favicon: 'public/favicon.png',
      hash: true
    }),
    new webpack.ProvidePlugin({
      Snabbdom: 'snabbdom-pragma'
    })
  ]),
  env('development', [devServer(), sourceMaps()]),
  env('production', [
    addPlugins([
      new BabiliPlugin(),
      new CopyWebpackPlugin([{ from: 'public', to: '' }])
    ])
  ])
]);
