import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import { useVisitors } from '../hooks/useVisitors';
import { useVisitorStore } from '../store/visitor.store';
import { useAuthStore } from '../store/auth.store';
import { VisitorTable } from '../components/visitors/VisitorTable';
import { VisitorFiltersBar } from '../components/visitors/VisitorFiltersBar';
import { PageHeader } from '../components/common/PageHeader';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { exportToCsv } from '../utils';
import { visitorsService } from '../services/visitors.service';

export default function VisitorListPage() {
  const navigate = useNavigate();
  const { visitors, totalCount, filters, loading, error, setFilters, clearError, refetch } =
    useVisitors();
  const { deleteVisitor } = useVisitorStore();
  const { user } = useAuthStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteVisitor(deleteId);
    setDeleteId(null);
    void refetch();
  };

  const handleExport = async () => {
    try {
      const { data } = await visitorsService.getAll({ search: filters.search, status: filters.status, pageSize: 10000 });
      exportToCsv(data, 'visitors-export.csv');
    } catch {
      // silently ignore export errors
    }
  };

  return (
    <Box>
      <PageHeader
        title="Visitors"
        subtitle={`${totalCount} visitor${totalCount !== 1 ? 's' : ''} found`}
        breadcrumbs={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Visitors' }]}
        actions={
          <>
            {user?.role === 'admin' && (
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport} size="small">
                Export CSV
              </Button>
            )}
            <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => navigate('/visitors/add')}>
              Add Visitor
            </Button>
          </>
        }
      />

      {error && <ErrorAlert message={error} onDismiss={clearError} onRetry={refetch} />}

      <Card>
        <Box sx={{ p: 2, pb: 0 }}>
          <VisitorFiltersBar filters={filters} onChange={setFilters} />
        </Box>
        <VisitorTable
          visitors={visitors}
          totalCount={totalCount}
          filters={filters}
          loading={loading}
          onFilterChange={setFilters}
          onDelete={(id) => setDeleteId(id)}
        />
      </Card>

      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Visitor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this visitor? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
