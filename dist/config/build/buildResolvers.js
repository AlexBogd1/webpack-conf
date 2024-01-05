export function buildResolvers(_a) {
    var paths = _a.paths;
    return {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": paths.src,
        },
    };
}
