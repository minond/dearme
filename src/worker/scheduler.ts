import * as ms from 'millisecond';
import { config } from '../application';
import { mongo, Connecting } from '../device/mongo';
import { channel, LazyChannel } from '../device/amqp';
import { logger } from '../log';
import { user } from '../repository/user';
import { schedule } from '../controller/message';
import { conversation, Conversation } from '../repository/conversation';

const log = logger(__filename);
const completed_convo_query = (err?: Error) =>
    err ? log.error(err) : log.log('ok');

const range = ms(config<string>('app.worker.scheduler.range'));
const interval = ms(config<string>('app.worker.scheduler.interval'));

export async function scheduler(
    connection: Connecting = mongo,
    messages: LazyChannel = channel.messages
) {
    let db = await connection;
    let users = user(db);
    let conversations = conversation(db);
    let chan = await messages();

    let now = Date.now();

    let $gte = new Date(now - range / 2);
    let $lte = new Date(now + range / 2);

    let fields = {
        user_id: 1,
        messages: {
            $elemMatch: {
                send_date: { $gte, $lte }
            }
        }
    };

    let valid_convo = (convo: Conversation): boolean =>
        !!convo.messages && !!convo.messages.length;

    let task = () => conversations.find({}, fields)
        .forEach(async (convo: Conversation) => {
            log.info('processing conversation');

            if (!valid_convo(convo)) {
                return;
            }

            let user = await users.findOne({ _id: convo.user_id });

            convo.messages.map(async (message) => {
                try {
                    let ok = await schedule(chan, user, message.body);
                    log.info(`scheduled message for User#${user._id} ok: ${ok}`);
                } catch (err) {
                    log.info(`scheduled message for User#${user._id} ok: false`);
                    log.error(err);
                }
            });
        }, completed_convo_query);

    log.info(`triggering task every ${interval} ms`);
    setInterval(task, interval);
}

if (!module.parent) {
    scheduler();
}
