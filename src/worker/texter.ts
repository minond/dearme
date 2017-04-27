import { config } from '../application';
import { send } from '../device/sms';
import { channel, Message } from '../device/amqp';
import { QueuedMessage } from '../controller/message';

const QUEUE = config<string>('amqp.queues.messages');

function parse(msg: Message): QueuedMessage {
    let str = msg.content.toString();
    return JSON.parse(str);
}

function error(...args: _[]): void {
    console.error.apply(console, args);
}

function info(...args: _[]): void {
    console.info.apply(console, args);
}

export function texter() {
    channel.messages().then((chan) => {
        info('consuming %s', QUEUE);

        chan.consume(QUEUE, (msg) => {
            info('got message');
            let { phone, body } = parse(msg);

            send(phone, body)
                .then((ack) => {
                    if (!ack.error_code) {
                        info('sent text, sending ack');
                        chan.ack(msg);
                    } else {
                        error('error from messaging service', ack);
                    }
                })
                .catch((err) =>
                    error('cound not talk to messaging service', err));
        });
    });
}

if (!module.parent) {
    texter();
}
