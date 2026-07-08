import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: 'primary' | 'warning' | 'success' | 'error' | 'info';
  trend?: string;
}

export function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  const theme = useTheme();

  const colorMap = {
    primary: theme.palette.primary.main,
    warning: theme.palette.warning.main,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
  };

  const bgColorMap = {
    primary: theme.palette.primary.light + '22',
    warning: theme.palette.warning.light + '22',
    success: theme.palette.success.light + '22',
    error: theme.palette.error.light + '22',
    info: theme.palette.info.light + '22',
  };

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: colorMap[color],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              {value}
            </Typography>
            {trend && (
              <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5 }}>
                {trend}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,
              bgcolor: bgColorMap[color],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colorMap[color],
              fontSize: 26,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
