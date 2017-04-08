import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { common } from './styles';

type Props = {
    onComplete: () => void;
    className?: string;
};

const styles = StyleSheet.create({
    dearme_img: {
        backgroundImage: 'url(/assets/images/dearme.png)',
        height: '130px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        width: '650px',
    },
});

export const WelcomeComponent = ({ onComplete, className }: Props) =>
    <div className={className}>
        <div className={css(common.text_centered)}>
            <div className={css(styles.dearme_img)}></div>
            <div className={css(common.med_space)}></div>

            <section className={css(common.small_text)}>
                <div>The easiest way to journal EVER.</div>
                <div>We send a few texts a day. You answer.</div>
                <div>We add your instagram photos.</div>
                <div>You have a journal.</div>
            </section>

            <div className={css(common.med_space)}></div>
            <button className={css(common.button)}
                onClick={() => onComplete()}>sign up</button>
        </div>
    </div>;
