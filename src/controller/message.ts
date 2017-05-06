import * as moment from 'moment';
import { flatten } from 'lodash';

import { ModelID } from '../device/model';
import { Channel } from '../device/amqp';
import { message as sms_message, response as sms_response } from '../device/sms';
import { User } from '../repository/user';
import { Message } from '../repository/message';
import { config } from '../application';
import { buffer } from '../utilities';

export type Questions = { [index: string]: string[][] }[];
export type QueuedMessage = { phone: string, body: string };

const queue = config<string>('amqp.queues.messages');
const questions = config<Questions>('questions.personalities');

function build_message(
    body: string,
    send_date: Date,
    user_id: ModelID | undefined,
    scheduled: boolean
): Message {
    if (!user_id) {
        throw new Error('missing user_id');
    }

    return {
        body,
        send_date,
        user_id,
        scheduled,
        responses: []
    };
}

function figure_out_date(
    start: Date,
    days: number,
    message_number: 0 | 1 | 2 | number,
    second_of: boolean = false
): Date {
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
}

export function response(msg: string): string {
    return sms_response(sms_message(msg)).toString();
}

export function no_response(): string {
    return sms_response().toString();
}

export function get_confirmation(user: User): string {
    return questions[user.assigned_personality][0][0][0];
}

export function build_messages(user: User, start: Date = new Date): Message[] {
    let { _id: user_id } = user;

    let my_questions = questions[user.assigned_personality];
    let days = Object.keys(my_questions).sort();

    return flatten(days.reduce((store, day: string) => {
        let day_questions: string[][] = my_questions[day];

        if (day === '0') {
            // send confirmation message another way
            store.push(build_message(day_questions[0][0], start, user_id, true));
        } else {
            day_questions.map((questions: string[], question_number: number) => {
                // because the last group in day goes at 8pm
                let is_last = question_number + 1 === day_questions.length;

                questions.map((question, index) => {
                    let date = figure_out_date(start, +day,
                        is_last ? 2 : question_number, !!index);

                    store.push(build_message(question, date, user_id, false));
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
