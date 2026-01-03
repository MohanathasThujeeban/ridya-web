import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  googleId?: string;
  isEmailVerified: boolean;
  isPhoneVerified?: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, accessToken, refreshToken) => {
        // Store tokens in localStorage for axios interceptor
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        // Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage', // LocalStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist tokens here, they're in localStorage separately
      }),
    }
  )
);
