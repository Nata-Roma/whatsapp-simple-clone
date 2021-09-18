import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
  },
});

export default theme;
