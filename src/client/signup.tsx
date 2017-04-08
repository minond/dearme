import { css } from 'aphrodite';
import { common } from './styles';

import * as React from 'react';

type Props = { className?: string; };

export const SignupComponent = ({ className }: Props) =>
    <div className={className}>
        <div className={css(common.med_text)}>
            <span>my phone number is</span>
            <input className={css(common.text_input)} type='text' />
        </div>
    </div>;
