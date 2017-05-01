"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const application_1 = require("../application");
const log_1 = require("../log");
const log = log_1.logger(__filename);
exports.mongo = connect(application_1.config);
function connect(config = application_1.config) {
    const url = config('mongo.url');
    log.info('connecting to mongo server');
    return new Promise((resolve, reject) => {
        mongodb_1.MongoClient.connect(url, (err, db) => {
            if (err) {
                log.error('error connecting to server');
                log.error(err);
                reject(err);
            }
            else {
                log.info('succesfully connected to server');
                resolve(db);
            }
        });
    });
}
exports.connect = connect;
