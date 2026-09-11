import { useState, useCallback, useEffect } from 'react';
import { ApiResponse } from '../services/apiClient';

interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const { immediate = false, initialData = null as unknown as T, onSuccess, onError } = options;

  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(...args);
        setData(response.data);
        if (onSuccess) onSuccess(response.data);
        return response.data;
      } catch (err: any) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        if (onError) onError(errorObj);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onSuccess, onError]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    execute,
    setData,
  };
}
