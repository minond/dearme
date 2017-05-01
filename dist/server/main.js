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
const RateLimit = require("express-rate-limit");
const error = require("http-errors");
const log_1 = require("../log");
const user_1 = require("../repository/user");
const message_1 = require("../repository/message");
const message_2 = require("../controller/message");
const mongo_1 = require("../device/mongo");
const amqp_1 = require("../device/amqp");
const application_1 = require("../application");
const validation_1 = require("../validation");
const port = application_1.config('port');
const log = log_1.logger(__filename);
const server = application_1.application(application_1.config);
const limit = new RateLimit(application_1.config('ratelimit.default'));
server.get('/', application_1.csrf(), (req, res) => res.render('index'));
(() => __awaiter(this, void 0, void 0, function* () {
    let db;
    let chan;
    try {
        db = yield mongo_1.mongo;
        chan = yield amqp_1.channel.messages();
    }
    catch (err) {
        log.error(err);
        return;
    }
    let users = user_1.user(db);
    let messages = message_1.message(db);
    server.post('/api/message', (req, res) => __awaiter(this, void 0, void 0, function* () {
        log.info('got a message');
        try {
            let { From: phone, Body: body } = req.body;
            let user = yield users.find_one_by_phone(phone);
            if (!user) {
                throw new Error('could not find user');
            }
            let item = yield messages.find_users_last_message(user);
            if (!item) {
                throw new Error('could not find users last message');
            }
            let filter = { _id: item._id };
            let update = { $push: { responses: { body, date: new Date } } };
            yield messages.update(filter, update);
            log.info('saved response');
        }
        catch (err) {
            log.error('ran into problem saving response');
            log.error(err);
        }
        res.xml(message_2.no_response());
    }));
    server.post('/signup', application_1.csrf(), limit, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let { phone } = req.body;
        if (!validation_1.valid_phone(phone)) {
            next(error(400, 'invalid phone'));
            return;
        }
        try {
            let user = yield users.save({ phone });
            let msgs = message_2.build_messages(user);
            let conf = message_2.get_confirmation(user);
            yield messages.save_many(msgs);
            yield message_2.schedule(chan, user, conf);
            res.json({ ok: true });
        }
        catch (err) {
            next(error(503, err.message));
        }
    }));
    server.listen(port, () => log.info('ready for http calls on port', port));
}))();
