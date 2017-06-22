import * as test from 'tape';

import { build_messages, get_confirmation } from '../../../src/controller/message';
import { build_expected_messages } from './expected_messages';

const start_time = new Date(1493442000000);
const user = {
    _id: '123' as _,
    guid: '123',
    fname: 'Marcos',
    phone: '1231231234',
    inactive: false,
    assigned_personality: 0,
};

const expected_messages = build_expected_messages(user);

test('messages controller', (t) => {
    const schedule = build_messages(user, start_time);

    t.plan(schedule.length * 2 + 1)

    t.equal(expected_messages[0].body, get_confirmation(user));

    schedule.map((item, index) => {
        t.equal(expected_messages[index].body, item.body,
            `item #${index} has the right message body`);

        t.equal(new Date(expected_messages[index].send_date).valueOf(),
            item.send_date.valueOf(),
            `item #${index} has the right scheduled date`);
    });
});
