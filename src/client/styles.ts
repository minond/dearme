import { StyleSheet } from 'aphrodite';

export const small_font_size = '22px';
export const med_font_size = '35px';
export const large_font_size = '120px';

export const common = StyleSheet.create({
    small_text: {
        fontSize: small_font_size,
        lineHeight: '32px',
    },

    med_text: {
        fontSize: med_font_size,
        lineHeight: med_font_size,
    },

    large_text: {
        fontSize: large_font_size,
        lineHeight: large_font_size,
    },

    text_centered: {
        textAlign: 'center',
    },

    button: {
        border: '1px solid #c3c3c3',
        background: 'white',
        fontSize: small_font_size,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding: '20px',
        minWidth: '350px',
    },

    med_space: {
        height: '90px',
    },

    large_space: {
        height: '125px',
    },

    text_input: {
        background: 'transparent',
        borderBottom: '1px solid white',
        borderLeft: 0,
        borderRight: 0,
        borderTop: 0,
        color: 'white',
        fontFamily: 'initial',
        marginLeft: '7px',
        paddingLeft: '5px',
        fontSize: med_font_size,
        outline: 0,
        width: '180px',
    },

    fade_in_up: {
        animationDuration: '.8s',
        animationName: [{
            from: {
                opacity: 0,
                transform: 'translate3d(0, 70%, 0)',
            },

            to: {
                opacity: 1,
                transform: 'none',
            }
        }],
    },

    fade_in_up_slow: {
        animationDuration: '1.2s',
        animationName: [{
            from: {
                opacity: 0,
                transform: 'translate3d(0, 50%, 0)',
            },

            to: {
                opacity: 1,
                transform: 'none',
            }
        }],
    },
});
