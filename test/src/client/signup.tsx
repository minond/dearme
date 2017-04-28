import * as React from 'react';
import * as test from 'tape';
import { mount } from 'enzyme';

import { SignupComponent, State as SignupState } from '../../../src/client/signup';

import './dom';

test('signup component', (t) => {
    t.plan(3);

    const elem = mount<_, SignupState>(<SignupComponent onComplete={() => null} />);
    const comp = elem.instance() as SignupComponent;

    t.equal(false, comp.hasValidState(), 'starts out with an invalid state');

    comp.changedPhone('invalid');
    t.equal(false, comp.hasValidState(), 'and stays invalid with an invalid phone string');

    comp.changedPhone('+1 123 123 1234');
    t.equal(true, comp.hasValidState(), 'correct format equals valid state');
});
