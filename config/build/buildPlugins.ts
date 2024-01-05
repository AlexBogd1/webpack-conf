import path from "path";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";

import { BuildOptions } from "./types/types";

export function buildPlugins({
  paths,
  mode,
  isAnalyzer,
  platform,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.publicFolder, 'rainbow.jpeg'), 
    }),
    new DefinePlugin({
      '__PLATFORM__': JSON.stringify(platform),
    }),
    // get full type checking again, выности проверку типов в отд процесс
    // включает в ts-loader - в options transpileOnly: true автоматически
     new ForkTsCheckerWebpackPlugin(),
  ];

  if (isDev) {
    // показывает прогресс сборки, но увеличивает время самой сборки
    plugins.push(new webpack.ProgressPlugin());
    // allows all kinds of modules to be updated at runtime without the need for a full refresh
    // изменяет двнные на страницу не пкрезагружая страницу в браузере при изменении в коде, => сохраняются состояния полей
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push( new CopyPlugin({
      patterns: [
        { from: path.resolve(paths.publicFolder, 'locales'), to: path.resolve(paths.output, 'locales')},
      ],
    }))
  }

  if (isAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
