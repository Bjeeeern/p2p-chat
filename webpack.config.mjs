import * as path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  watch: true,
  devtool: "eval-source-map", // https://webpack.js.org/configuration/devtool/#devtool
  entry: {
    app: "./src/app.index.js",
    test: "./src/test.index.js",
  },
  output: {
    filename: "[name]/index.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      filename: "app/index.html",
      chunks: ["app"],
      template: "./src/html/app.html",
    }),
    new HtmlWebpackPlugin({
      filename: "test/index.html",
      chunks: ["test"],
      template: "./src/html/test.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name]/index.bundle.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          //"style-loader", // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader, // Extract css into files
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/i,
        use: [
          //"style-loader", // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader, // Extract css into files
          "css-loader", // Translates CSS into CommonJS
        ],
      },
      /*
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
      */
    ],
  },
};
