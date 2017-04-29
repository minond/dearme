import * as moment from 'moment';
import { flatten } from 'lodash';

import { Channel } from '../device/amqp';
import { message as sms_message, response as sms_response } from '../device/sms';
import { User } from '../repository/user';
import { Conversation, Message } from '../repository/conversation';
import { config } from '../application';
import { buffer } from '../utilities';

export type Questions = { [index: string]: string[][] }[];
export type QueuedMessage = { phone: string, body: string };

const queue = config<string>('amqp.queues.messages');
const questions = config<Questions>('questions.personalities');

export function response(msg: string): string {
    return sms_response(sms_message(msg)).toString();
}

export function no_response(): string {
    return sms_response().toString();
}

export function build_conversation(user: User): Conversation {
    let { _id: user_id } = user;
    let messages = build_messages(user);

    if (!user_id) {
        throw new Error('Missing user._id');
    }

    return { user_id, messages };
}

export function build_messages(user: User, start: Date = new Date): Message[] {
    let msg = (body: string, send_date: Date) =>
        ({ body, send_date });

    let future = (
        start: Date,
        days: number,
        message_number: 0 | 1 | 2 | number,
        second_of: boolean = false
    ): Date => {
        let holder = moment(start.valueOf())
            .millisecond(0)
            .second(0)
            .minute(0)
            .hour(0)
            .add(days, 'days');

        switch (message_number) {
            case 0:
                holder.hour(12);
                break;

            case 1:
                holder.hour(15);
                holder.minute(30);
                break;

            case 2:
                holder.hour(20);
                break;

            default:
                // ?
                holder.hour(20);
                break;
        }

        if (second_of) {
            holder.add(45, 'minutes');
        }

        return holder.toDate();
    };

    let my_questions = questions[user.assigned_personality];
    let days = Object.keys(my_questions).sort();

    return flatten(days.reduce((store, day: string) => {
        let day_questions: string[][] = my_questions[day];

        // send confirmation message right now
        if (day === '0') {
            store.push(msg(day_questions[0][0], start));
        } else {
            day_questions.map((questions: string[], question_number: number) => {
                // because the last group in day goes at 8pm
                let is_last = question_number + 1 === day_questions.length;

                questions.map((question, index) => {
                    let date = future(start, +day,
                        is_last ? 2 : question_number, !!index);

                    store.push(msg(question, date));
                });
            });
        }

        return store;
    }, [] as Message[]));
}

export function schedule(chan: Channel, user: User, body: string): Promise<boolean> {
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
