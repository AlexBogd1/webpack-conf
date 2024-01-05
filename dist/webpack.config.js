import * as path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
export default (function (env) {
    var _a;
    var entry = path.resolve(__dirname, "src", "index.tsx");
    var output = path.resolve(__dirname, "build");
    var html = path.resolve(__dirname, "public", "index.html");
    var src = path.resolve(__dirname, "src");
    var paths = {
        entry: entry,
        output: output,
        html: html,
        src: src,
    };
    var config = buildWebpack({
        paths: paths,
        port: (_a = env.port) !== null && _a !== void 0 ? _a : 3000,
        mode: env.mode,
        isAnalyzer: env.analyser,
        platform: env.platform,
    });
    return config;
});
