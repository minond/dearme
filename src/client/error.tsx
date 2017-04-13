import * as React from 'react';
import { css } from 'aphrodite';
import { common } from './styles';

type Props = { className?: string; };

export const ErrorComponent = ({ className }: Props) =>
    <div className={className}>
        <div className={css(common.text_centered)}>
            <div className={css(common.large_text)}>oopppss!!</div>
            <div className={css(common.med_space)}></div>

            <section className={css(common.small_text)}>
                <div>Something went wrong wile trying to save your information.</div>
                <div>Can you try again in a little bit?</div>
            </section>

            <div className={css(common.med_space)}></div>
        </div>
    </div>;
