import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CartProvider } from './cart-context-provider';
import { useCart } from './use-cart-context';

const TestComponent = () => {
  const { cart, itemCount, addToCart } = useCart();

  return (
    <div>
      <div data-testid="item-count">{itemCount}</div>
      <div data-testid="cart-items">{JSON.stringify(cart)}</div>
      <button onClick={() => addToCart({ id: 1, name: 'Test Item' })}>
        Add Item
      </button>
    </div>
  );
};

describe('CartProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-items').textContent).toBe('[]');
  });

  it('should initialize with stored cart data', () => {
    const storedCart = [{ id: 1, name: 'Stored Item' }];
    localStorage.setItem('itx-store-cart', JSON.stringify(storedCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('item-count').textContent).toBe('1');
    expect(screen.getByTestId('cart-items').textContent).toBe(
      JSON.stringify(storedCart)
    );
  });

  it('should add item to cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Item'));

    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('1');
    });
  });

  it('should persist cart to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Item'));

    const stored = localStorage.getItem('itx-store-cart');
    expect(JSON.parse(stored)).toEqual([{ id: 1, name: 'Test Item' }]);
  });
});
