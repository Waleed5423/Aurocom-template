import { StateCreator } from 'zustand';
import { cartServices } from '@/src/app/api/webhooks/services/cartService';
import type { Cart, AddToCartData, UpdateCartItemData } from '@/src/app/api/webhooks/types';

export interface CartState {
  cart: Cart | null;
  cartLoading: boolean;
  cartError: string | null;
  getCart: () => Promise<void>;
  addToCart: (data: AddToCartData) => Promise<void>;
  updateCartItem: (itemId: string, data: UpdateCartItemData) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  clearCartError: () => void;
}

export const cartSlice: StateCreator<CartState> = (set, get) => ({
  cart: null,
  cartLoading: false,
  cartError: null,

  getCart: async () => {
    set({ cartLoading: true, cartError: null });
    
    try {
      const cart = await cartServices.getCart();
      set({ cart, cartLoading: false });
    } catch (error) {
      set({ 
        cartError: error instanceof Error ? error.message : 'Failed to fetch cart', 
        cartLoading: false 
      });
    }
  },

  addToCart: async (data: AddToCartData) => {
    set({ cartLoading: true, cartError: null });
    
    try {
      const cart = await cartServices.addToCart(data);
      set({ cart, cartLoading: false });
    } catch (error) {
      set({ 
        cartError: error instanceof Error ? error.message : 'Failed to add item to cart', 
        cartLoading: false 
      });
      throw error;
    }
  },

  updateCartItem: async (itemId: string, data: UpdateCartItemData) => {
    set({ cartLoading: true, cartError: null });
    
    try {
      const cart = await cartServices.updateCartItem(itemId, data);
      set({ cart, cartLoading: false });
    } catch (error) {
      set({ 
        cartError: error instanceof Error ? error.message : 'Failed to update cart item', 
        cartLoading: false 
      });
      throw error;
    }
  },

  removeFromCart: async (itemId: string) => {
    set({ cartLoading: true, cartError: null });
    
    try {
      const cart = await cartServices.removeFromCart(itemId);
      set({ cart, cartLoading: false });
    } catch (error) {
      set({ 
        cartError: error instanceof Error ? error.message : 'Failed to remove item from cart', 
        cartLoading: false 
      });
      throw error;
    }
  },

  clearCart: async () => {
    set({ cartLoading: true, cartError: null });
    
    try {
      const cart = await cartServices.clearCart();
      set({ cart, cartLoading: false });
    } catch (error) {
      set({ 
        cartError: error instanceof Error ? error.message : 'Failed to clear cart', 
        cartLoading: false 
      });
      throw error;
    }
  },

  applyCoupon: async (code: string) => {
    set({ cartLoading: true, cartError: null });
    
    try {
      const cart = await cartServices.applyCoupon(code);
      set({ cart, cartLoading: false });
    } catch (error) {
      set({ 
        cartError: error instanceof Error ? error.message : 'Failed to apply coupon', 
        cartLoading: false 
      });
      throw error;
    }
  },

  removeCoupon: async () => {
    set({ cartLoading: true, cartError: null });
    
    try {
      const cart = await cartServices.removeCoupon();
      set({ cart, cartLoading: false });
    } catch (error) {
      set({ 
        cartError: error instanceof Error ? error.message : 'Failed to remove coupon', 
        cartLoading: false 
      });
      throw error;
    }
  },

  clearCartError: () => {
    set({ cartError: null });
  }
});

