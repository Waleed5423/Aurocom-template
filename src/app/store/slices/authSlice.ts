import { StateCreator } from 'zustand';
import { authServices } from '@/src/app/api/webhooks/services/authService';
import type { User, LoginData, RegisterData, UpdateProfileData, ChangePasswordData } from '@/src/app/api/webhooks/types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  clearError: () => void;
  checkAuth: () => void;
}

export const authSlice: StateCreator<AuthState> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginData) => {
    set({ isLoading: true, error: null });
    
    try {
      const authResponse = await authServices.login(credentials);
      set({ 
        user: authResponse.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  register: async (userData: RegisterData) => {
    set({ isLoading: true, error: null });
    
    try {
      const authResponse = await authServices.register(userData);
      set({ 
        user: authResponse.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: () => {
    authServices.logout();
    set({ 
      user: null, 
      isAuthenticated: false,
      error: null 
    });
  },

  updateProfile: async (data: UpdateProfileData) => {
    set({ isLoading: true, error: null });
    
    try {
      const updatedUser = await authServices.updateProfile(data);
      set({ 
        user: updatedUser, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Profile update failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  changePassword: async (data: ChangePasswordData) => {
    set({ isLoading: true, error: null });
    
    try {
      await authServices.changePassword(data);
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Password change failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  checkAuth: () => {
    const isAuthenticated = authServices.isAuthenticated();
    const user = authServices.getCurrentUser();
    
    set({ 
      isAuthenticated, 
      user: isAuthenticated ? user : null 
    });
  }
});

