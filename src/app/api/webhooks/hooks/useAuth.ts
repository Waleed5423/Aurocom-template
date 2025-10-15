import { useEffect } from 'react';
import { useStore } from '@/src/app/api/webhooks/store';
import { authServices } from '@/src/app/api/webhooks/services/authService';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
    checkAuth
  } = useStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const isSuperAdmin = user?.role === 'super_admin';

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    
    isAdmin,
    isSuperAdmin,
    
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
    checkAuth,
    
    hasRole: (role: string) => user?.role === role,
    hasAnyRole: (roles: string[]) => roles.includes(user?.role || ''),
  };
};

