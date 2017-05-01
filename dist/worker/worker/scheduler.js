"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms = require("millisecond");
const application_1 = require("../application");
const mongo_1 = require("../device/mongo");
const amqp_1 = require("../device/amqp");
const log_1 = require("../log");
const user_1 = require("../repository/user");
const message_1 = require("../controller/message");
const message_2 = require("../repository/message");
const log = log_1.logger(__filename);
const range = ms(application_1.config('app.worker.scheduler.range'));
const interval = ms(application_1.config('app.worker.scheduler.interval'));
const completed_convo_query = (err) => err ? log.error(err) : true;
function scheduler(connection = mongo_1.mongo, messages_chan = amqp_1.channel.messages) {
    return __awaiter(this, void 0, void 0, function* () {
        let db = yield connection;
        let users = user_1.user(db);
        let messages = message_2.message(db);
        let chan = yield messages_chan();
        let task = () => {
            let user_cache = {};
            let now = Date.now();
            let $gte = new Date(now - range / 2);
            let $lte = new Date(now + range / 2);
            let query = {
                send_date: { $gte, $lte },
                scheduled: false,
                user_id: { $exists: true },
                body: { $exists: true },
            };
            messages.find(query)
                .forEach((message) => __awaiter(this, void 0, void 0, function* () {
                let { user_id, _id: message_id, body } = message;
                let hash = user_id.toHexString();
                log.info(`processing Message#${message_id}`);
                let user_filter = { _id: user_id };
                let message_filter = { _id: message_id };
                let user = hash in user_cache ? user_cache[hash] :
                    yield users.find_one(user_filter);
                try {
                    yield messages.update(message_filter, { $set: { scheduled: true } });
                    log.info(`updated scheduled flag for for User#${user_id}`);
                    let ok = yield message_1.schedule(chan, user, body);
                    log.info(`scheduled message for User#${user_id} ok: ${ok}`);
                }
                catch (err) {
                    log.error(`error handling User#${user_id}`);
                    log.error(err);
                }
            }), completed_convo_query);
        };
        log.info(`triggering task every ${interval} ms`);
        setInterval(task, interval);
        task();
    });
}
exports.scheduler = scheduler;
if (!module.parent) {
    scheduler();
}
