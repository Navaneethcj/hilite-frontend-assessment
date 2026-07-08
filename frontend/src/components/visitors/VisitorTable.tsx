import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import type { Visitor, VisitorFilters } from '../../types';
import { StatusChip } from '../common/StatusChip';
import { SearchEmptyState } from '../common/EmptyState';
import { formatDate } from '../../utils';
import { PAGE_SIZE_OPTIONS } from '../../constants';
import { useAuthStore } from '../../store/auth.store';

interface VisitorTableProps {
  visitors: Visitor[];
  totalCount: number;
  filters: VisitorFilters;
  loading: boolean;
  onFilterChange: (filters: Partial<VisitorFilters>) => void;
  onDelete: (id: string) => void;
}

const COLUMNS = ['Name', 'Phone', 'Purpose', 'Visit Date', 'Status', 'Actions'];

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 6 }).map((__, j) => (
            <TableCell key={j}>
              <Skeleton variant="text" width="80%" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function VisitorTable({
  visitors,
  totalCount,
  filters,
  loading,
  onFilterChange,
  onDelete,
}: VisitorTableProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
    <Box>
      <TableContainer>
        <Table size="medium" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              {COLUMNS.map((col) => (
                <TableCell key={col} sx={{ py: 1.5 }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <SkeletonRows />
            ) : visitors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ border: 0, p: 0 }}>
                  <SearchEmptyState />
                </TableCell>
              </TableRow>
            ) : (
              visitors.map((visitor) => (
                <TableRow
                  key={visitor.id}
                  hover
                  sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
                  onClick={() => navigate(`/visitors/${visitor.id}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {visitor.name}
                    </Typography>
                    {visitor.host_name && (
                      <Typography variant="caption" color="text.secondary">
                        Host: {visitor.host_name}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{visitor.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{visitor.purpose}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(visitor.visit_date)}</Typography>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={visitor.status} />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="View details">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/visitors/${visitor.id}`)}
                        color="primary"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {isAdmin && (
                      <Tooltip title="Delete visitor">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete(visitor.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={filters.page - 1}
        rowsPerPage={filters.pageSize}
        rowsPerPageOptions={PAGE_SIZE_OPTIONS}
        onPageChange={(_, newPage) => onFilterChange({ page: newPage + 1 })}
        onRowsPerPageChange={(e) => onFilterChange({ pageSize: Number(e.target.value), page: 1 })}
      />
    </Box>
  );
}
