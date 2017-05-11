"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const ALGORITHM = 'aes-256-ctr';
function evaluate(f1, f2, text, obj) {
    return obj.update(text, f1, f2) + obj.final(f2);
}
function encrypt(text, key) {
    return evaluate('utf8', 'hex', text, crypto_1.createCipher(ALGORITHM, key));
}
exports.encrypt = encrypt;
function decrypt(text, key) {
    return evaluate('hex', 'utf8', text, crypto_1.createDecipher(ALGORITHM, key));
}
exports.decrypt = decrypt;
