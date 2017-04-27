import { config } from '../application';
import { logger } from '../log';
import { send, SMSSend, SMSAck } from '../device/sms';
import { channel, parse, LazyChannel } from '../device/amqp';
import { QueuedMessage } from '../controller/message';

const log = logger(__filename);
const queue = config<string>('amqp.queues.messages');

const log_error = (err: Error) =>
    log.error('cound not talk to messaging service', err);

const log_success = () =>
    log.log('sent text, sent ack');

export function texter(
    sender: SMSSend = send,
    messages: LazyChannel = channel.messages
) {
    messages().then((chan) => {
        log.info('consuming %s', queue);

        chan.consume(queue, (msg) => {
            let { phone, body } = parse(msg) as QueuedMessage;

            let ack_message = (ack: SMSAck) =>
                !ack.error_code ? chan.ack(msg) :
                    log.error('error from messaging service', ack);

            log.info('got message');

            sender(phone, body)
                .then(ack_message)
                .then(log_success)
                .catch(log_error);
        });
    });
}

if (!module.parent) {
    texter();
}
