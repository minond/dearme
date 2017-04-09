'use strict';

const { join } = require('path');

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

    module: {
        rules: [
            RULE_TYPESCRIPT,
            RULE_SOURCE_MAP,
        ]
    },
};
