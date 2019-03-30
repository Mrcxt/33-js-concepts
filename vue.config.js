module.exports = {
    publicPath: "./",
    devServer: {
        proxy: {
            '/rest': {
                target: 'http://111.231.144.200:6066',
                ws: true,
                changeOrigin: true
            },
        }
    }
};