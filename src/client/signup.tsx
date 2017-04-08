import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { common } from './styles';

type Props = { className?: string; };
type State = { hasPhone: boolean };

const styles = StyleSheet.create({
    pull_in: {
        marginLeft: '-4px',
    }
});

export class SignupComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasPhone: false };
    }

    changedPhone(txt: string | null) {
        if (txt && txt.length >= 10) {
            this.setState({ hasPhone: true });
        }
    }

    render() {
        let phone =
            <div className={css(common.med_text, common.med_space, common.fade_in_up)}>
                <span>my phone number is</span>
                <input type='text'
                    className={css(common.text_input)}
                    onChange={(e) => this.changedPhone(e.target.value)} />
            </div>;

        let twitter = !this.state.hasPhone ? <div></div> :
            <div className={css(common.fade_in_up_slow)}>
                <div className={css(common.med_text, common.large_space)}>
                    <span>my instagram handle is @</span>
                    <input className={css(common.text_input, styles.pull_in)} type='text' />
                </div>
                <div className={css(common.med_text)}>
                    <button className={css(common.button)}>submit</button>
                </div>
            </div>;

        return (
            <div className={this.props.className}>
                {phone}
                {twitter}
            </div>
        );
    }
}
