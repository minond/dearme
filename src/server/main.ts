import * as RateLimit from 'express-rate-limit';
// import * as Csurf from 'csurf';

import { config, application } from '../application';

const server = application(config);
const limit = new RateLimit(config<RateLimit.Options>('ratelimit.default'));
// const csrf = Csurf({ cookie: config<Csurf.CookieOptions>('app.csrf.cookie') });

server.get('/', (req, res) =>
    res.render('index'));

server.listen(3000, () =>
    console.log('ready'));
