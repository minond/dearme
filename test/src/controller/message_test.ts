import * as test from 'tape';

import { build_messages } from '../../../src/controller/message';
import { expected_messages } from './expected_messages';

const start_time = new Date(1493442000000);
const user = {
    _id: '123' as _,
    phone: '1231231234',
    inactive: false,
    assigned_personality: 0,
};

test('messages controller', (t) => {
    t.plan(expected_messages.length * 2);

    const schedule = build_messages(user, start_time);

    schedule.map((item, index) => {
        t.equal(expected_messages[index].body, item.body,
            `item #${index} has the right message body`);

        t.equal(new Date(expected_messages[index].send_date).valueOf(),
            item.send_date.valueOf(),
            `item #${index} has the right scheduled date`);
    });
});
