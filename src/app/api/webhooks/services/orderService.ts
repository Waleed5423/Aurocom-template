import { apiClient } from '@/src/app/api/webhooks/lib/api';
import { API_ENDPOINTS } from '@/utils/constants';
import type { Order, CreateOrderData, ListQueryParams } from '@/src/app/api/webhooks/types';

export class OrderService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post<{ order: Order }>(API_ENDPOINTS.ORDERS.CREATE, data);
    
    if (response.success && response.data) {
      return response.data.order;
    }
    
    throw new Error(response.message || 'Failed to create order');
  }

  async getOrders(params?: ListQueryParams & { status?: string }): Promise<{ orders: Order[]; pagination: any }> {
    const response = await apiClient.get<{ orders: Order[]; pagination: any }>(
      API_ENDPOINTS.ORDERS.LIST,
      params
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch orders');
  }

  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<{ order: Order }>(API_ENDPOINTS.ORDERS.SINGLE(id));
    
    if (response.success && response.data) {
      return response.data.order;
    }
    
    throw new Error(response.message || 'Failed to fetch order');
  }

  async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.patch<{ order: Order }>(API_ENDPOINTS.ORDERS.CANCEL(id));
    
    if (response.success && response.data) {
      return response.data.order;
    }
    
    throw new Error(response.message || 'Failed to cancel order');
  }
}

export const orderService = new OrderService();

export const orderServices = {
  createOrder: async (data: CreateOrderData) => {
    return await orderService.createOrder(data);
  },

  getOrders: async (params?: ListQueryParams & { status?: string }) => {
    return await orderService.getOrders(params);
  },

  getOrder: async (id: string) => {
    return await orderService.getOrder(id);
  },

  cancelOrder: async (id: string) => {
    return await orderService.cancelOrder(id);
  }
};

