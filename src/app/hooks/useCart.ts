import { useEffect } from 'react';
import { useStore } from '@/src/app/api/webhooks/store';
import { useAuth } from './useAuth';

export const useCart = () => {
  const { isAuthenticated } = useAuth();
  const {
    cart,
    cartLoading,
    cartError,
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    clearCartError
  } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      getCart();
    }
  }, [isAuthenticated, getCart]);

  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const cartTotal = cart?.total || 0;
  const cartSubtotal = cart?.subtotal || 0;
  const cartDiscount = cart?.discount || 0;
  const cartShipping = cart?.shipping || 0;
  const cartTax = cart?.tax || 0;

  const isCartEmpty = !cart?.items || cart.items.length === 0;

  return {
    cart,
    cartLoading,
    cartError,
    
    cartItemsCount,
    cartTotal,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    isCartEmpty,
    
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    clearCartError,
    
    getItemQuantity: (productId: string, variant?: any) => {
      if (!cart?.items) return 0;
      
      const item = cart.items.find(item => 
        item.product._id === productId && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );
      
      return item?.quantity || 0;
    },
    
    isInCart: (productId: string, variant?: any) => {
      if (!cart?.items) return false;
      
      return cart.items.some(item => 
        item.product._id === productId && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );
    }
  };
};

