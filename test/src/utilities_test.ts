import * as test from 'tape';

import { format_phone } from '../../src/utilities';

test('utility functions', (t) => {
    t.plan(2);

    t.equal('+1 123 123 1234', format_phone('+11231231234'), 'formats plain string');
    t.equal('+1 123 123 1234', format_phone(' +11 2312   31234   '), 'formats with random spaces');
});
