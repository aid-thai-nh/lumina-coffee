import { projectConfig } from '../../config/project.config';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  mockData?: any;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor() {
    this.baseUrl = projectConfig.api.baseUrl;
    this.defaultTimeout = projectConfig.api.timeout;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = new URL(cleanEndpoint, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      });
    }

    return url.pathname + url.search;
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lumina_auth_token');
    }
    return null;
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    // 1. Check if mock data is provided and mock mode is enabled
    if (projectConfig.features.enableMockApi && config.mockData !== undefined) {
      await new Promise((resolve) => setTimeout(resolve, projectConfig.api.mockLatencyMs));
      return {
        data: config.mockData,
        status: 200,
        success: true,
        message: 'Mock response successful',
      };
    }

    const url = this.buildUrl(endpoint, config.params);
    const headers = new Headers(config.headers || {});

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const token = this.getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || this.defaultTimeout);

    try {
      const response = await fetch(url, {
        ...config,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new ApiError(
          responseData?.message || `HTTP Error ${response.status}`,
          response.status,
          responseData
        );
      }

      return {
        data: responseData as T,
        status: response.status,
        success: true,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new ApiError('Request timed out', 408);
      }
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error?.message || 'Network request failed', 500);
    }
  }

  get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  post<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
