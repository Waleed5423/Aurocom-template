// Base API response type
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

// Pagination type
export interface Pagination {
  current: number;
  pages: number;
  total: number;
}

// Common query params
export interface ListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export * from './user';
export * from './product';
export * from './order';
export * from './cart';

