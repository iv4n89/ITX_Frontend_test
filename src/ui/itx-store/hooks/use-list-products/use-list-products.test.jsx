import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { useListProducts } from './use-list-products';
import { getProductList } from '@/core/itx-store/itx-store-service';

vi.mock('@/core/itx-store/itx-store-service');

describe('useListProducts', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    return ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  it('should fetch product list successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    getProductList.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useListProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProducts);
    expect(getProductList).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching product list fails', async () => {
    const mockError = new Error('Failed to fetch');
    getProductList.mockRejectedValue(mockError);

    const { result } = renderHook(() => useListProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });
});