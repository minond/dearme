"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const model_1 = require("../device/model");
const application_1 = require("../application");
function message(db) {
    const _a = model_1.repo(() => db.collection(application_1.config('mongo.collections.messages'))), { find } = _a, extras = __rest(_a, ["find"]);
    const find_users_last_message = (user) => {
        let { _id: user_id } = user;
        let scheduled = true;
        if (!user_id) {
            return Promise.reject(new Error('user id required'));
        }
        return find({ scheduled, user_id })
            .sort({ send_date: -1 })
            .limit(1)
            .toArray()
            .then((msgs) => lodash_1.head(msgs));
    };
    return Object.assign({}, extras, { find, find_users_last_message });
}
exports.message = message;
