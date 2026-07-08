import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useThemeStore } from './store/theme.store';
import { createAppTheme } from './theme';
import { useEffect, useMemo } from 'react';
import { AnalyticsEvents } from './analytics/events';

function App() {
  const { mode } = useThemeStore();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    AnalyticsEvents.appLoaded();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;