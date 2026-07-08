import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        gap: 2,
        color: 'text.disabled',
      }}
    >
      <Box sx={{ fontSize: 64, display: 'flex', color: 'action.disabled' }}>
        {icon ?? <PeopleOutlineIcon fontSize="inherit" />}
      </Box>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.disabled" textAlign="center" maxWidth={360}>
          {description}
        </Typography>
      )}
      {action && (
        <Button variant="contained" onClick={action.onClick} sx={{ mt: 1 }}>
          {action.label}
        </Button>
      )}
    </Box>
  );
}

export function SearchEmptyState() {
  return (
    <EmptyState
      title="No visitors found"
      description="Try adjusting your search or filter criteria."
      icon={<SearchOffIcon fontSize="inherit" />}
    />
  );
}
