import * as RateLimit from 'express-rate-limit';
// import * as Csurf from 'csurf';

import { config, application } from '../application';
import { handler_save_user, handler_serve_index } from './handler';

const server = application(config);
const limit = new RateLimit(config<RateLimit.Options>('ratelimit.default'));
// const csrf = Csurf({ cookie: config<Csurf.CookieOptions>('app.csrf.cookie') });

server.get('/', /*csrf,*/ handler_serve_index);
server.post('/signup', limit, /*csrf,*/ handler_save_user);
server.listen(3000, () => console.info('ready for http calls'));
