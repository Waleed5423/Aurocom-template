import { apiClient } from './api';
import { API_ENDPOINTS } from '@/utils/constants';
import type { Cart, AddToCartData, UpdateCartItemData, Coupon } from '@/src/app/api/webhooks/types';

export class CartService {
  async getCart(): Promise<Cart> {
    const response = await apiClient.get<{ cart: Cart }>(API_ENDPOINTS.CART.GET);
    
    if (response.success && response.data) {
      return response.data.cart;
    }
    
    throw new Error(response.message || 'Failed to fetch cart');
  }

  async addToCart(data: AddToCartData): Promise<Cart> {
    const response = await apiClient.post<{ cart: Cart }>(API_ENDPOINTS.CART.ADD, data);
    
    if (response.success && response.data) {
      return response.data.cart;
    }
    
    throw new Error(response.message || 'Failed to add item to cart');
  }

  async updateCartItem(itemId: string, data: UpdateCartItemData): Promise<Cart> {
    const response = await apiClient.put<{ cart: Cart }>(
      API_ENDPOINTS.CART.UPDATE(itemId),
      data
    );
    
    if (response.success && response.data) {
      return response.data.cart;
    }
    
    throw new Error(response.message || 'Failed to update cart item');
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    const response = await apiClient.delete<{ cart: Cart }>(
      API_ENDPOINTS.CART.REMOVE(itemId)
    );
    
    if (response.success && response.data) {
      return response.data.cart;
    }
    
    throw new Error(response.message || 'Failed to remove item from cart');
  }

  async clearCart(): Promise<Cart> {
    const response = await apiClient.delete<{ cart: Cart }>(API_ENDPOINTS.CART.CLEAR);
    
    if (response.success && response.data) {
      return response.data.cart;
    }
    
    throw new Error(response.message || 'Failed to clear cart');
  }

  async applyCoupon(code: string): Promise<Cart> {
    const response = await apiClient.post<{ cart: Cart }>(
      API_ENDPOINTS.CART.APPLY_COUPON,
      { code }
    );
    
    if (response.success && response.data) {
      return response.data.cart;
    }
    
    throw new Error(response.message || 'Failed to apply coupon');
  }

  async removeCoupon(): Promise<Cart> {
    const response = await apiClient.delete<{ cart: Cart }>(
      API_ENDPOINTS.CART.REMOVE_COUPON
    );
    
    if (response.success && response.data) {
      return response.data.cart;
    }
    
    throw new Error(response.message || 'Failed to remove coupon');
  }

  async validateCoupon(code: string, cartTotal: number): Promise<Coupon> {
    const response = await apiClient.post<{ coupon: Coupon }>(
      '/api/coupons/validate',
      { code, cartTotal }
    );
    
    if (response.success && response.data) {
      return response.data.coupon;
    }
    
    throw new Error(response.message || 'Invalid coupon');
  }
}

export const cartService = new CartService();

