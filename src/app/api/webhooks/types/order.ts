import type { Address } from './user';

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: 'stripe' | 'paypal' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentId?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  coupon?: string;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  cancelledAt?: string;
  deliveredAt?: string;
  refundRequest?: {
    requested: boolean;
    reason?: string;
    status: 'pending' | 'approved' | 'rejected';
    requestedAt?: string;
    processedAt?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  _id: string;
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: {
    name: string;
    value: string;
  };
  total: number;
}

export interface CreateOrderData {
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  couponCode?: string;
  notes?: string;
}

