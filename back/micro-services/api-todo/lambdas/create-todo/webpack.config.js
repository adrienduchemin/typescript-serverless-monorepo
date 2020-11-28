const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: path.resolve(__dirname, "lib/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js"],
  },
  externals: [nodeExternals()], //+ external aws-sdk et aws-lambda ...
};
