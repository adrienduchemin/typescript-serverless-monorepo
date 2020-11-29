/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, 'lib/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  externals: ['aws-sdk'], // add @aws/dynamodb-data-mapper-annotations ?, @aws/dynamodb-data-mapper ?
}
