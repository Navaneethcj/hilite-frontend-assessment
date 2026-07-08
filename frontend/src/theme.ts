import { createTheme } from '@mui/material/styles';
import { indigo, blue } from '@mui/material/colors';

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: indigo[600],
        light: indigo[400],
        dark: indigo[800],
      },
      secondary: {
        main: blue[600],
      },
      background: {
        default: mode === 'light' ? '#f5f6fa' : '#0f1117',
        paper: mode === 'light' ? '#ffffff' : '#1a1d27',
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    components: {

      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow:
              mode === 'light'
                ? '0 1px 4px 0 rgba(0,0,0,0.08), 0 4px 16px 0 rgba(0,0,0,0.04)'
                : '0 1px 4px 0 rgba(0,0,0,0.4)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: { fontWeight: 600 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
    },
  });

export default createAppTheme('light');
