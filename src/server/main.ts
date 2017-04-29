import * as RateLimit from 'express-rate-limit';
import * as error from 'http-errors';

import { logger } from '../log';
import { user } from '../repository/user';
import { conversation } from '../repository/conversation';
import { build_conversation, no_response } from '../controller/message';
import { mongo, Db } from '../device/mongo';
import { config, application, csrf } from '../application';
import { valid_phone } from '../validation';

const log = logger(__filename);
const server = application(config);
const limit = new RateLimit(config('ratelimit.default'));

server.get('/', csrf(), (req, res) =>
    res.render('index'));

server.post('/api/message', (req, res) => {
    log.info('got a message');
    res.xml(no_response())
});

(async () => {
    let db: Db;

    try {
        db = await mongo;
    } catch (err) {
        console.error(err);
        return;
    }

    let users = user(db);
    let conversations = conversation(db);

    server.post('/signup', csrf(), limit, async (req, res, next) => {
        let { phone } = req.body;

        if (!valid_phone(phone)) {
            next(error(400, 'invalid phone'));
            return;
        }

        try {
            let user = await users.save({ phone });
            let conversation = build_conversation(user);

            await conversations.save(conversation);

            res.json({ ok: true });
        } catch (err) {
            next(error(503, err.message));
        }
    });

    server.listen(3000, () =>
        console.info('ready for http calls'));
})();
