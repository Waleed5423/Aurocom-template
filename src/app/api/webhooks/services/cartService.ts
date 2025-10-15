import { cartService } from '@/src/app/api/webhooks/lib/cart';
import type { AddToCartData, UpdateCartItemData } from '@/src/app/api/webhooks/types';

export const cartServices = {
  getCart: async () => {
    return await cartService.getCart();
  },

  addToCart: async (data: AddToCartData) => {
    return await cartService.addToCart(data);
  },

  updateCartItem: async (itemId: string, data: UpdateCartItemData) => {
    return await cartService.updateCartItem(itemId, data);
  },

  removeFromCart: async (itemId: string) => {
    return await cartService.removeFromCart(itemId);
  },

  clearCart: async () => {
    return await cartService.clearCart();
  },

  applyCoupon: async (code: string) => {
    return await cartService.applyCoupon(code);
  },

  removeCoupon: async () => {
    return await cartService.removeCoupon();
  },

  validateCoupon: async (code: string, cartTotal: number) => {
    return await cartService.validateCoupon(code, cartTotal);
  }
};

