import { Channel } from '../device/amqp';
import { message as sms_message, response as sms_response } from '../device/sms';
import { User } from '../repository/user';
import { Message } from '../repository/conversation';
import { config } from '../application';
import { buffer, now } from '../utilities';

export type Questions = string[][][][];
export type QueuedMessage = { phone: string, body: string };

const queue = config<string>('amqp.queues.messages');
export const questions = config<Questions>('questions.personalities');

export function response(msg: string): string {
    return sms_response(sms_message(msg)).toString();
}

export function no_response(): string {
    return sms_response().toString();
}

export function build_schedule(user: User, start: number = now()): Message[] {
    let msg = (body: string, send_date: number) =>
        ({ body, send_date });

    return [
        msg(questions[user.assigned_personality][0][0][0], start),
    ];
}

export function schedule(chan: Channel, user: User): Promise<boolean> {
    let body = questions[user.assigned_personality][0][0][0];

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

        let ok = chan.sendToQueue(queue, buff);

        if (!ok) {
            reject(new Error(`count not send to ${queue} queue`));
            return;
        }

        resolve(true);
    });
}
