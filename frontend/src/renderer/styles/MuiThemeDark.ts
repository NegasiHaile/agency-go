import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#04A1FF',
      contrastText: '#ffffff33',
      light: '#0CFFC0',
      dark: '#3f3f3fff',
    },
    secondary: {
      main: '#0F0F0F',
      contrastText: '#AAAAAA',
      light: '#292929',
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
     
      color: '#fff',
    },
  },
});


export default darkTheme;
