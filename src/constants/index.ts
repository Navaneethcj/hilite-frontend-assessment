import type { VisitorStatus } from '../types';

export const VISITOR_STATUSES: VisitorStatus[] = ['pending', 'approved', 'rejected'];

export const STATUS_LABELS: Record<VisitorStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

export const STATUS_COLORS: Record<VisitorStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

export const PURPOSE_OPTIONS = [
  'Delivery',
  'Guest',
  'Maintenance',
  'Interview',
  'Sales',
  'Medical',
  'Official',
  'Other',
] as const;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
export const DEFAULT_PAGE_SIZE = 10;

export const MOCK_CREDENTIALS = [
  { email: 'admin@vms.com', password: 'admin123', role: 'admin' as const, name: 'Admin User' },
  { email: 'security@vms.com', password: 'security123', role: 'security' as const, name: 'Security Officer' },
];

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'Dashboard' },
  { label: 'Visitors', path: '/visitors', icon: 'People' },
  { label: 'Add Visitor', path: '/visitors/add', icon: 'PersonAdd' },
] as const;
