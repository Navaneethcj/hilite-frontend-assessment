import { create } from 'zustand';
import type { Visitor, VisitorFilters, DashboardStats } from '../types';
import { visitorsService } from '../services/visitors.service';
import type { ChartPeriod } from '../components/dashboard/VisitorChart';
import { DEFAULT_PAGE_SIZE } from '../constants';

type ChartDataPoint = { date: string; approved: number; pending: number; rejected: number };

interface VisitorState {
  visitors: Visitor[];
  totalCount: number;
  selectedVisitor: Visitor | null;
  dashboardStats: DashboardStats | null;
  chartData: ChartDataPoint[];
  chartPeriod: ChartPeriod;
  filters: VisitorFilters;
  loading: boolean;
  error: string | null;

  setFilters: (filters: Partial<VisitorFilters>) => void;
  fetchVisitors: () => Promise<void>;
  fetchVisitorById: (id: string) => Promise<void>;
  addVisitor: (data: Omit<Visitor, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateVisitor: (id: string, data: Partial<Visitor>) => Promise<void>;
  deleteVisitor: (id: string) => Promise<void>;
  fetchDashboardStats: () => Promise<void>;
  setChartPeriod: (period: ChartPeriod) => Promise<void>;
  clearSelectedVisitor: () => void;
  clearError: () => void;
}

async function fetchChartData(period: ChartPeriod): Promise<ChartDataPoint[]> {
  if (period === 'monthly') return visitorsService.getMonthlyChartData();
  if (period === 'yearly') return visitorsService.getYearlyChartData();
  return visitorsService.getWeeklyChartData();
}

export const useVisitorStore = create<VisitorState>((set, get) => ({
  visitors: [],
  totalCount: 0,
  selectedVisitor: null,
  dashboardStats: null,
  chartData: [],
  chartPeriod: 'weekly',
  filters: { search: '', status: 'all', page: 1, pageSize: DEFAULT_PAGE_SIZE },
  loading: false,
  error: null,

  setFilters: (filters) => {
    set((s) => ({ filters: { ...s.filters, ...filters } }));
  },

  fetchVisitors: async () => {
    set({ loading: true, error: null });
    try {
      const { data, count } = await visitorsService.getAll(get().filters);
      set({ visitors: data, totalCount: count, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  fetchVisitorById: async (id) => {
    set({ loading: true, error: null });
    try {
      const visitor = await visitorsService.getById(id);
      set({ selectedVisitor: visitor, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  addVisitor: async (data) => {
    set({ loading: true, error: null });
    try {
      await visitorsService.create(data);
      set({ loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
      throw e;
    }
  },

  updateVisitor: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await visitorsService.update(id, data);
      set((s) => ({
        visitors: s.visitors.map((v) => (v.id === id ? updated : v)),
        selectedVisitor: updated,
        loading: false,
      }));
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  deleteVisitor: async (id) => {
    set({ loading: true, error: null });
    try {
      await visitorsService.remove(id);
      set((s) => ({
        visitors: s.visitors.filter((v) => v.id !== id),
        totalCount: s.totalCount - 1,
        loading: false,
      }));
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  fetchDashboardStats: async () => {
    set({ loading: true, error: null });
    try {
      const period = get().chartPeriod;
      const [stats, chartData] = await Promise.all([
        visitorsService.getDashboardStats(),
        fetchChartData(period),
      ]);
      set({ dashboardStats: stats, chartData, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  setChartPeriod: async (period) => {
    set({ chartPeriod: period });
    try {
      const chartData = await fetchChartData(period);
      set({ chartData });
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  clearSelectedVisitor: () => set({ selectedVisitor: null }),
  clearError: () => set({ error: null }),
}));
