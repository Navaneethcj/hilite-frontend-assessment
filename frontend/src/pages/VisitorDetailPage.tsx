import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import NotesIcon from '@mui/icons-material/Notes';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { useVisitorDetail } from '../hooks/useVisitors';
import { useVisitorStore } from '../store/visitor.store';
import { useAuthStore } from '../store/auth.store';
import { PageHeader } from '../components/common/PageHeader';
import { StatusChip } from '../components/common/StatusChip';
import { LoadingOverlay } from '../components/common/LoadingOverlay';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { formatDate, formatDateTime } from '../utils';
import { VISITOR_STATUSES, STATUS_LABELS } from '../constants';
import type { VisitorStatus } from '../types';

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, py: 1.5, alignItems: 'flex-start' }}>
      <Box sx={{ color: 'text.secondary', pt: 0.25, minWidth: 24 }}>{icon}</Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Box sx={{ mt: 0.25 }}>{typeof value === 'string' ? (
          <Typography variant="body1">{value || '—'}</Typography>
        ) : value}</Box>
      </Box>
    </Box>
  );
}

export default function VisitorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { visitor, loading, error } = useVisitorDetail(id);
  const { updateVisitor } = useVisitorStore();
  const { user } = useAuthStore();
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<VisitorStatus>('pending');
  const [saving, setSaving] = useState(false);

  const handleStatusSave = async () => {
    if (!id) return;
    setSaving(true);
    await updateVisitor(id, { status: newStatus });
    setSaving(false);
    setEditingStatus(false);
  };

  if (loading && !visitor) return <LoadingOverlay message="Loading visitor details..." />;

  return (
    <Box>
      <PageHeader
        title="Visitor Details"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Visitors', path: '/visitors' },
          { label: visitor?.name ?? 'Details' },
        ]}
        actions={
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/visitors')}>
            Back to List
          </Button>
        }
      />

      {error && <ErrorAlert message={error} />}

      {visitor && (
        <Grid container spacing={3}>
          {/* Profile card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    fontSize: 32,
                    fontWeight: 700,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {visitor.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" fontWeight={700}>
                  {visitor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {visitor.phone}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {editingStatus ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
                      <TextField
                        select
                        size="small"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as VisitorStatus)}
                        sx={{ minWidth: 160 }}
                      >
                        {VISITOR_STATUSES.map((s) => (
                          <MenuItem key={s} value={s}>{STATUS_LABELS[s]}</MenuItem>
                        ))}
                      </TextField>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined" onClick={() => setEditingStatus(false)}>
                          Cancel
                        </Button>
                        <Button size="small" variant="contained" startIcon={<SaveIcon />} onClick={handleStatusSave} disabled={saving}>
                          Save
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <StatusChip status={visitor.status} size="medium" />
                      {user?.role === 'admin' && (
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => { setNewStatus(visitor.status); setEditingStatus(true); }}
                        >
                          Update Status
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>

                <Divider />

                <Box sx={{ mt: 2, textAlign: 'left' }}>
                  <Typography variant="caption" color="text.secondary">
                    Registered
                  </Typography>
                  <Typography variant="body2">
                    {formatDateTime(visitor.created_at)}
                  </Typography>
                </Box>

                {visitor.updated_at !== visitor.created_at && (
                  <Box sx={{ mt: 1, textAlign: 'left' }}>
                    <Typography variant="caption" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body2">
                      {formatDateTime(visitor.updated_at)}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Detail card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 11 }}>
                  Visit Information
                </Typography>
                <Divider sx={{ mb: 1 }} />

                <DetailRow
                  icon={<PersonIcon fontSize="small" />}
                  label="Full Name"
                  value={visitor.name}
                />
                <Divider />
                <DetailRow
                  icon={<PhoneIcon fontSize="small" />}
                  label="Phone Number"
                  value={visitor.phone}
                />
                <Divider />
                <DetailRow
                  icon={<AssignmentIcon fontSize="small" />}
                  label="Purpose of Visit"
                  value={
                    <Chip label={visitor.purpose} size="small" variant="outlined" />
                  }
                />
                <Divider />
                <DetailRow
                  icon={<CalendarTodayIcon fontSize="small" />}
                  label="Visit Date"
                  value={formatDate(visitor.visit_date)}
                />
                <Divider />
                <DetailRow
                  icon={<HomeIcon fontSize="small" />}
                  label="Host Name"
                  value={visitor.host_name ?? '—'}
                />
                {visitor.notes && (
                  <>
                    <Divider />
                    <DetailRow
                      icon={<NotesIcon fontSize="small" />}
                      label="Notes"
                      value={visitor.notes}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
