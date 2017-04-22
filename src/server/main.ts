import * as RateLimit from 'express-rate-limit';

import { user } from '../repository/user';
import { mongo } from '../device/mongo';
import { channel } from '../device/amqp';
import { config, application } from '../application';

const server = application(config);
const limit = new RateLimit(config('ratelimit.default'));

server.get('/', (req, res) =>
    res.render('index'));

Promise.all([mongo, channel.messages()]).then(([db, messages]) => {
    server.post('/signup', limit, (req, res) => {
        user(db).save({ phone: req.body.phone })
            .then((user) => {
                var ok = messages.sendToQueue('messages', new Buffer(JSON.stringify({
                    phone: user.phone
                })));

                res.status(200);
                res.json({ ok });
            })
            .catch(() => {
                res.status(500);
                res.json({ ok: false });
            });
    });

    server.listen(3000, () =>
        console.info('ready for http calls'));
});
