const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const child_process = require('child_process');

const MyFirstWebpackPlugin = require('./customPlugin')
const Process = require("process");

function git(command) {
    return child_process.execSync(`git ${command}`, {encoding: 'utf8'}).trim();
}

const custom_env = {
    GIT_VERSION: git('describe --always'),
    GIT_AUTHOR_DATE: git('log -1 --format=%aI'),
    DEBUG: false,
    DEPLOY: Process.env.DEPLOY || 'dev'
}
const ENV_PLUGIN = new webpack.EnvironmentPlugin();

const custom_plugin = new MyFirstWebpackPlugin({option: "test", env: custom_env})

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: 'index.html',
                // title: 'Development', //直接定义html title
                templateParameters: {
                    some_variable: 'SOME_VAR', // 向 html 传递一些变量
                },
            }),
        ENV_PLUGIN,
        custom_plugin
    ],
    resolveLoader: {
        alias: {
            'config-loader': path.resolve(__dirname, 'loaders/loader.js'),
      },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /config.json/,
                loader: 'config-loader',
                options: {env: custom_env}
            }]
    },

    mode: 'production', //Minify the Output
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};