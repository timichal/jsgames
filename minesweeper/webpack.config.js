module.exports = {
  entry: "./src/script.js",
  mode: "development",
  output: {
    path: __dirname,
    filename: "./script.js",
  },
  watch: true,

  node: {
    fs: "empty",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
