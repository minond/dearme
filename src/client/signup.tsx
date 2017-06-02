import * as React from 'react';
import { Component } from 'react';
import * as InputElement from 'react-input-mask';
import { css } from 'aphrodite';
import { common } from './styles';
import { PHONE_MASK, valid_phone } from '../validation';

type Props = {
    onComplete: (signup: State) => void;
    className?: string;
};

export type State = {
    fname: string | null,
    phone: string | null,
};

export class SignupComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fname: null,
            phone: null,
        };
    }

    changedFName(fname: string | null) {
        this.setState({ fname });
    }

    changedPhone(phone: string | null) {
        this.setState({ phone });
    }

    hasValidState(): boolean {
        return valid_phone(this.state.phone) && !!this.state.fname;
    }

    onSubmit() {
        if (this.hasValidState()) {
            this.props.onComplete(this.state);
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className={css(common.fade_in_up_slow)}>
                    <form onSubmit={(ev) => { ev.preventDefault(); this.onSubmit(); }}>
                        <div className={css(common.med_text, common.large_space)}>
                            <span>my first name is</span>
                            <input
                                autoFocus={true}
                                className={css(common.text_input)}
                                type="text"
                                onChange={(e) => this.changedFName(e.currentTarget.value)}
                            />
                        </div>

                        <div className={css(common.med_text, common.large_space)}>
                            <span>my phone number is</span>
                            <InputElement
                                className={css(common.text_input)}
                                mask={PHONE_MASK}
                                maskChar=" "
                                type="phone"
                                onChange={(e) => this.changedPhone(e.currentTarget.value)}
                            />
                        </div>

                        <div className={css(common.med_text)}>
                            <button className={css(common.button)}
                                disabled={!this.hasValidState()}>submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
