import { Channel } from '../device/amqp';
import { User } from '../repository/user';
import { config } from '../application';
import { buffer } from '../utilities';

export enum Message { CONFIRMATION, DAY }

const QUEUE = config<string>('amqp.queues.messages');
const QUESTIONS = config<string[][][][]>('questions.personalities');

export function message(chan: Channel) {
    return {
        schedule(user: User, mtype: Message): Promise<boolean> {
            let body: string = '';

            if (mtype === Message.CONFIRMATION) {
                body = QUESTIONS[user.assigned_personality][0][0][0];
            }

            return new Promise<boolean>((resolve, reject) => {
                let { phone } = user;
                let item = { phone, body };
                let buff = buffer(item);

                if (!phone) {
                    reject(new Error('missing phone'));
                    return;
                }

                if (!body) {
                    reject(new Error('missing body'));
                    return;
                }

                let ok = chan.sendToQueue(QUEUE, buff);

                if (!ok) {
                    reject(new Error(`count not send to ${QUEUE} queue`));
                    return;
                }

                resolve(true);
            });
        }
    };
}
