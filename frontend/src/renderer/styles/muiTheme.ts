import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      contrastText: '#EAF1FF',
      main: '#04A1FF',

      light: '#0CFFC0',
      dark: '#3f3f3fff',
    },
    secondary: {
      light: '#292929',
      main: '#fff',
      contrastText: '#AAAAAA',
    },
    error: {
      main: '#FF0000',
    },
    info: {
      main: '#37DE8F',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: '12px',
      color: '#fff',
    },

    h1: {
      color: '#000',
    },
  },
});


export default lightTheme;
