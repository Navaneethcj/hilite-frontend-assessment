import { useState } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

const DRAWER_WIDTH = 240;

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
        }}
      >
        <TopBar drawerWidth={DRAWER_WIDTH} onMenuClick={() => setMobileOpen(true)} />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 0,
            mt: 0,
            bgcolor: 'background.default',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              px:0,
              py: 0,
              mt: '64px',
              bgcolor: 'background.default',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
