import * as path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths, PlatformMode } from "./config/build/types/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyser?: boolean;
  platform?: PlatformMode;
}

export default (env: EnvVariables) => {

  const entry = path.resolve(__dirname, "src", "index.tsx");
  const output = path.resolve(__dirname, "build");
  const html = path.resolve(__dirname, "public", "index.html");
  const publicFolder = path.resolve(__dirname, "public");
  const src = path.resolve(__dirname, "src");

  const paths: BuildPaths = {
    entry,
    output,
    html,
    src,
    publicFolder,
  };

  const config: webpack.Configuration = buildWebpack({
    paths,
    port: env.port ?? 3000,
    mode: env.mode,
    isAnalyzer: env.analyser,
    platform: env.platform,
  });
  return config;
};
