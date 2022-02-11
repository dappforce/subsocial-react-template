import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#eb2f96',
    },
    secondary: {
      main: '#888',
    },
    info: {
      main: '#eb2f96',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 810,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        message: {
          color: '#000',
        },
        standardWarning: {
          backgroundColor: '#FEFBE8',
        },
        icon: {
          color: '#EFB041',
        },
      },
    },
  },
});
