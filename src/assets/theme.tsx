import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7F3999',
    },
    secondary: {
      main: '#999999',
    },
  },
  typography: {
    fontFamily: [
      'Fredoka',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#483dc9',
            '&.Mui-focusVisible': { background: '#483dc9' },
            '&:hover': {
              backgroundColor: '#483dc9',
            },
          },
        },
      },
    },
  },
});

export default theme;
