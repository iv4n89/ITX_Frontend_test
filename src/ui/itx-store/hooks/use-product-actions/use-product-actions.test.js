import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useProductActions } from './use-product-actions';
import { addToCart } from '@/core/itx-store/itx-store-service';
import { useCart } from '@/ui/common/context/cart-context/use-cart-context';

vi.mock('@/core/itx-store/itx-store-service');
vi.mock('@/ui/common/context/cart-context/use-cart-context');

describe('useProductActions', () => {
  const mockAddToContextCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useCart.mockReturnValue({ addToCart: mockAddToContextCart });
  });

  it('should initialize with null selections when multiple options available', () => {
    const options = { storage: ['64GB', '128GB'], colors: ['red', 'blue'] };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    expect(result.current.selectedStorage).toBeNull();
    expect(result.current.selectedColor).toBeNull();
    expect(result.current.storages).toEqual(['64GB', '128GB']);
    expect(result.current.colors).toEqual(['red', 'blue']);
    expect(result.current.isAddToCartDisabled).toBe(true);
  });

  it('should auto-select when only one storage option available', () => {
    const options = { storage: ['128GB'], colors: ['red', 'blue'] };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    expect(result.current.selectedStorage).toBe('128GB');
    expect(result.current.selectedColor).toBeNull();
  });

  it('should auto-select when only one color option available', () => {
    const options = { storage: ['64GB', '128GB'], colors: ['red'] };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    expect(result.current.selectedStorage).toBeNull();
    expect(result.current.selectedColor).toBe('red');
  });

  it('should handle storage selection', () => {
    const options = { storage: ['64GB', '128GB'], colors: ['red', 'blue'] };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    act(() => {
      result.current.handleStorageSelect('128GB');
    });

    expect(result.current.selectedStorage).toBe('128GB');
  });

  it('should handle color selection', () => {
    const options = { storage: ['64GB', '128GB'], colors: ['red', 'blue'] };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    act(() => {
      result.current.handleColorSelect('blue');
    });

    expect(result.current.selectedColor).toBe('blue');
  });

  it('should add to cart successfully', async () => {
    const options = { storage: ['128GB'], colors: ['red'] };
    addToCart.mockResolvedValue({ count: 1 });

    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    await act(async () => {
      await result.current.handleAddToCart();
    });

    expect(addToCart).toHaveBeenCalledWith({
      id: 'product-1',
      colorCode: 'red',
      storageCode: '128GB',
    });
    expect(mockAddToContextCart).toHaveBeenCalledWith({
      id: 'product-1',
      colorCode: 'red',
      storageCode: '128GB',
    });
    expect(result.current.isFetching).toBe(false);
  });

  it('should not add to context cart when count is not 1', async () => {
    const options = { storage: ['128GB'], colors: ['red'] };
    addToCart.mockResolvedValue({ count: 0 });

    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    await act(async () => {
      await result.current.handleAddToCart();
    });

    expect(addToCart).toHaveBeenCalled();
    expect(mockAddToContextCart).not.toHaveBeenCalled();
  });

  it('should not add to cart when disabled', async () => {
    const options = { storage: ['64GB', '128GB'], colors: ['red', 'blue'] };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    await act(async () => {
      await result.current.handleAddToCart();
    });

    expect(addToCart).not.toHaveBeenCalled();
  });

  it('should disable add to cart while fetching', async () => {
    const options = { storage: ['128GB'], colors: ['red'] };
    addToCart.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ count: 1 }), 100))
    );

    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    expect(result.current.isAddToCartDisabled).toBe(false);

    act(() => {
      result.current.handleAddToCart();
    });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(true);
      expect(result.current.isAddToCartDisabled).toBe(true);
    });
  });
});
