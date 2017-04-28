import { Channel } from '../device/amqp';
import { message as sms_message, response as sms_response } from '../device/sms';
import { User } from '../repository/user';
import { config } from '../application';
import { buffer } from '../utilities';

export enum Message { CONFIRMATION, DAY }
export type QueuedMessage = { phone: string, body: string };

const QUEUE = config<string>('amqp.queues.messages');
const QUESTIONS = config<string[][][][]>('questions.personalities');

export function response(msg: string): string {
    return sms_response(sms_message(msg)).toString();
}

export function no_response(): string {
    return sms_response().toString();
}

export function schedule(chan: Channel, user: User, mtype: Message): Promise<boolean> {
    let body: string = '';

    if (mtype === Message.CONFIRMATION) {
        body = QUESTIONS[user.assigned_personality][0][0][0];
    }

    return new Promise<boolean>((resolve, reject) => {
        let { phone } = user;
        let item: QueuedMessage = { phone, body };
        let buff = buffer(item);

        if (!chan) {
            reject(new Error('missing channel'));
            return;
        }

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
