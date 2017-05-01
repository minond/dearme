"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONE_TEST = /^\+1 \d\d\d \d\d\d \d\d\d\d$/;
exports.PHONE_MASK = '+1 999 999 9999';
function valid_phone(phone) {
    return !!phone && exports.PHONE_TEST.test(phone);
}
exports.valid_phone = valid_phone;
