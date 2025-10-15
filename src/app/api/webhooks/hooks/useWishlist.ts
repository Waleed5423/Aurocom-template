import { useState, useCallback } from 'react';
import { apiClient } from '@/src/app/api/webhooks/lib/api';
import { useAuth } from './useAuth';

export const useWishlist = () => {
  const { user, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWishlist = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get<{ wishlist: string[] }>('/api/users/wishlist');
      if (response.success && response.data) {
        setWishlist(response.data.wishlist);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addToWishlist = useCallback(async (productId: string) => {
    if (!isAuthenticated) {
      throw new Error('Please login to add items to wishlist');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post<{ wishlist: string[] }>('/api/users/wishlist', {
        productId
      });
      
      if (response.success && response.data) {
        setWishlist(response.data.wishlist);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add to wishlist';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.delete<{ wishlist: string[] }>(
        `/api/users/wishlist/${productId}`
      );
      
      if (response.success && response.data) {
        setWishlist(response.data.wishlist);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove from wishlist';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const toggleWishlist = useCallback(async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  const wishlistCount = wishlist.length;

  return {
    wishlist,
    loading,
    error,
    
    wishlistCount,
    isInWishlist,
    
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    
    clearError: () => setError(null)
  };
};

