import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DashboardStats } from '../../types';

interface StatusPieChartProps {
  stats: DashboardStats;
}

export function StatusPieChart({ stats }: StatusPieChartProps) {
  const theme = useTheme();

  const total = stats.approvedToday + (stats.totalToday - stats.approvedToday - stats.rejectedToday) + stats.rejectedToday;

  const data = [
    { name: 'Approved', value: stats.approvedToday, color: theme.palette.success.main },
    { name: 'Pending', value: stats.totalToday - stats.approvedToday - stats.rejectedToday, color: theme.palette.warning.main },
    { name: 'Rejected', value: stats.rejectedToday, color: theme.palette.error.main },
  ].filter((d) => d.value > 0);

  if (total === 0) {
    data.push({ name: 'No visitors', value: 1, color: theme.palette.action.disabledBackground });
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Today's Status"
        subheader="Visitor approvals for today"
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  fontSize: 13,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
