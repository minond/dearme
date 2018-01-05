/// <reference path="../declarations.d.ts"/>

import * as React from 'react';
import * as DOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { HomeComponent } from './home';
import { JournalComponent } from './journal';

const Main = () => (
    <Router>
        <div>
            <Route path="/dearme/" exact={true} render={() => <HomeComponent />} />
            <Route path="/dearme/u/:guid" render={({ match }) => <JournalComponent guid={match.params.guid} />} />
        </div>
    </Router>
);

DOM.render(<Main />, document.querySelector('#app'));
