import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { SignupComponent } from './signup';
import { WelcomeComponent } from './welcome';

import * as React from 'react';

enum Page { WELCOME, SIGNUP, CONFIRM };

type Props = {};
type State = { page: Page; };

const styles = StyleSheet.create({
    container: {
        transition: 'background .6s, color .2s',
        height: '100vh',
        width: '100vw',
    },

    black: {
        background: 'white',
        color: 'black',
    },

    white: {
        background: 'black',
        color: 'white',
    },

    centered: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class HomeComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.state = { page: Page.WELCOME };
        // XXX
        this.state = { page: Page.SIGNUP };
    }

    goToSignup() {
        this.setState({ page: Page.SIGNUP });
    }

    render() {
        let colo, view;

        switch (this.state.page) {
            case Page.WELCOME:
                colo = styles.black;
                view = <WelcomeComponent
                    className={css(styles.centered)}
                    onSignUp={() => this.goToSignup()} />;

                break;

            case Page.SIGNUP:
                colo = styles.white;
                view = <SignupComponent />;
                break;
        }

        return  <div className={css(colo, styles.container)}>{view}</div>;
    }
}
