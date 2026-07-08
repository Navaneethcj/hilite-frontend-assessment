import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import PeopleIcon from '@mui/icons-material/People';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useVisitorStore } from '../store/visitor.store';
import { useAuthStore } from '../store/auth.store';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { StatCard } from '../components/dashboard/StatCard';
import { VisitorChart } from '../components/dashboard/VisitorChart';
import { StatusPieChart } from '../components/dashboard/StatusPieChart';
import { PageHeader } from '../components/common/PageHeader';
import { ErrorAlert } from '../components/common/ErrorAlert';

function StatsSkeletons() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { dashboardStats, chartData, chartPeriod, loading, error, fetchDashboardStats, setChartPeriod, clearError } =
    useVisitorStore();
  const navigate = useNavigate();

  useEffect(() => {
    void fetchDashboardStats();
  }, [fetchDashboardStats]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Box>
      {/* Hero Banner Section - Full Width */}
      <Box sx={{ m: 0, p: 0,pb: 5, mb: 0, width: '100%', mt: '-1rem' }}>
        <HeroBanner
          imageUrl="/hero-banner.jpg"
          heading="Visitor Management Dashboard"
          subheading="Monitor visitor activities, approvals, and expected arrivals in real time."
        />
      </Box>

      {/* Page Header - Below Hero Banner */}
      <Box sx={{ mt: 3 }}>
        <PageHeader
          title={`${greeting()}, ${user?.name?.split(' ')[0] ?? 'User'}!`}
          subtitle="Here's what's happening with your visitors today."
          actions={
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/visitors/add')}
            >
              Add Visitor
            </Button>
          }
        />

        {error && <ErrorAlert message={error} onDismiss={clearError} onRetry={fetchDashboardStats} />}

        {loading && !dashboardStats ? (
          <StatsSkeletons />
        ) : dashboardStats ? (
          <>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  title="Total Visitors Today"
                  value={dashboardStats.totalToday}
                  icon={<PeopleIcon fontSize="inherit" />}
                  color="primary"
                  trend="Visitors checked in today"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  title="Pending Approvals"
                  value={dashboardStats.pendingApprovals}
                  icon={<PendingActionsIcon fontSize="inherit" />}
                  color="warning"
                  trend="Awaiting your decision"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  title="Expected Visitors"
                  value={dashboardStats.expectedVisitors}
                  icon={<EventIcon fontSize="inherit" />}
                  color="info"
                  trend="Scheduled future visits"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  title="Approved Today"
                  value={dashboardStats.approvedToday}
                  icon={<CheckCircleIcon fontSize="inherit" />}
                  color="success"
                  trend="Visitors approved today"
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, lg: 8 }}>
                <VisitorChart data={chartData} period={chartPeriod} onPeriodChange={setChartPeriod} />
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <StatusPieChart stats={dashboardStats} />
              </Grid>
            </Grid>

            {/* "Manage Visitors" card removed per request */}
          </>
        ) : null}
      </Box>
    </Box>
  );
}
