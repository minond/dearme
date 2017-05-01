"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("../application");
const log_1 = require("../log");
const sms_1 = require("../device/sms");
const amqp_1 = require("../device/amqp");
const log = log_1.logger(__filename);
const queue = application_1.config('amqp.queues.messages');
function texter(sender = sms_1.send, messages = amqp_1.channel.messages) {
    messages().then((chan) => {
        log.info('consuming %s', queue);
        chan.consume(queue, (msg) => {
            let { phone, body } = amqp_1.parse(msg);
            log.info('got message');
            if (!phone || !body) {
                log.info('no phone or body, ignoring');
                chan.ack(msg);
                return;
            }
            sender(phone, body)
                .catch((err) => log.error('cound not talk to messaging service', err))
                .then((ack) => chan.ack(msg));
        });
    });
}
exports.texter = texter;
if (!module.parent) {
    texter();
}
