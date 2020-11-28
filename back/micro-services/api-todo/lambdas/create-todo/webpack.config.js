/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, 'lib/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  // externals: [nodeExternals()], //+ external aws-sdk et aws-lambda ...
}
