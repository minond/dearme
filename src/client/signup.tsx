import * as React from 'react';
import { Component } from 'react';
import { css } from 'aphrodite';
import { common } from './styles';

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

    render() {
        let { onComplete } = this.props;

        return (
            <div className={this.props.className}>
                <div className={css(common.fade_in_up_slow)}>
                    <div className={css(common.med_text, common.large_space)}>
                        <span>my phone number is</span>
                        <input type="phone"
                            autoFocus={true}
                            className={css(common.text_input)}
                            onChange={(e) => this.changedPhone(e.target.value)} />
                    </div>

                    <div className={css(common.med_text)}>
                        <button className={css(common.button)}
                            onClick={() => onComplete(this.state)}>submit</button>
                    </div>
                </div>
            </div>
        );
    }
}
