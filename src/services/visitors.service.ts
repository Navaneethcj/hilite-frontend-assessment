import type { Visitor, VisitorFormData, VisitorFilters, DashboardStats } from '../types';

const STORAGE_KEY = 'vms-visitors';

function load(): Visitor[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Visitor[];
  } catch {
    return [];
  }
}

function save(visitors: Visitor[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visitors));
}

export const visitorsService = {
  async getAll(filters: Partial<VisitorFilters> = {}): Promise<{ data: Visitor[]; count: number }> {
    const { search = '', status = 'all', page = 1, pageSize = 10 } = filters;
    let rows = load();

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((r) => r.name.toLowerCase().includes(q));
    }
    if (status !== 'all') {
      rows = rows.filter((r) => r.status === status);
    }

    const count = rows.length;
    const from = (page - 1) * pageSize;
    const data = rows.slice(from, from + pageSize);
    return { data, count };
  },

  async getById(id: string): Promise<Visitor> {
    const visitor = load().find((v) => v.id === id);
    if (!visitor) throw new Error('Visitor not found');
    return visitor;
  },

  async create(payload: VisitorFormData): Promise<Visitor> {
    const now = new Date().toISOString();
    function normalizePhone(raw?: string) {
      const digits = (raw ?? '').toString().replace(/\D/g, '');
      if (digits.length >= 10) return `+91${digits.slice(-10)}`;
      // fallback: generate simple random 10-digit
      const starters = ['9', '8', '7', '6'];
      const first = starters[Math.floor(Math.random() * starters.length)];
      let rest = '';
      for (let i = 0; i < 9; i++) rest += String(Math.floor(Math.random() * 10));
      return `+91${first + rest}`;
    }

    const visitor: Visitor = {
      ...payload,
      phone: normalizePhone(payload.phone),
      id: crypto.randomUUID(),
      created_at: now,
      updated_at: now,
    };
    const rows = load();
    rows.unshift(visitor);
    save(rows);
    return visitor;
  },

  async update(id: string, payload: Partial<VisitorFormData>): Promise<Visitor> {
    const rows = load();
    const idx = rows.findIndex((v) => v.id === id);
    if (idx === -1) throw new Error('Visitor not found');
    const updated: Visitor = { ...rows[idx], ...payload, updated_at: new Date().toISOString() };
    rows[idx] = updated;
    save(rows);
    return updated;
  },

  async remove(id: string): Promise<void> {
    save(load().filter((v) => v.id !== id));
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const rows = load();
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const todayRows = rows.filter((r) => r.visit_date === today);
    const futureRows = rows.filter((r) => r.visit_date >= tomorrow);

    return {
      totalToday: todayRows.length,
      pendingApprovals: rows.filter((r) => r.status === 'pending').length,
      expectedVisitors: futureRows.length,
      approvedToday: todayRows.filter((r) => r.status === 'approved').length,
      rejectedToday: todayRows.filter((r) => r.status === 'rejected').length,
    };
  },

  async getWeeklyChartData(): Promise<{ date: string; approved: number; pending: number; rejected: number }[]> {
    const rows = load();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      result.push({ date: d.toISOString().split('T')[0], label: d.toLocaleDateString('en', { weekday: 'short' }) });
    }

    return result.map(({ date, label }) => ({
      date: label,
      approved: rows.filter((r) => r.visit_date === date && r.status === 'approved').length,
      pending: rows.filter((r) => r.visit_date === date && r.status === 'pending').length,
      rejected: rows.filter((r) => r.visit_date === date && r.status === 'rejected').length,
    }));
  },

  async getMonthlyChartData(): Promise<{ date: string; approved: number; pending: number; rejected: number }[]> {
    const rows = load();
    const result = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en', { month: 'short', year: '2-digit' });
      result.push({ key, label });
    }

    return result.map(({ key, label }) => ({
      date: label,
      approved: rows.filter((r) => r.visit_date.startsWith(key) && r.status === 'approved').length,
      pending: rows.filter((r) => r.visit_date.startsWith(key) && r.status === 'pending').length,
      rejected: rows.filter((r) => r.visit_date.startsWith(key) && r.status === 'rejected').length,
    }));
  },

  async getYearlyChartData(): Promise<{ date: string; approved: number; pending: number; rejected: number }[]> {
    const rows = load();
    const currentYear = new Date().getFullYear();
    const result = [];
    for (let i = 4; i >= 0; i--) {
      const year = currentYear - i;
      result.push({ key: String(year), label: String(year) });
    }

    return result.map(({ key, label }) => ({
      date: label,
      approved: rows.filter((r) => r.visit_date.startsWith(key) && r.status === 'approved').length,
      pending: rows.filter((r) => r.visit_date.startsWith(key) && r.status === 'pending').length,
      rejected: rows.filter((r) => r.visit_date.startsWith(key) && r.status === 'rejected').length,
    }));
  },
};
