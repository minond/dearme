import * as RateLimit from 'express-rate-limit';
// import * as Csurf from 'csurf';

import { user } from '../repository/user';
import { connecting } from '../device/mongo';
import { config, application } from '../application';

const server = application(config);
const limit = new RateLimit(config<RateLimit.Options>('ratelimit.default'));
// const csrf = Csurf({ cookie: config<Csurf.CookieOptions>('app.csrf.cookie') });

server.get('/', /*csrf,*/ (req, res) =>
    res.render('index'));

Promise.all([connecting]).then(([db]) => {
    server.post('/signup', limit, /*csrf,*/ (req, res) => {
        user(db).save({ phone: req.body.phone })
            .then(() => {
                res.status(200);
                res.json({ ok: true });
            })
            .catch(() => {
                res.status(500);
                res.json({ ok: false });
            });
    });

    server.listen(3000, () =>
        console.info('ready for http calls'));
});
