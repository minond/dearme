/// <reference path="../declarations.d.ts"/>

import * as React from 'react';
import * as DOM from 'react-dom';
import { HomeComponent } from './home';

DOM.render(<HomeComponent />, document.querySelector('#app'));
