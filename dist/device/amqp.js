"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const application_1 = require("../application");
const utilities_1 = require("../utilities");
const MESSAGES_QUEUE = application_1.config('amqp.queues.messages');
exports.amqp = connect(application_1.config);
exports.channel = channels(exports.amqp);
function connect(config = application_1.config) {
    const url = config('amqp.url');
    return utilities_1.thenable(() => amqplib_1.connect(url));
}
exports.connect = connect;
function channels(conn) {
    return {
        messages: queue(MESSAGES_QUEUE, conn),
    };
}
exports.channels = channels;
function queue(name, conn) {
    return () => conn.then((conn) => {
        return conn.createChannel().then((ch) => {
            return ch.assertQueue(name).then(() => {
                return ch;
            });
        });
    });
}
exports.queue = queue;
function parse(msg) {
    let str = msg.content.toString();
    try {
        return JSON.parse(str);
    }
    catch (err) {
        console.error('error parsing "%s"', str);
        return {};
    }
}
exports.parse = parse;
