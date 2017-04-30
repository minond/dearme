import * as RateLimit from 'express-rate-limit';
import * as error from 'http-errors';

import { logger } from '../log';
import { user } from '../repository/user';
import { message } from '../repository/message';
import { build_messages, get_confirmation, schedule, no_response } from '../controller/message';
import { mongo, Db } from '../device/mongo';
import { channel, Channel } from '../device/amqp';
import { config, application, csrf } from '../application';
import { valid_phone } from '../validation';

const log = logger(__filename);
const server = application(config);
const limit = new RateLimit(config('ratelimit.default'));

server.get('/', csrf(), (req, res) =>
    res.render('index'));

server.post('/api/message', (req, res) => {
    log.info('got a message');
    res.xml(no_response());
});

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

    server.post('/signup', csrf(), limit, async (req, res, next) => {
        let { phone } = req.body;

        if (!valid_phone(phone)) {
            next(error(400, 'invalid phone'));
            return;
        }

        try {
            let user = await users.save({ phone });
            let msgs = build_messages(user);
            let conf = get_confirmation(user);

            await messages.save_many(msgs);
            await schedule(chan, user, conf);

            res.json({ ok: true });
        } catch (err) {
            next(error(503, err.message));
        }
    });

    server.listen(3000, () =>
        log.info('ready for http calls'));
})();
