const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
    entry: './index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: "/"
    },
    target: 'web',
    devServer: {
        port: '5000',
        static: {
            directory: path.join(__dirname, 'public')
        },
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json']
            },
            use: 'ts-loader'
        }, {
            test: /\.s[ac]ss$/i,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader", 'sass-loader']
        }, {
            "test": /\.(png|jpe?g|gif|svg)$/i,
            type: "asset/resource",
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin()
    ]
}