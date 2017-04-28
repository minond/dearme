import * as React from 'react';
import * as test from 'tape';
import { mount } from 'enzyme';

import { HomeComponent, State as HomeState, Page } from '../../../src/client/home';

import './init';

test('home component', (t) => {
    t.plan(3);

    const elem = mount<_, HomeState>(<HomeComponent />);

    t.equal(Page.WELCOME, elem.state().page, 'starts out on welcome page');

    elem.find('button').simulate('click');
    t.equal(Page.SIGNUP, elem.state().page, 'should move on the signup page on first click');

    elem.find('button').simulate('click');
    t.equal(Page.SIGNUP, elem.state().page, 'cannot move on until a phone is provided');
});
