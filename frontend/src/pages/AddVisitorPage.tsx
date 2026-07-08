import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useVisitorStore } from '../store/visitor.store';
import { visitorSchema, type VisitorSchemaType } from '../schemas/visitor.schema';
import { PageHeader } from '../components/common/PageHeader';
import { PURPOSE_OPTIONS, VISITOR_STATUSES, STATUS_LABELS } from '../constants';

export default function AddVisitorPage() {
  const navigate = useNavigate();
  const { addVisitor } = useVisitorStore();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisitorSchemaType>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      status: 'pending',
      visit_date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: VisitorSchemaType) => {
    setSubmitError('');
    try {
      const payload = { ...data, phone: `+91${data.phone}` };
      await addVisitor(payload);
      navigate('/visitors');
    } catch (e) {
      setSubmitError((e as Error).message);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Add New Visitor"
        subtitle="Fill in the details below to register a new visitor."
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Visitors', path: '/visitors' },
          { label: 'Add Visitor' },
        ]}
      />

      <Card sx={{ maxWidth: 800 }}>
        <CardContent sx={{ p: 3 }}>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSubmitError('')}>
              {submitError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 11 }}>
              Visitor Information
            </Typography>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Visitor Name *"
                  {...register('name')}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number *"
                  {...register('phone')}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                  placeholder="9876543210"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 10,
                    onInput: (event) => {
                      const input = event.currentTarget as HTMLInputElement;
                      input.value = input.value.replace(/\D/g, '').slice(0, 10);
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="purpose"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      select
                      label="Purpose of Visit *"
                      {...field}
                      error={Boolean(errors.purpose)}
                      helperText={errors.purpose?.message}
                    >
                      {PURPOSE_OPTIONS.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Visit Date *"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register('visit_date')}
                  error={Boolean(errors.visit_date)}
                  helperText={errors.visit_date?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      select
                      label="Status *"
                      {...field}
                      error={Boolean(errors.status)}
                      helperText={errors.status?.message}
                    >
                      {VISITOR_STATUSES.map((s) => (
                        <MenuItem key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Host Name *"
                  {...register('host_name')}
                  error={Boolean(errors.host_name)}
                  helperText={errors.host_name?.message}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 11 }}>
              Additional Notes
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              {...register('notes')}
              error={Boolean(errors.notes)}
              helperText={errors.notes?.message ?? 'Optional additional information about this visit'}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/visitors')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Visitor'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
