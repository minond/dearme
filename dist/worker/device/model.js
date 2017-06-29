"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function repo(coll) {
    return {
        find: (query, fields) => coll().find(query, fields),
        count: (query) => coll().count(query),
        find_one: (query) => coll().findOne(query),
        save: (model) => coll().insert(model).then(() => model),
        save_many: (models) => coll().insertMany(models).then(() => models),
        update: (filter, update) => coll().findOneAndUpdate(filter, update).then(() => null),
    };
}
exports.repo = repo;
