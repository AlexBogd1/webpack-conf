import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port,
    open: true,
    // to use js routing(react-router-dom)
    // работает только для dev сервера
    historyApiFallback: true,
    // hot: true,
  };
}
