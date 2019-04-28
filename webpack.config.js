const path = require('path');
const webpack = require('webpack');
const WebpackCommonShake = require('webpack-common-shake');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const { name, version, author, homepage, license } = require('./package.json');

const banner = `
/*!
 * ${name} v${version}
 * ${homepage}
 * 
 * © 2019 ${author}
 * license: ${license}
 * 
 * https://cdn.jsdelivr.net/npm/${name}@${version}/umd/third-party-licenses.txt
 */
`;

const tsLoader = {
    loader: 'ts-loader',
    options: {
        compilerOptions: {
            module: 'es6',
            declaration: false,
        },
    },
};

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'xelto-diagram-canvas.js',
        path: path.resolve(__dirname, 'umd'),
        library: 'XeltoDiagramCanvas',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
            { test: /\.ts$/, use: tsLoader },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    plugins: [
        new WebpackCommonShake.Plugin(),
        new webpack.BannerPlugin({ banner, raw: true }),
        new LicenseWebpackPlugin({
            outputFilename: 'third-party-licenses.txt',
        }),
    ],
    devtool: 'source-map',
};
