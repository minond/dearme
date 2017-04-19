import * as React from 'react';
import { Component } from 'react';
import * as InputElement from 'react-input-mask';
import { css } from 'aphrodite';
import { common } from './styles';

const PHONE_MASK = '+1 999 999 9999';
const PHONE_TEST = /^\+1 \d\d\d \d\d\d \d\d\d\d$/;

type Props = {
    onComplete: (signup: State) => void;
    className?: string;
};

export type State = {
    phone: string | null
};

export class SignupComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { phone: null };
    }

    changedPhone(phone: string | null) {
        this.setState({ phone });
    }

    hasValidState(): boolean {
        return !!this.state.phone && PHONE_TEST.test(this.state.phone);
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
                    <div className={css(common.med_text, common.large_space)}>
                        <span>my phone number is</span>
                        <InputElement
                            autoFocus={true}
                            className={css(common.text_input)}
                            mask={PHONE_MASK}
                            maskChar=" "
                            onChange={(e) => this.changedPhone(e.currentTarget.value)}
                        />
                    </div>

                    <div className={css(common.med_text)}>
                        <button className={css(common.button)}
                            disabled={!this.hasValidState()}
                            onClick={() => this.onSubmit()}>submit</button>
                    </div>
                </div>
            </div>
        );
    }
}
