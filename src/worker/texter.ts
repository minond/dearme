import { config } from '../application';
import { logger } from '../log';
import { send, SMSSend } from '../device/sms';
import { channel, parse, LazyChannel } from '../device/amqp';
import { QueuedMessage } from '../controller/message';

const log = logger(__filename);
const queue = config<string>('amqp.queues.messages');

export function texter(
    sender: SMSSend = send,
    messages: LazyChannel = channel.messages
) {
    messages().then((chan) => {
        log.info('consuming %s', queue);

        chan.consume(queue, (msg) => {
            let { phone, body } = parse(msg) as QueuedMessage;

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

if (!module.parent) {
    texter();
}
