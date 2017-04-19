import { StyleSheet } from 'aphrodite';

export const small_font_size = '18px';
export const med_font_size = '35px';
export const large_font_size = '120px';

export const poppins_bold_font = {
    fontFamily: 'Poppins',
    src: 'local("Poppins Bold"), ' +
         'local("Poppins-Bold"), ' +
         'url("/assets/fonts/Poppins-Bold.woff2") format("woff2")'
};

export const century_schoolbook_std_font = {
    fontFamily: 'CenturySchoolbookStd',
    src: 'url("/assets/fonts/CenturySchoolbookStd.eot?#iefix") format("embedded-opentype"),' +
         'url("/assets/fonts/CenturySchoolbookStd.woff2") format("woff2"),' +
         'url("/assets/fonts/CenturySchoolbookStd.woff") format("woff"),' +
         'url("/assets/fonts/CenturySchoolbookStd.ttf") format("truetype")'
};

export const common = StyleSheet.create({
    small_text: {
        fontFamily: century_schoolbook_std_font,
        fontSize: small_font_size,
        lineHeight: '32px',
    },

    med_text: {
        fontSize: med_font_size,
        lineHeight: med_font_size,
    },

    large_text: {
        fontFamily: century_schoolbook_std_font,
        fontSize: large_font_size,
        letterSpacing: '-1px',
        lineHeight: large_font_size,
    },

    text_centered: {
        textAlign: 'center',
    },

    button: {
        fontFamily: poppins_bold_font,
        transition: 'color .5s',
        letterSpacing: '4px',
        border: '1px solid #c3c3c3',
        background: 'white',
        fontSize: small_font_size,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding: '20px',
        minWidth: '325px',

        ':not([disabled])': {
            cursor: 'pointer',
        }
    },

    med_space: {
        height: '60px',
    },

    med_space_but_a_little_smaller: {
        height: '40px',
    },

    large_space_but_a_little_smaller: {
        height: '110px',
    },

    large_space: {
        height: '125px',
    },

    wrap_it_around_a_bit: {
        maxWidth: '400px',
        margin: '0 auto',
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
        width: '245px',
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

    fade_in_up_large_slow: {
        animationDuration: '1.2s',
        animationName: [{
            from: {
                opacity: 0,
                transform: 'translate3d(0, 10%, 0)',
            },

            to: {
                opacity: 1,
                transform: 'none',
            }
        }],
    },
});
