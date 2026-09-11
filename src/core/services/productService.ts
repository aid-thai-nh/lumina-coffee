import { apiClient, ApiResponse } from './apiClient';
import { Product } from '../../types';
import { PRODUCTS as localProducts } from '../../data/coffeeData';

export interface ProductFilterParams {
  category?: string;
  roastLevel?: string;
  search?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

export const productService = {
  async getAll(params?: ProductFilterParams): Promise<ApiResponse<Product[]>> {
    let result = [...localProducts];

    if (params?.category && params.category !== 'all') {
      result = result.filter((p) => p.category === params.category);
    }
    if (params?.roastLevel && params.roastLevel !== 'all') {
      result = result.filter((p) => p.roastLevel?.toLowerCase() === params.roastLevel?.toLowerCase());
    }
    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tastingNotes?.some((n) => n.toLowerCase().includes(q)) ||
          p.origin?.toLowerCase().includes(q)
      );
    }

    if (params?.sortBy) {
      if (params.sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
      else if (params.sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
      else if (params.sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return apiClient.get<Product[]>('/products', {
      params: params as any,
      mockData: result,
    });
  },

  async getById(id: string): Promise<ApiResponse<Product | null>> {
    const item = localProducts.find((p) => p.id === id) || null;
    return apiClient.get<Product | null>(`/products/${id}`, {
      mockData: item,
    });
  },
};
