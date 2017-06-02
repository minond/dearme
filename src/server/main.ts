import * as RateLimit from 'express-rate-limit';
import * as error from 'http-errors';

import { logger } from '../log';
import { user } from '../repository/user';
import { Response, Message, message } from '../repository/message';
import { build_messages, get_confirmation, schedule, no_response } from '../controller/message';
import { mongo, Db } from '../device/mongo';
import { channel, Channel } from '../device/amqp';
import { config, application, csrf } from '../application';
import { valid_phone } from '../validation';
import { HOUR } from '../utilities';

import { decrypt, encrypt } from '../crypto';
import { KEY_MESSAGES } from '../keys';

const port = config('port');
const log = logger(__filename);
const server = application(config);
const limit = new RateLimit(config('ratelimit.default'));

(async () => {
    let db: Db;
    let chan: Channel;

    try {
        db = await mongo;
        chan = await channel.messages();
    } catch (err) {
        log.error(err);
        return;
    }

    let users = user(db);
    let messages = message(db);

    server.get('/api/user/:guid', async (req, res, next) => {
        let { guid } = req.params;

        try {
            let user = await users.find_one({ guid });
            let msgs = await messages.find({ user_id: user._id }).toArray();
            res.json({
                user: {
                    fname: user.fname,
                },

                messages: msgs.reduce((store, msg) => {
                    msg.responses = msg.responses.reduce((store, resp) => {
                        resp.body = decrypt(resp.body, KEY_MESSAGES);
                        store.push(resp);
                        return store;
                    }, [] as Response[]);

                    store.push(msg);
                    return store;
                }, [] as Message[])
            });
        } catch (err) {
            log.error('ran into problem getting messages for user');
            log.error(err);
            next(error(503, err.message));
        }
    });

    server.post('/api/message', async (req, res) => {
        log.info('got a message');

        try {
            let { From: phone, Body: body } = req.body;

            let user = await users.find_one_by_phone(phone);

            if (!body) {
                throw new Error('empty body. not saving');
            }

            if (!user) {
                throw new Error('could not find user');
            }

            let item = await messages.find_users_last_message(user);

            if (!item) {
                throw new Error('could not find users last message');
            }

            let filter = { _id: item._id };
            let update = { $push: { responses: {
                body: encrypt(body, KEY_MESSAGES),
                date: new Date
            }}};

            await messages.update(filter, update);
            log.info('saved response');
        } catch (err) {
            log.error('ran into problem saving response');
            log.error(err);
        }

        res.xml(no_response());
    });

    server.post('/api/signup', csrf(), limit, async (req, res, next) => {
        let { fname, phone } = req.body;
        let offset = new Date(Date.now() - HOUR * 6);

        if (!valid_phone(phone)) {
            next(error(400, 'invalid phone'));
            return;
        }

        if (!fname) {
            next(error(400, 'missing first name'));
            return;
        }

        try {
            let dup_check = await users.find_one_by_phone(phone);

            if (dup_check) {
                log.warn('duplicate phone');
                throw new Error();
            }

            let user = await users.save({ fname, phone });
            let msgs = build_messages(user, offset);
            let conf = get_confirmation(user);

            await messages.save_many(msgs);
            await schedule(chan, user, conf);

            res.json({ ok: true });
        } catch (err) {
            next(error(503, err.message));
        }
    });

    server.get('*', csrf(), (req, res) => {
        let manifest = server.get('manifest');
        res.render('index', { manifest });
    });

    server.listen(port, () =>
        log.info('ready for http calls on port', port));
})();
