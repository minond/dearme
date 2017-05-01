"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const lodash_1 = require("lodash");
const sms_1 = require("../device/sms");
const application_1 = require("../application");
const utilities_1 = require("../utilities");
const queue = application_1.config('amqp.queues.messages');
const questions = application_1.config('questions.personalities');
function response(msg) {
    return sms_1.response(sms_1.message(msg)).toString();
}
exports.response = response;
function no_response() {
    return sms_1.response().toString();
}
exports.no_response = no_response;
function get_confirmation(user) {
    return questions[user.assigned_personality][0][0][0];
}
exports.get_confirmation = get_confirmation;
function build_messages(user, start = new Date) {
    let scheduled = false;
    let { _id: user_id } = user;
    let msg = (body, send_date) => {
        if (!user_id) {
            throw new Error('missing user_id');
        }
        return { body, send_date, user_id, scheduled, responses: [] };
    };
    let future = (start, days, message_number, second_of = false) => {
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
    return lodash_1.flatten(days.reduce((store, day) => {
        let day_questions = my_questions[day];
        if (day !== '0') {
            day_questions.map((questions, question_number) => {
                let is_last = question_number + 1 === day_questions.length;
                questions.map((question, index) => {
                    let date = future(start, +day, is_last ? 2 : question_number, !!index);
                    store.push(msg(question, date));
                });
            });
        }
        return store;
    }, []));
}
exports.build_messages = build_messages;
function schedule(chan, user, body) {
    return new Promise((resolve, reject) => {
        let { phone } = user;
        let item = { phone, body };
        let buff = utilities_1.buffer(item);
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
exports.schedule = schedule;
