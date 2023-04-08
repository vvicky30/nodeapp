import { createTheme } from "@mui/material/styles";
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export const alphaSearchTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '-0.005px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: factor => `${0.5 * factor}rem`,
  overrides: {
   
  },
});
