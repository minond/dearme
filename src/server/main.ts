import * as RateLimit from 'express-rate-limit';
import * as error from 'http-errors';

import { user } from '../repository/user';
import { mongo } from '../device/mongo';
import { channel } from '../device/amqp';
import { config, application } from '../application';
import { valid_phone } from '../validation';

const server = application(config);
const limit = new RateLimit(config('ratelimit.default'));

server.get('/', (req, res) =>
    res.render('index'));

Promise.all([mongo, channel.messages()]).then(([db, messages]) => {
    server.post('/signup', limit, (req, res, next) => {
        let { phone } = req.body;

        if (!valid_phone(phone)) {
            next(error(400, 'invalid phone'));
            return;
        }

        user(db).save({ phone })
            .then((user) => {
                let buff = new Buffer(JSON.stringify({ phone }));
                let ok = messages.sendToQueue('messages', buff);

                if (ok) {
                    res.json({ ok });
                } else {
                    next(error(503, 'could not queue message'));
                }
            })
            .catch((err) => next(error(503, err.message)))
    });

    server.listen(3000, () =>
        console.info('ready for http calls'));
});
