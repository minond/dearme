import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import * as React from 'react';

const styles = StyleSheet.create({
    hi: {
        border: '1px solid red'
    }
});

type Props = {};
type State = {};

export class HomeComponent extends Component<Props, State> {
    render() {
        return (<div className={css(styles.hi)}>hi</div>);
    }
}
