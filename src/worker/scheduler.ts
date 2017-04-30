import * as ms from 'millisecond';
import { config } from '../application';
import { mongo, Connecting } from '../device/mongo';
import { channel, LazyChannel } from '../device/amqp';
import { logger } from '../log';
import { user, User } from '../repository/user';
import { schedule } from '../controller/message';
import { message, Message } from '../repository/message';

const log = logger(__filename);

const range = ms(config<string>('app.worker.scheduler.range'));
const interval = ms(config<string>('app.worker.scheduler.interval'));

const completed_convo_query = (err?: Error) =>
    err ? log.error(err) : true;

export async function scheduler(
    connection: Connecting = mongo,
    messages_chan: LazyChannel = channel.messages
) {
    let db = await connection;
    let users = user(db);
    let messages = message(db);
    let chan = await messages_chan();

    let now = Date.now();

    let $gte = new Date(now - range / 2);
    let $lte = new Date(now + range / 2);

    let query = {
        send_date: { $gte, $lte },
        scheduled: false,
        user_id: { $exists: true },
        body: { $exists: true },
    };

    let task = () => {
        let user_cache: { [index: string]: User } = {};

        messages.find(query)
            .forEach(async (message: Message) => {
                let { user_id, _id: message_id, body } = message;
                let hash = user_id.toHexString();

                log.info(`processing Message#${message_id}`);

                let user_filter = { _id: user_id };
                let message_filter = { _id: message_id };

                let user = hash in user_cache ? user_cache[hash] :
                    await users.find_one(user_filter);

                try {
                    await messages.update(message_filter, { $set: { scheduled: true } });
                    log.info(`updated scheduled flag for for User#${user_id}`);

                    let ok = await schedule(chan, user, body);
                    log.info(`scheduled message for User#${user_id} ok: ${ok}`);
                } catch (err) {
                    log.error(`error handling User#${user_id}`);
                    log.error(err);
                }
            }, completed_convo_query);
    };

    log.info(`triggering task every ${interval} ms`);
    setInterval(task, interval);
    task();
}

if (!module.parent) {
    scheduler();
}
