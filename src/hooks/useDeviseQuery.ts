import { useMediaQuery, useTheme } from '@material-ui/core';

export interface IDeviceQuery {
  smUp: boolean;
  mdUp: boolean;
  lgUp: boolean;
  smDown: boolean;
  mdDown: boolean;
  lgDown: boolean;
  xsOnly: boolean;
  smOnly: boolean;
  mdOnly: boolean;
  lgOnly: boolean;
  xlOnly: boolean;
}

export default (): IDeviceQuery => {
  const theme = useTheme();
  return {
    smUp: useMediaQuery(theme.breakpoints.up('sm')),
    mdUp: useMediaQuery(theme.breakpoints.up('md')),
    lgUp: useMediaQuery(theme.breakpoints.up('lg')),
    smDown: useMediaQuery(theme.breakpoints.down('sm')),
    mdDown: useMediaQuery(theme.breakpoints.down('md')),
    lgDown: useMediaQuery(theme.breakpoints.down('lg')),
    xsOnly: useMediaQuery(theme.breakpoints.down('xs')),
    smOnly: useMediaQuery(theme.breakpoints.only('sm')),
    mdOnly: useMediaQuery(theme.breakpoints.only('md')),
    lgOnly: useMediaQuery(theme.breakpoints.only('lg')),
    xlOnly: useMediaQuery(theme.breakpoints.up('xl')),
  };
};
