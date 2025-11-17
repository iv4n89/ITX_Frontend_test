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
    const options = {
      storages: [
        { code: 2000, name: '64GB' },
        { code: 2001, name: '128GB' },
      ],
      colors: [
        { code: 1000, name: 'red' },
        { code: 1001, name: 'blue' },
      ],
    };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    expect(result.current.selectedStorage).toBeNull();
    expect(result.current.selectedColor).toBeNull();
    expect(result.current.storages).toEqual([
      { code: 2000, name: '64GB' },
      { code: 2001, name: '128GB' },
    ]);
    expect(result.current.colors).toEqual([
      { code: 1000, name: 'red' },
      { code: 1001, name: 'blue' },
    ]);
    expect(result.current.isAddToCartDisabled).toBe(true);
  });

  it('should auto-select when only one storage option available', () => {
    const options = {
      storages: [{ code: 2001, name: '128GB' }],
      colors: [
        { code: 1000, name: 'red' },
        { code: 1001, name: 'blue' },
      ],
    };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    expect(result.current.selectedStorage).toBe(2001);
    expect(result.current.selectedColor).toBeNull();
  });

  it('should auto-select when only one color option available', () => {
    const options = {
      storages: [
        { code: 2000, name: '64GB' },
        { code: 2001, name: '128GB' },
      ],
      colors: [{ code: 1000, name: 'red' }],
    };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    expect(result.current.selectedStorage).toBeNull();
    expect(result.current.selectedColor).toBe(1000);
  });

  it('should handle storage selection', () => {
    const options = {
      storages: [
        { code: 2000, name: '64GB' },
        { code: 2001, name: '128GB' },
      ],
      colors: [
        { code: 1000, name: 'red' },
        { code: 1001, name: 'blue' },
      ],
    };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    act(() => {
      result.current.handleStorageSelect(2001);
    });

    expect(result.current.selectedStorage).toBe(2001);
  });

  it('should handle color selection', () => {
    const options = {
      storages: [
        { code: 2000, name: '64GB' },
        { code: 2001, name: '128GB' },
      ],
      colors: [
        { code: 1000, name: 'red' },
        { code: 1001, name: 'blue' },
      ],
    };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    act(() => {
      result.current.handleColorSelect(1001);
    });

    expect(result.current.selectedColor).toBe(1001);
  });

  it('should add to cart successfully', async () => {
    const options = {
      storages: [{ code: 2001, name: '128GB' }],
      colors: [{ code: 1000, name: 'red' }],
    };
    addToCart.mockResolvedValue({ count: 1 });

    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    await act(async () => {
      await result.current.handleAddToCart();
    });

    expect(addToCart).toHaveBeenCalledWith({
      id: 'product-1',
      colorCode: 1000,
      storageCode: 2001,
    });
    expect(mockAddToContextCart).toHaveBeenCalledWith({
      id: 'product-1',
      colorCode: 1000,
      storageCode: 2001,
    });
    expect(result.current.isFetching).toBe(false);
  });

  it('should not add to context cart when count is not 1', async () => {
    const options = {
      storages: [{ code: 2001, name: '128GB' }],
      colors: [{ code: 1000, name: 'red' }],
    };
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
    const options = {
      storages: [
        { code: 2000, name: '64GB' },
        { code: 2001, name: '128GB' },
      ],
      colors: [
        { code: 1000, name: 'red' },
        { code: 1001, name: 'blue' },
      ],
    };
    const { result } = renderHook(() =>
      useProductActions('product-1', options)
    );

    await act(async () => {
      await result.current.handleAddToCart();
    });

    expect(addToCart).not.toHaveBeenCalled();
  });

  it('should disable add to cart while fetching', async () => {
    const options = {
      storages: [{ code: 2001, name: '128GB' }],
      colors: [{ code: 1000, name: 'red' }],
    };
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
