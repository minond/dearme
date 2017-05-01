"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MILLISECOND = 1;
exports.SECOND = exports.MILLISECOND * 1000;
exports.MINUTE = exports.SECOND * 60;
exports.HOUR = exports.MINUTE * 60;
exports.DAY = exports.HOUR * 24;
function maybe(val) {
    return {
        or_else(backup) {
            return val === null || val === undefined ? backup() : val;
        }
    };
}
exports.maybe = maybe;
function thenable(fn) {
    return new Promise((resolve, reject) => {
        fn().then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}
exports.thenable = thenable;
function rand(items) {
    return items[Math.floor(Math.random() * items.length)];
}
exports.rand = rand;
function buffer(obj) {
    return new Buffer(JSON.stringify(obj));
}
exports.buffer = buffer;
function not_yet_implemented() {
    throw new Error('Unimplemented');
}
exports.not_yet_implemented = not_yet_implemented;
function format_phone(raw) {
    return raw.trim()
        .replace(/\s+/g, '')
        .replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
}
exports.format_phone = format_phone;
