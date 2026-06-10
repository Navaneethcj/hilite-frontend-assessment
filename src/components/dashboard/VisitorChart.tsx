import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTheme } from '@mui/material/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export type ChartPeriod = 'weekly' | 'monthly' | 'yearly';

interface ChartDataPoint {
  date: string;
  approved: number;
  pending: number;
  rejected: number;
}

interface VisitorChartProps {
  data: ChartDataPoint[];
  period: ChartPeriod;
  onPeriodChange: (period: ChartPeriod) => void;
}

const PERIOD_LABELS: Record<ChartPeriod, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

const SUBHEADERS: Record<ChartPeriod, string> = {
  weekly: 'Visitor status breakdown for the last 7 days',
  monthly: 'Visitor status breakdown for the last 12 months',
  yearly: 'Visitor status breakdown for the last 5 years',
};

export function VisitorChart({ data, period, onPeriodChange }: VisitorChartProps) {
  const theme = useTheme();

  const handlePeriodChange = (_: React.MouseEvent<HTMLElement>, value: ChartPeriod | null) => {
    if (value) onPeriodChange(value);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Visitor Activity"
        subheader={SUBHEADERS[period]}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
        action={
          <ToggleButtonGroup
            value={period}
            exclusive
            onChange={handlePeriodChange}
            size="small"
            aria-label="chart period"
            sx={{ mt: 0.5 }}
          >
            {(Object.keys(PERIOD_LABELS) as ChartPeriod[]).map((p) => (
              <ToggleButton key={p} value={p} aria-label={PERIOD_LABELS[p]}>
                {PERIOD_LABELS[p]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  fontSize: 13,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Bar dataKey="approved" fill={theme.palette.success.main} radius={[4, 4, 0, 0]} name="Approved" />
              <Bar dataKey="pending" fill={theme.palette.warning.main} radius={[4, 4, 0, 0]} name="Pending" />
              <Bar dataKey="rejected" fill={theme.palette.error.main} radius={[4, 4, 0, 0]} name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
