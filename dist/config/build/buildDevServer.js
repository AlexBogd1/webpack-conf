export function buildDevServer(_a) {
    var port = _a.port;
    return {
        port: port,
        open: true,
        // to use js routing(react-router-dom)
        // работает только для dev сервера
        historyApiFallback: true,
    };
}
