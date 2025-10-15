import { apiClient } from '@/src/app/api/webhooks/lib/api';
import { API_ENDPOINTS } from '@/utils/constants';

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  supportedCurrencies: string[];
  icon: string;
}

export interface PaymentIntent {
  clientSecret?: string;
  paymentIntentId?: string;
  paymentUrl?: string;
  transactionId?: string;
  paymentMethod: string;
}

export class PaymentService {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiClient.get<{ methods: PaymentMethod[] }>(
      API_ENDPOINTS.PAYMENTS.METHODS
    );
    
    if (response.success && response.data) {
      return response.data.methods;
    }
    
    throw new Error(response.message || 'Failed to fetch payment methods');
  }

  async createPaymentIntent(orderId: string, paymentMethod: string): Promise<PaymentIntent> {
    const response = await apiClient.post<PaymentIntent>(
      API_ENDPOINTS.PAYMENTS.CREATE_INTENT,
      { orderId, paymentMethod }
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to create payment intent');
  }

  async confirmPayment(transactionId: string, paymentData: any): Promise<any> {
    const response = await apiClient.post<any>(
      API_ENDPOINTS.PAYMENTS.CONFIRM,
      { transactionId, paymentData }
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to confirm payment');
  }
}

export const paymentService = new PaymentService();

export const paymentServices = {
  getPaymentMethods: async () => {
    return await paymentService.getPaymentMethods();
  },

  createPaymentIntent: async (orderId: string, paymentMethod: string) => {
    return await paymentService.createPaymentIntent(orderId, paymentMethod);
  },

  confirmPayment: async (transactionId: string, paymentData: any) => {
    return await paymentService.confirmPayment(transactionId, paymentData);
  }
};

