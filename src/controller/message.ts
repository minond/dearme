import * as moment from 'moment';
import { flatten } from 'lodash';

import * as sms from '../device/sms';
import { Channel } from '../device/amqp';
import { User } from '../repository/user';
import { Message } from '../repository/message';
import { config } from '../application';
import { buffer } from '../utilities';

export type Questions = { [index: string]: string[][] }[];
export type QueuedMessage = { phone: string, body: string };

const base_url = config<string>('app.url');
const survey_url = config<string>('app.survey_url');

const queue = config<string>('amqp.queues.messages');
const questions = config<Questions>('questions.personalities');

export function get_user_survey_link(user: User): string {
    return `${survey_url}?personality=${user.assigned_personality}&phonenumber=${user.phone}`;
}

function get_user_journal_link(user: User): string {
    return `${base_url}/u/${user.guid}`;
}

function merge_fields(
    body: string,
    user: User
): string {
    return body
        .replace('[LINK TO JOURNAL]', get_user_journal_link(user))
        .replace('[LINK TO SURVEY]', get_user_survey_link(user));
}

function build_message(
    body: string,
    send_date: Date,
    user: User,
    scheduled: boolean
): Message {
    if (!user._id) {
        throw new Error('missing user._id');
    }

    return {
        body: merge_fields(body, user),
        send_date,
        user_id: user._id,
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
    return sms.response(sms.message(msg)).toString();
}

export function no_response(): string {
    return sms.response().toString();
}

export function get_confirmation(user: User): string {
    return questions[user.assigned_personality][0][0][0];
}

export function build_messages(user: User, start: Date = new Date): Message[] {
    let my_questions = questions[user.assigned_personality];
    let days = Object.keys(my_questions).sort();

    return flatten(days.reduce((store, day: string) => {
        let day_questions: string[][] = my_questions[day];

        if (day === '0') {
            // send confirmation message another way
            store.push(build_message(day_questions[0][0], start, user, true));
        } else {
            day_questions.map((questions: string[], question_number: number) => {
                // because the last group in day goes at 8pm
                let is_last = question_number + 1 === day_questions.length;

                questions.map((question, index) => {
                    let date = figure_out_date(start, +day,
                        is_last ? 2 : question_number, !!index);

                    store.push(build_message(question, date, user, false));
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
