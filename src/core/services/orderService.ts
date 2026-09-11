import { apiClient, ApiResponse } from './apiClient';
import { CartItem } from '../../types';

export interface CreateOrderPayload {
  recipientName: string;
  phone: string;
  address: string;
  district: string;
  deliveryTimeType: 'asap' | 'scheduled';
  scheduledTime?: string;
  notes?: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  voucherCode?: string;
}

export interface OrderRecord extends CreateOrderPayload {
  orderId: string;
  createdAt: string;
  status: 'pending' | 'brewing' | 'shipping' | 'completed';
}

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<ApiResponse<OrderRecord>> {
    const mockOrder: OrderRecord = {
      ...payload,
      orderId: 'LUM-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    // Save to localStorage for demo persistence
    if (typeof window !== 'undefined') {
      try {
        const history = JSON.parse(localStorage.getItem('lumina_demo_orders') || '[]');
        history.unshift(mockOrder);
        localStorage.setItem('lumina_demo_orders', JSON.stringify(history));
      } catch (e) {
        // ignore
      }
    }

    return apiClient.post<OrderRecord>('/orders', payload, {
      mockData: mockOrder,
    });
  },

  async getOrderHistory(): Promise<ApiResponse<OrderRecord[]>> {
    let history: OrderRecord[] = [];
    if (typeof window !== 'undefined') {
      try {
        history = JSON.parse(localStorage.getItem('lumina_demo_orders') || '[]');
      } catch (e) {
        history = [];
      }
    }

    return apiClient.get<OrderRecord[]>('/orders/history', {
      mockData: history,
    });
  },
};
