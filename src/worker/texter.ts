import { config } from '../application';
import { send } from '../device/sms';
import { channel, Message } from '../device/amqp';
import { QueuedMessage } from '../controller/message';

const QUEUE = config<string>('amqp.queues.messages');

function parse(msg: Message): QueuedMessage {
    let str = msg.content.toString();
    return JSON.parse(str);
}

export function texter() {
    channel.messages().then((chan) => {
        console.log('consuming %s', QUEUE);

        chan.consume(QUEUE, (msg) => {
            console.log('got message');
            let { phone, body } = parse(msg);

            send(phone, body)
                .then((ack) => {
                    if (!ack.error_code) {
                        console.log('sent text, sending ack');
                        chan.ack(msg);
                    } else {
                        console.error('error from messaging service', ack);
                    }
                })
                .catch((err) => {
                    console.error('cound not talk to messaging service', err);
                })
        });
    });
}

if (!module.parent) {
    texter();
}
