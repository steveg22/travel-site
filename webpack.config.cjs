const { watch } = require("fs/promises");
const path = require("path");

const postCssPlugins = [
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer")
];

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  devServer: {
    watchFiles: ["app/**/*.html"],
    static: {
      directory: path.join(__dirname, "app"),
      watch: false
    },
    hot: true,
    port: 3000,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i, // Match both .css and .scss
        exclude: /node_modules/,
        use: [
          "style-loader", // Injects CSS into the DOM
          { loader: "css-loader", options: { url: false } }, // Resolves CSS imports
          { loader: "postcss-loader", options: { postcssOptions: { plugins: postCssPlugins } } }, // PostCSS
          "sass-loader" // Compiles SCSS to CSS (CSS files pass through unchanged)
        ]
      }
    ]
  }
};

