import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#2e7d32',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#ef6c00',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  },
});

theme.custom = {
  colors: {
    border: '#e0e0e0',
    softBg: '#f5f5f5',
    mutedText: '#757575',
    successBg: '#e8f5e9',
    gentleBg: '#f3f3f3',
  },
  spacing: {
    pageBottom: 8,
    cardGap: 1.5,
  },
};

export default theme;
