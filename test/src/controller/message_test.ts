import * as test from 'tape';

import { now } from '../../../src/utilities';
import { build_schedule, questions } from '../../../src/controller/message';

const start_time = now();
const my_questions = questions[0];

const user = {
    phone: '1231231234',
    inactive: false,
    assigned_personality: 0,
};

test('messages controller', (t) => {
    t.plan(2);

    const schedule = build_schedule(user, start_time);

    t.equal(schedule[0].body, my_questions[0][0][0], 'has the first confirmation message');
    t.equal(schedule[0].send_date, start_time, 'with the right start time');
});
