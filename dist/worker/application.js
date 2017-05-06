"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Tokens = require("csrf");
const express = require("express");
const config = require("acm");
exports.config = config;
const express_2 = require("express");
const swig_1 = require("swig");
const dotenv = require("dotenv");
const favicon = require("serve-favicon");
const body = require("body-parser");
const compression = require("compression");
const cookie = require("cookie-parser");
const session = require("express-session");
exports.router = express_1.Router;
function configuration() {
    dotenv.config({ silent: true });
    return config;
}
exports.configuration = configuration;
function bootstrap(config = configuration()) {
    const app = application(config);
    app.listen(config('port'));
    return { app, config };
}
exports.bootstrap = bootstrap;
function application(config) {
    const app = express();
    const MANIFEST = config('app.manifest');
    const VIEW_CACHE = config('app.server.view_cache');
    const COMPRESSION = config('app.server.compression');
    const ROBOTS_TXT = config('app.server.robots_txt');
    const BODY_PARSING = config('app.server.body_parsing');
    const SESSION = config('app.server.session');
    const COOKIES = config('app.server.cookies');
    const KEY_COOKIE = config('key.cookie');
    const KEY_SESSION = config('key.session');
    app.set('manifest', MANIFEST);
    app.set('x-powered-by', false);
    app.set('view cache', true);
    app.set('view engine', 'html');
    app.set('views', './src/views');
    app.engine('html', swig_1.renderFile);
    if (VIEW_CACHE) {
        app.set('view cache', false);
        swig_1.setDefaults({ cache: false });
    }
    app.use(favicon('assets/images/favicon.ico'));
    app.get('/manifest.json', (_req, res) => res.json(MANIFEST));
    app.use('/robots.txt', express_2.static(ROBOTS_TXT ?
        'assets/resources/robots.txt' :
        'assets/resources/nobots.txt'));
    if (COMPRESSION) {
        app.use(compression());
    }
    app.use('/assets', express_2.static('assets'));
    app.use('/dist', express_2.static('dist'));
    app.use('/node_modules', express_2.static('node_modules'));
    if (BODY_PARSING) {
        app.use(body.json());
        app.use(body.urlencoded({ extended: true }));
    }
    if (COOKIES) {
        app.use(cookie(KEY_COOKIE));
    }
    if (SESSION) {
        app.use(session({
            name: 'sid',
            secret: KEY_SESSION,
            saveUninitialized: false,
            resave: false,
        }));
    }
    app.use((req, res, next) => {
        res.xml = (xml) => {
            res.header('Content-Type', 'text/xml');
            res.end(xml);
        };
        next();
    });
    return app;
}
exports.application = application;
function csrf() {
    const tokens = new Tokens();
    var secret;
    var token;
    return (req, res, next) => {
        switch (req.method) {
            case 'POST':
            case 'PUT':
                secret = req.session ? req.session.secret : '';
                token = req.headers['x-csrf-token'];
                if (!tokens.verify(secret, token)) {
                    next(new Error());
                    return;
                }
                break;
            case 'GET':
                secret = tokens.secretSync();
                token = tokens.create(secret);
                if (req.session) {
                    req.session.secret = secret;
                }
                res.cookie('tototoken', token);
                break;
        }
        next();
    };
}
exports.csrf = csrf;
