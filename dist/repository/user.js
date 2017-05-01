"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("../application");
const utilities_1 = require("../utilities");
const personalities = [0, 1];
function user(db) {
    const coll = () => db.collection(application_1.config('mongo.collections.users'));
    const find = (query, fields) => coll().find(Object.assign({ inactive: false }, query), fields);
    const find_one = (query) => coll().findOne(Object.assign({ inactive: false }, query));
    const find_one_by_phone = (raw) => find_one({ phone: utilities_1.format_phone(raw) });
    const save = ({ phone }) => {
        let inactive = false;
        let date_created = new Date;
        let assigned_personality = utilities_1.rand(personalities);
        let user = { inactive, phone, date_created, assigned_personality };
        return coll()
            .insert(user)
            .then(() => user);
    };
    const save_many = (users) => utilities_1.not_yet_implemented();
    const update = (filter, update) => utilities_1.not_yet_implemented();
    return { find, find_one, find_one_by_phone, save, save_many, update };
}
exports.user = user;
