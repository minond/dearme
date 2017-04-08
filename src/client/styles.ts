import { StyleSheet } from 'aphrodite';

export const med_font_size = '35px';

export const common = StyleSheet.create({
    small_text: {
        fontSize: '22px',
        lineHeight: '32px',
    },

    med_text: {
        fontSize: med_font_size,
        lineHeight: '40px',
    },

    text_centered: {
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

    text_input: {
        background: 'black',
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
});
