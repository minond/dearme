import { StyleSheet, css } from 'aphrodite';
import { common } from './styles';

import * as React from 'react';

type Props = {
    onSignUp: () => void
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

export const WelcomeComponent = ({ onSignUp }: Props) =>
    <div className={css(common.centered_text)}>
        <div className={css(styles.dearme_img)}></div>
        <div className={css(common.med_space)}></div>

        <section className={css(common.text)}>
            <div>The easiest way to journal EVER.</div>
            <div>We send a few texts a day. You answer.</div>
            <div>We add your instagram photos.</div>
            <div>You have a journal.</div>
        </section>

        <div className={css(common.med_space)}></div>
        <button className={css(common.button)}
            onClick={() => onSignUp()}>sign up</button>
    </div>;
