import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders({ mode }: BuildOptions): ModuleOptions["rules"] {
  const isDev = mode === "development";

  // позволяет работать с картинками
  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  // позв загружать картинки как react компоненты
  // import Calendar from .....
  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          // позволяет менять цвет svg через свойство color
          svgoConfig: {
            plugins: [
              { name: "convertColors", params: { currentColor: true } },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev
          ? "[path][name]__[local]"
          : "[name][hash:base64:5]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      // "style-loader",
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      // { loader: "css-loader", options: { modules: true } },
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const tsLoader = {
    // ts-loader умеет работать с JSX
    // если бы это не исп, нужен был бы babel-loader
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        /* If you want to speed up compilation significantly you can set this flag. 
    However, many of the benefits you get from static type checking between 
    different dependencies in your application will be lost. 
    transpileOnly will not speed up compilation of project references.

    It's advisable to use transpileOnly alongside the fork-ts-checker-webpack-plugin to get full type checking again. 
    To see what this looks like in practice then either take a look at our example.
*/
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: /node_modules/,
  };

  const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: isDev ? "automatic" : "classic" }],
        ],
      },
    },
  };

  return [
    // tsLoader,
    babelLoader,
    scssLoader,
    assetsLoader,
    svgrLoader,
  ];
}
