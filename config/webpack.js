'use strict';

const webpack = require('webpack');
const { join } = require('path');

const { DefinePlugin } = webpack;
const { UglifyJsPlugin } = webpack.optimize;

const { NODE_ENV } = process.env;

const PLUGINS = [];

const DIR = (dir) => (...path) =>
    join(__dirname, '..', dir, ...path);

const SRC = DIR('src');
const DIST = DIR('dist');
const CONFIG = DIR('config');

const RULE_TYPESCRIPT = {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    options: {
        configFileName: CONFIG('tsconfig.json')
    }
};

const RULE_SOURCE_MAP = {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader'
};

switch (NODE_ENV) {
case 'production':
    PLUGINS.push(new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    }));

    PLUGINS.push(new UglifyJsPlugin);
    break;
}

module.exports = {
    entry: [
        'whatwg-fetch',
        SRC('client', 'main.tsx')
    ],

    output: {
        filename: 'bundle.js',
        path: DIST('client')
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    plugins: PLUGINS,

    module: {
        rules: [
            RULE_TYPESCRIPT,
            RULE_SOURCE_MAP,
        ]
    },
};
