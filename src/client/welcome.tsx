import * as React from 'react';
import { css } from 'aphrodite';
import { common } from './styles';

type Props = {
    onComplete: () => void;
    className?: string;
};

export const WelcomeComponent = ({ onComplete, className }: Props) =>
    <div className={className}>
        <div className={css(common.text_centered)}>
            <div className={css(common.large_text)}>dear me,</div>
            <div className={css(common.med_space_but_a_little_smaller)}></div>

            <section className={css(common.small_text)}>
                <div>The easiest way to journal EVER.</div>
                <div>We send a few texts a day. You answer.</div>
            </section>

            <div className={css(common.med_space)}></div>
            <button className={css(common.button)}
                onClick={() => onComplete()}>sign up</button>
        </div>
    </div>;
