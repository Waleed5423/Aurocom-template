import type { Product } from './product';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  variant?: {
    name: string;
    value: string;
    price: number;
  };
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  coupon?: Coupon;
  discount: number;
  shipping: number;
  tax: number;
  subtotal: number;
  total: number;
}

export interface AddToCartData {
  productId: string;
  quantity?: number;
  variant?: {
    name: string;
    value: string;
  };
}

export interface UpdateCartItemData {
  quantity: number;
}

export interface Coupon {
  _id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrderValue?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: string;
  expiresAt: string;
  isActive: boolean;
  isValid: boolean;
}

