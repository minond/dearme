import * as test from 'tape';

import { valid_phone } from '../../src/validation';

test('validation functions', (t) => {
    t.plan(2);

    t.equal(true, valid_phone('+1 123 123 1234'), 'expects +1 999 999 9999');
    t.equal(false, valid_phone('123 123 1234'), 'invalid phone fails');
});
