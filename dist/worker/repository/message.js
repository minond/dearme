"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const application_1 = require("../application");
function message(db) {
    const coll = () => db.collection(application_1.config('mongo.collections.messages'));
    const find = (query, fields) => coll().find(query, fields);
    const find_one = (query) => coll().findOne(query);
    const save = (message) => coll().insert(message).then(() => message);
    const save_many = (messages) => coll().insertMany(messages).then(() => messages);
    const update = (filter, update) => coll().findOneAndUpdate(filter, update).then(() => null);
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
    return { find, find_one, find_users_last_message, save, save_many, update };
}
exports.message = message;
