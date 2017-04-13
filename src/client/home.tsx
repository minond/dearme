import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { common } from './styles';
import { SignupComponent, SignupState } from './signup';
import { WelcomeComponent } from './welcome';
import { ConfirmComponent } from './confirm';
import { ErrorComponent } from './error';
import { post } from './http';

enum Page { WELCOME, SIGNUP, CONFIRM, ERROR }

type Props = {};
type State = { page: Page; };

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

    centered: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    padded_content: {
        paddingTop: '10vw',
        paddingLeft: '10vw',
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
                        className={css(styles.centered)}
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
                    className={css(styles.centered, common.fade_in_up_large_slow)} />;

                break;

            case Page.ERROR:
                colo = styles.white;
                view = <ErrorComponent
                    className={css(styles.centered, common.fade_in_up_large_slow)} />;

                break;
        }

        return <div className={css(colo, styles.container)}>{view}</div>;
    }
}
