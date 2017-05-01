"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const cwd = process.cwd() + path_1.sep;
function log_function(name, fn) {
    return (...params) => fn.apply(console, [`${name} ${Date.now()}`].concat(params));
}
function logger(file) {
    var name = file.replace(cwd, '');
    return {
        error: log_function(name, console.error),
        info: log_function(name, console.info),
        log: log_function(name, console.log),
        warn: log_function(name, console.warn),
    };
}
exports.logger = logger;
