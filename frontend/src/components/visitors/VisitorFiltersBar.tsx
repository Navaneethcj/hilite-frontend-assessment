import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import type { VisitorFilters, VisitorStatus } from '../../types';

interface VisitorFiltersBarProps {
  filters: VisitorFilters;
  onChange: (filters: Partial<VisitorFilters>) => void;
}

const STATUS_FILTERS: { value: VisitorStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export function VisitorFiltersBar({ filters, onChange }: VisitorFiltersBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        mb: 2,
      }}
    >
      <TextField
        size="small"
        placeholder="Search by name..."
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value, page: 1 })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 240, flexGrow: { xs: 1, sm: 0 } }}
      />

      <ToggleButtonGroup
        value={filters.status}
        exclusive
        onChange={(_, value) => {
          if (value !== null) onChange({ status: value as VisitorStatus | 'all', page: 1 });
        }}
        size="small"
      >
        {STATUS_FILTERS.map((f) => (
          <ToggleButton key={f.value} value={f.value} sx={{ px: 2, textTransform: 'none' }}>
            {f.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
