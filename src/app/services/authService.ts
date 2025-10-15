import { authService } from '@/src/app/api/webhooks/lib/auth';
import type { LoginData, RegisterData, UpdateProfileData, ChangePasswordData } from '@/src/app/api/webhooks/types';

export const authServices = {
  login: async (credentials: LoginData) => {
    return await authService.login(credentials);
  },

  register: async (userData: RegisterData) => {
    return await authService.register(userData);
  },

  logout: () => {
    authService.logout();
  },

  getProfile: async () => {
    return await authService.getProfile();
  },

  updateProfile: async (data: UpdateProfileData) => {
    return await authService.updateProfile(data);
  },

  changePassword: async (data: ChangePasswordData) => {
    return await authService.changePassword(data);
  },

  forgotPassword: async (email: string) => {
    return await authService.forgotPassword(email);
  },

  resetPassword: async (token: string, password: string) => {
    return await authService.resetPassword(token, password);
  },

  verifyEmail: async (token: string) => {
    return await authService.verifyEmail(token);
  },

  refreshToken: async () => {
    return await authService.refreshToken();
  },

  isAuthenticated: () => {
    return authService.isAuthenticated();
  },

  getCurrentUser: () => {
    return authService.getCurrentUser();
  },

  getToken: () => {
    return authService.getToken();
  }
};

