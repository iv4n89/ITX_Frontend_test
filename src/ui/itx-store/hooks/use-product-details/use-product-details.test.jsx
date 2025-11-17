import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProductDetails } from './use-product-details';
import { getProductDetails } from '@/core/itx-store/itx-store-service';
import { QUERIES } from '../../consts/queries';

vi.mock('@/core/itx-store/itx-store-service');

describe('useProductDetails', () => {
  let queryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should fetch product details successfully', async () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100 };
    const productId = 1;
    getProductDetails.mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProductDetails(productId), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getProductDetails).toHaveBeenCalledWith(productId);
    expect(result.current.data).toEqual(mockProduct);
  });

  it('should not fetch when productId is not provided', () => {
    const { result } = renderHook(() => useProductDetails(null), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(getProductDetails).not.toHaveBeenCalled();
  });

  it('should handle errors when fetching product details', async () => {
    const mockError = new Error('Network error');
    const productId = 1;
    getProductDetails.mockRejectedValue(mockError);

    const { result } = renderHook(() => useProductDetails(productId), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });
});
