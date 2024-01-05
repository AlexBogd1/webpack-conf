import MiniCssExtractPlugin from "mini-css-extract-plugin";
export function buildLoaders(_a) {
    var mode = _a.mode;
    var isDev = mode === "development";
    // позволяет работать с картинками
    var assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    };
    // позв загружать картинки как react компоненты
    // import Calendar from .....
    var svgrLoader = {
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
    var cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev
                    ? "[path][name]__[local]"
                    : "[name][hash:base64:5]",
            },
        },
    };
    var scssLoader = {
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
    var tsLoader = {
        // ts-loader умеет работать с JSX
        // если бы это не исп, нужен был бы babel-loader
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
        ],
        exclude: /node_modules/,
        /* If you want to speed up compilation significantly you can set this flag.
        However, many of the benefits you get from static type checking between
        different dependencies in your application will be lost.
        transpileOnly will not speed up compilation of project references.
    
        It's advisable to use transpileOnly alongside the fork-ts-checker-webpack-plugin to get full type checking again.
        To see what this looks like in practice then either take a look at our example.
    */
    };
    return [tsLoader, scssLoader, assetsLoader, svgrLoader];
}
