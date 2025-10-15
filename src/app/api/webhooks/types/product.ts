import type { Pagination } from './index';

export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: Category;
  subcategory?: Category;
  price: number;
  comparePrice?: number;
  cost?: number;
  sku: string;
  trackQuantity: boolean;
  quantity: number;
  lowStockAlert: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images: ProductImage[];
  variants?: ProductVariant[];
  tags: string[];
  brand?: string;
  featured: boolean;
  isActive: boolean;
  seo?: {
    title?: string;
    description?: string;
    slug?: string;
  };
  ratings: {
    average: number;
    count: number;
  };
  salesCount: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  public_id: string;
  url: string;
  isDefault: boolean;
}

export interface ProductVariant {
  name: string;
  values: VariantValue[];
}

export interface VariantValue {
  value: string;
  price: number;
  stock: number;
  sku?: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: {
    public_id: string;
    url: string;
  };
  parent?: string;
  isActive: boolean;
  featured: boolean;
  subcategories?: Category[];
  productsCount?: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  rating?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

