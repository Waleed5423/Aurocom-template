import { apiClient } from './api';
import { API_ENDPOINTS } from '@/utils/constants';
import type { Product, Category, ProductsResponse, ProductFilters, ListQueryParams } from '@/src/app/api/webhooks/types';

export class ProductService {
  async getProducts(params?: ProductFilters & ListQueryParams): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(API_ENDPOINTS.PRODUCTS.LIST, params);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch products');
  }

  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<{ product: Product }>(API_ENDPOINTS.PRODUCTS.SINGLE(id));
    
    if (response.success && response.data) {
      return response.data.product;
    }
    
    throw new Error(response.message || 'Failed to fetch product');
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get<{ products: Product[] }>(API_ENDPOINTS.PRODUCTS.FEATURED);
    
    if (response.success && response.data) {
      return response.data.products;
    }
    
    throw new Error(response.message || 'Failed to fetch featured products');
  }

  async getCategories(includeInactive?: boolean, featured?: boolean): Promise<Category[]> {
    const params: any = {};
    
    if (includeInactive) params.includeInactive = 'true';
    if (featured) params.featured = 'true';

    const response = await apiClient.get<{ categories: Category[] }>(
      API_ENDPOINTS.PRODUCTS.CATEGORIES,
      params
    );
    
    if (response.success && response.data) {
      return response.data.categories;
    }
    
    throw new Error(response.message || 'Failed to fetch categories');
  }

  async getCategory(id: string): Promise<Category> {
    const response = await apiClient.get<{ category: Category }>(
      `/api/categories/${id}`
    );
    
    if (response.success && response.data) {
      return response.data.category;
    }
    
    throw new Error(response.message || 'Failed to fetch category');
  }

  async getCategoryProducts(categoryId: string, params?: ListQueryParams): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(
      API_ENDPOINTS.PRODUCTS.CATEGORY_PRODUCTS(categoryId),
      params
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch category products');
  }

  async searchProducts(query: string, filters?: ProductFilters): Promise<ProductsResponse> {
    const params = {
      search: query,
      ...filters
    };
    
    return this.getProducts(params);
  }
}

export const productService = new ProductService();

