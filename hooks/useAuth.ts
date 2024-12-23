import { create } from 'zustand';

interface AuthState {
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
})); 