const baseConfig = require('../webpack.config');

module.exports = {
    mode: 'development',
    entry: baseConfig.entry,
    output: {
        ...baseConfig.output,
        publicPath: '/',
    },
    module: baseConfig.module,
    resolve: baseConfig.resolve,
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        openPage: '.',
        contentBase: __dirname,
        watchContentBase: true,
    },
};
