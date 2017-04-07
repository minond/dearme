import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import * as React from 'react';

type Props = {};

type State = {
    active: boolean;
};

const styles = StyleSheet.create({
    home: {
        transition: 'background .2s, color .2s',
        height: '100vh',
        width: '100vw',
    },

    inactive: {
        background: 'white',
        color: 'black',
    },

    active: {
        background: 'black',
        color: 'white',
    },
});

export class HomeComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { active: false };
    }

    start() {
        this.setState({ active: true });
    }

    render() {
        var style = this.state.active ? styles.active : styles.inactive;

        return  <div className={css(styles.home, style)}>
                    <div>hi</div>
                    <button onClick={() => this.start()}>start</button>
                </div>;
    }
}
