import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { common } from './styles';
import { SignupComponent, State as SignupState } from './signup';
import { WelcomeComponent } from './welcome';
import { ConfirmComponent } from './confirm';
import { ErrorComponent } from './error';
import { post } from './http';

export enum Page { WELCOME, SIGNUP, CONFIRM, ERROR }

export type State = { page: Page; };
type Props = {};

const styles = StyleSheet.create({
    container: {
        transition: 'background .2s, color .2s',
        height: '100vh',
        width: '100vw',
    },

    white: {
        background: 'white',
        color: 'black',
    },

    black: {
        background: 'black',
        color: 'white',
    },

    padded_content: {
        padding: '10vw 7vw',
    }
});

export class HomeComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { page: Page.WELCOME };
    }

    goToSignup() {
        this.setState({ page: Page.SIGNUP });
    }

    userSigned(signup: SignupState) {
        post('/signup', signup)
            .then(res => this.setState({ page: Page.CONFIRM }))
            .catch(res => this.setState({ page: Page.ERROR }));
    }

    render() {
        let colo, view;

        switch (this.state.page) {
            case Page.WELCOME:
                colo = styles.white;
                view =
                    <WelcomeComponent
                        className={css(styles.padded_content)}
                        onComplete={() => this.goToSignup()} />;

                break;

            case Page.SIGNUP:
                colo = styles.black;
                view =
                    <SignupComponent
                        className={css(styles.padded_content)}
                        onComplete={(signup) => this.userSigned(signup)} />;
                break;

            case Page.CONFIRM:
                colo = styles.white;
                view = <ConfirmComponent
                    className={css(styles.padded_content, common.fade_in_up_large_slow)} />;

                break;

            case Page.ERROR:
                colo = styles.white;
                view = <ErrorComponent
                    className={css(styles.padded_content, common.fade_in_up_large_slow)} />;

                break;
        }

        return <div className={css(colo, styles.container)}>{view}</div>;
    }
}
