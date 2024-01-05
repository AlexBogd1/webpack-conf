import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
export function buildPlugins(_a) {
    var paths = _a.paths, mode = _a.mode, isAnalyzer = _a.isAnalyzer, platform = _a.platform;
    var isDev = mode === "development";
    var isProd = mode === "production";
    var plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new DefinePlugin({
            '__PLATFORM__': JSON.stringify(platform),
        }),
    ];
    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }));
    }
    if (isAnalyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }
    return plugins;
}
