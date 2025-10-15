import { apiClient } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/utils/constants';
import type { LoginData, RegisterData, AuthResponse, User, UpdateProfileData, ChangePasswordData } from '@/src/app/api/webhooks/types';

export class AuthService {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    if (response.success && response.data) {
      this.setAuthData(response.data);
    }
    
    return response.data!;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
    
    if (response.success && response.data) {
      this.setAuthData(response.data);
    }
    
    return response.data!;
  }

  async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ token: string; refreshToken: string }>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    if (response.success && response.data) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      return response.data;
    }

    throw new Error('Token refresh failed');
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { 
      token, 
      password 
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to reset password');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
    
    if (!response.success) {
      throw new Error(response.message || 'Email verification failed');
    }
  }

  async getProfile(): Promise<User> {
    const response = await apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.PROFILE);
    
    if (response.success && response.data) {
      return response.data.user;
    }
    
    throw new Error(response.message || 'Failed to fetch profile');
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await apiClient.put<{ user: User }>(API_ENDPOINTS.AUTH.PROFILE, data);
    
    if (response.success && response.data) {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data.user } as User;
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      }
      
      return response.data.user;
    }
    
    throw new Error(response.message || 'Failed to update profile');
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    const response = await apiClient.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to change password');
    }
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  private setAuthData(authData: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, authData.token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authData.user));
  }
}

export const authService = new AuthService();

