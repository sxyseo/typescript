const argv = require('yargs').argv;
const AutoPreFixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');

//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {};
module.exports = config;

config.resolve = {
    extensions: ['', '.ts', '.tsx', '.js'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('.')
};

config.module = {
    loaders: [
        {test: /\.ts$/, loader: 'ts', exclude: /node_modules/},
        {test: /\.tsx?$/, loader: 'ts', exclude: /node_modules/},
        // {test: /\.html$/, loader: 'raw'},
        //{test: /\.scss$/, loader: 'raw!postcss!sass', exclude: path.resolve('src/styles/'), include: path.resolve('src/')}
    ]
};

config.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
];

config.postcss = [
    AutoPreFixer({ browsers: ['last 3 versions'] })
];

config.sassLoader = {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
};

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
    config.entry = {
        index: ['./src/index.tsx'],
        timePicker: './src/timePicker.tsx',
        react: './src/react.tsx'
    };

    config.output = {
        filename: '[name].js',
        path: path.resolve('./target'),
        publicPath: '/',
    };

    config.plugins.push(
        new CopyWebpackPlugin([
            {from: './src/assets', to: 'assets'}
        ]),
        new HtmlWebpackPlugin({
            filename: 'timePicker.html',
            template: 'src/timePicker.html',
            hash: true,
            chunks: ['timePicker'],
            title: 'timePicker'
        }),
        new HtmlWebpackPlugin({
            filename: 'react.html',
            template: 'src/react.html',
            hash: true,
            chunks: ['react'],
            title: 'react'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['index']
        })
    );
}

//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
    config.devtool = 'cheap-module-source-map';

    config.entry.index.unshift(`webpack-dev-server/client?http://${HOST}:${PORT}`);

    config.module.loaders.push(
        {test: /\.scss$/, loader: 'style!css!postcss!sass', include: [path.resolve('src/styles/'), path.resolve('src/components/')]}
    );

    config.devServer = {
        contentBase: './src',
        historyApiFallback: true,
        host: HOST,
        outputPath: config.output.path,
        port: PORT,
        publicPath: config.output.publicPath,
        stats: {
            cached: true,
            cachedAssets: true,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            reasons: true,
            timings: true,
            version: false
        }
    };
}

//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
    config.devtool = 'source-map';

    config.output.filename = '[name].[chunkhash].js';

    config.module.loaders.push(
        {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass'), include: path.resolve('src/')}
    );

    config.plugins.push(
        new WebpackMd5Hash(),
        new ExtractTextPlugin('styles.[contenthash].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                dead_code: true, // eslint-disable-line camelcase
                screw_ie8: true, // eslint-disable-line camelcase
                unused: true,
                warnings: false
            }
        })
    );
}

//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
    config.devtool = 'inline-source-map';

    config.module.loaders.push(
        {test: /\.scss$/, loader: 'style!css!postcss!sass'}
    );

    if (argv.coverage) {
        config.module.postLoaders = [
            {
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                include: path.resolve('./src'),
                exclude: [
                    /\.spec\.ts$/,
                    /node_modules/
                ]
            }
        ];
    }
}
