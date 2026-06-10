import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, UserRole } from '../types';
import { MOCK_CREDENTIALS } from '../constants';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        await new Promise((r) => setTimeout(r, 600));
        const cred = MOCK_CREDENTIALS.find(
          (c) => c.email === email && c.password === password,
        );
        if (!cred) throw new Error('Invalid email or password');
        set({
          user: { email: cred.email, role: cred.role as UserRole, name: cred.name },
          isAuthenticated: true,
        });
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'vms-auth' },
  ),
);
