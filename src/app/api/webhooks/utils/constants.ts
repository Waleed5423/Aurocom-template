export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled'
} as const;

export const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  JAZZCASH: 'jazzcash',
  EASYPAISA: 'easypaisa',
  BANK_TRANSFER: 'bank_transfer'
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/change-password'
  },
  PRODUCTS: {
    LIST: '/api/products',
    FEATURED: '/api/products/featured',
    SINGLE: (id: string) => `/api/products/${id}`,
    CATEGORIES: '/api/categories',
    CATEGORY_PRODUCTS: (id: string) => `/api/categories/${id}/products`,
    REVIEWS: (productId: string) => `/api/reviews/product/${productId}`
  },
  CART: {
    GET: '/api/cart',
    ADD: '/api/cart/add',
    UPDATE: (itemId: string) => `/api/cart/item/${itemId}`,
    REMOVE: (itemId: string) => `/api/cart/item/${itemId}`,
    CLEAR: '/api/cart/clear',
    APPLY_COUPON: '/api/cart/coupon/apply',
    REMOVE_COUPON: '/api/cart/coupon/remove'
  },
  ORDERS: {
    CREATE: '/api/orders',
    LIST: '/api/orders',
    SINGLE: (id: string) => `/api/orders/${id}`,
    CANCEL: (id: string) => `/api/orders/${id}/cancel`
  },
  PAYMENTS: {
    METHODS: '/api/payments/methods',
    CREATE_INTENT: '/api/payments/create-intent',
    CONFIRM: '/api/payments/confirm'
  },
  USER: {
    ADDRESSES: '/api/users/addresses',
    ADDRESS: (id: string) => `/api/users/addresses/${id}`,
    WISHLIST: '/api/users/wishlist',
    WISHLIST_ITEM: (id: string) => `/api/users/wishlist/${id}`,
    DASHBOARD: '/api/users/dashboard'
  }
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
  CART: 'cart_data'
} as const;

