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
            color: 'white',
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
