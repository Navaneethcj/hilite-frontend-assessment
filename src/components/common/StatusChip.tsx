import Chip from '@mui/material/Chip';
import type { VisitorStatus } from '../../types';
import { STATUS_COLORS, STATUS_LABELS } from '../../constants';

interface StatusChipProps {
  status: VisitorStatus;
  size?: 'small' | 'medium';
}

export function StatusChip({ status, size = 'small' }: StatusChipProps) {
  return (
    <Chip
      label={STATUS_LABELS[status]}
      color={STATUS_COLORS[status]}
      size={size}
      variant="filled"
    />
  );
}
