import * as test from 'tape';

import { clean_phone, format_phone } from '../../src/utilities';

test('utility functions', (t) => {
    t.plan(4);

    t.equal('+1 123 123 1234', format_phone('+11231231234'), 'formats plain string');
    t.equal('+1 123 123 1234', format_phone(' +11 2312   31234   '), 'formats with random spaces');

    t.equal('11231231234', clean_phone('+1 123 123 1234'), 'cleans up phone');
    t.equal('11231231234', clean_phone(' +11 2312   31234   '), 'cleans up phone');
});
