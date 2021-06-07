import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core';
import { palette, CustomPalette } from './palette';

type Modify<T, R> = Omit<T, keyof R> & R;

export type CustomTheme = Modify<
  Theme,
  {
    palette: CustomPalette;
    layout: {
      contentWidth: number;
    };
  }
>;

export const createFMCTheme = (): CustomTheme => {
  const baseTheme = responsiveFontSizes(
    createMuiTheme({
      palette,
      props: {
        MuiTextField: {
          variant: 'outlined',
          size: 'medium',
        },
      },
      typography: {
        fontFamily: 'Lato',
      },
      zIndex: {
        appBar: 1200,
        drawer: 1100,
      },
      overrides: {
        MuiButton: {
          containedSecondary: {
            color: '#7157FF',
          },
          label: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignContent: 'center',
            justifyContent: 'space-around',
          },
        },
        MuiRadio: {
          colorSecondary: {
            '&.Mui-checked': {
              color: '#7157FF',
            },
          },
        },
        MuiDialog: {
          paper: {
            borderRadius: '22px',
          },
          paperWidthSm: {
            maxWidth: 1000,
          },
        },
        MuiBackdrop: {
          root: {
            backgroundColor: '#4A37B1E6', // Opacity 90%
          },
        },
        MuiOutlinedInput: {
          root: {
            borderRadius: 5,
          },
          input: {
            borderRadius: 5,
            fontFamily: 'Lato',
            fontWeight: 600,
            fontSize: 17,
            lineHeight: '21px',
            color: '#2A2D3C',
            border: '2px solid #D8D8D8',
            paddingLeft: 20,
            background: palette.common?.white,

            '.with-start-icon &': {
              paddingLeft: 40,
            },
          },
          multiline: {
            padding: 0,
          },
          inputMultiline: {
            padding: 20,
          },
        },
        MuiSelect: {
          outlined: {
            borderRadius: 5,
          },
        },
        MuiInputLabel: {
          outlined: {
            fontFamily: 'Lato',
            fontWeight: 600,
            fontSize: 17,
            lineHeight: '21px',
            color: '#A2A1A8',
            paddingLeft: 10,

            '.with-start-icon &': {
              paddingLeft: 40,
            },

            '&.Mui-focused': {
              display: 'none',
            },
            '&.MuiFormLabel-filled': {
              display: 'none',
            },
          },
        },
        MuiSvgIcon: {
          colorSecondary: {
            color: '#BDC1DA',
          },
          colorAction: {
            color: '#FFFFFF',
          },
        },
      },
    })
  );

  return {
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      alternate: palette.alternate,
      cardShadow: palette.cardShadow,
      background: palette.background,
    },
    layout: {
      contentWidth: 1140,
    },
  };
};
