// ============================================================
// GridIron IQ — User State Store (Zustand)
// ============================================================

import { create } from 'zustand';
import type { User, Conference } from '@/types';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  updateProfile: (updates: Partial<User>) => void;
  setFavoriteTeam: (team: string, conference: Conference) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user: User) => set({ user, isAuthenticated: true, isLoading: false }),

  updateProfile: (updates: Partial<User>) => {
    const { user } = get();
    if (!user) return;
    set({ user: { ...user, ...updates } });
  },

  setFavoriteTeam: (team: string, conference: Conference) => {
    const { user } = get();
    if (!user) return;
    set({ user: { ...user, favoriteTeam: team, favoriteConference: conference } });
  },

  incrementStreak: () => {
    const { user } = get();
    if (!user) return;
    const newStreak = user.streakCurrent + 1;
    set({
      user: {
        ...user,
        streakCurrent: newStreak,
        streakBest: Math.max(newStreak, user.streakBest),
      },
    });
  },

  resetStreak: () => {
    const { user } = get();
    if (!user) return;
    set({ user: { ...user, streakCurrent: 0 } });
  },

  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));
