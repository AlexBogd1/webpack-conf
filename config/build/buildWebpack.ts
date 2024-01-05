import webpack, { Configuration } from "webpack";
import path from "path";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: isDev ? buildDevServer(options) : undefined,
    /** In order to make it easier to track down errors and warnings,
     * JavaScript offers source maps, which map your compiled code back to your original source code.
     * If an error originates from b.js, the source map will tell you exactly that. */
    devtool: isDev && "inline-source-map",
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
  };
}
