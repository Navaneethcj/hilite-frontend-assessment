export type VisitorStatus = 'pending' | 'approved' | 'rejected';

export type UserRole = 'admin' | 'security';

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  visit_date: string;
  status: VisitorStatus;
  host_name?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorFormData {
  name: string;
  phone: string;
  purpose: string;
  visit_date: string;
  status: VisitorStatus;
  host_name?: string;
  notes?: string;
}

export interface AuthUser {
  email: string;
  role: UserRole;
  name: string;
}

export interface DashboardStats {
  totalToday: number;
  pendingApprovals: number;
  expectedVisitors: number;
  approvedToday: number;
  rejectedToday: number;
}

export interface VisitorFilters {
  search: string;
  status: VisitorStatus | 'all';
  page: number;
  pageSize: number;
}
