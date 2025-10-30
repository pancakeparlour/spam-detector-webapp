import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {    // the site's primary color scheme
    primary: {
      main: '#0f62fe',
      contrastText: '#fff',
    },
  },
  components: { // component theming overrides.
    MuiButton: {// customizes 'clear', 'submit' and popup btns
      styleOverrides: {
        root: { // for all button variants
            borderRadius: 0,
            textTransform: 'none',
            paddingInline: '1.75rem',
            paddingBlock: '0.65rem',
            fontSize: '1rem',
        },
        contained: {
          borderRadius: 0,
          textTransform: 'none',
          paddingInline: '1.75rem',
          paddingBlock: '0.65rem',
        },
        outlinedPrimary: {
            color: '#0f62fe',
            borderColor: '#0f62fe',
            '&:hover': {
              borderColor: '#0f62fe',
              backgroundColor: '#0f62fe',
              color: '#fff',
            },
        }
      },
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        color: 'primary',
      },
    },
  },
});
export default theme;