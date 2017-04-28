import * as RateLimit from 'express-rate-limit';
import * as error from 'http-errors';

import { user } from '../repository/user';
import { no_response, schedule } from '../controller/message';
import { mongo } from '../device/mongo';
import { channel } from '../device/amqp';
import { config, application, csrf } from '../application';
import { valid_phone } from '../validation';

const server = application(config);
const limit = new RateLimit(config('ratelimit.default'));

server.get('/', csrf(), (req, res) =>
    res.render('index'));

Promise.all([mongo, channel.messages()]).then(([db, chan]) => {
    server.post('/signup', csrf(), limit, (req, res, next) => {
        let { phone } = req.body;

        if (!valid_phone(phone)) {
            next(error(400, 'invalid phone'));
            return;
        }

        user(db).save({ phone })
            .then((user) => schedule(chan, user))
            .then((ok) => res.json({ ok }))
            .catch((err) => next(error(503, err.message)));
    });

    server.post('/api/message', (req, res) => {
        console.log(req.body.From);
        console.log(req.body.Body);
        res.header('Content-Type', 'text/xml');
        res.end(no_response());
    });

    server.listen(3000, () =>
        console.info('ready for http calls'));
});
