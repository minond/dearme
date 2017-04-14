import * as React from 'react';
import { css } from 'aphrodite';
import { common } from './styles';

type Props = { className?: string; };

export const ConfirmComponent = ({ className }: Props) =>
    <div className={className}>
        <div className={css(common.text_centered)}>
            <div className={css(common.large_text)}>awesome!</div>
            <div className={css(common.med_space)}></div>

            <section className={css(common.small_text, common.wrap_it_around_a_bit)}>
                <div>Check your phone for a confirmation text.</div>
                <div>The first week of your journal will be delivered to you one week from today.</div>
            </section>

            <div className={css(common.med_space)}></div>
        </div>
    </div>;
