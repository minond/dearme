import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { common } from './styles';

type Props = { className?: string; };
type State = {};

const styles = StyleSheet.create({
    pull_in: {
        marginLeft: '-4px',
    }
});

export class SignupComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let phone =
            <div className={css(common.med_text, common.med_space)}>
                <span>my phone number is</span>
                <input className={css(common.text_input)} type='text' />
            </div>;

        let twitter =
            <div className={css(common.med_text)}>
                <span>my instagram handle is @</span>
                <input className={css(common.text_input, styles.pull_in)} type='text' />
            </div>;

        return (
            <div className={this.props.className}>
                {phone}
                {twitter}
            </div>
        );
    }
}
