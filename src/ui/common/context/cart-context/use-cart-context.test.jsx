import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCart } from './use-cart-context';
import { CartContext } from './cart-context';

describe('useCart', () => {
  it('should throw error when used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider'
    );
  });

  it('should return cart context value', () => {
    const mockContextValue = {
      cart: [{ id: 1, name: 'Item 1' }],
      addToCart: () => {},
      itemCount: 1,
    };

    const wrapper = ({ children }) => (
      <CartContext.Provider value={mockContextValue}>
        {children}
      </CartContext.Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current).toBe(mockContextValue);
    expect(result.current.cart).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(result.current.itemCount).toBe(1);
  });
});
