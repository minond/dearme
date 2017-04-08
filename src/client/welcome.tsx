import { StyleSheet, css } from 'aphrodite';

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

    text: {
        fontSize: '22px',
        lineHeight: '32px',
    },

    centered_text: {
        textAlign: 'center',
    },

    button: {
        border: '1px solid #c3c3c3',
        background: 'white',
        fontSize: '22px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding: '20px',
        minWidth: '350px',
    },

    med_space: {
        height: '75px',
    },
});

export const WelcomeComponent = ({ onSignUp }: Props) =>
    <div className={css(styles.centered_text)}>
        <div className={css(styles.dearme_img)}></div>
        <div className={css(styles.med_space)}></div>

        <section className={css(styles.text)}>
            <div>The easiest way to journal EVER.</div>
            <div>We send a few texts a day. You answer.</div>
            <div>We add your instagram photos.</div>
            <div>You have a journal.</div>
        </section>

        <div className={css(styles.med_space)}></div>
        <button className={css(styles.button)}
            onClick={() => onSignUp()}>sign up</button>
    </div>;
