import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Actions } from './actions';
import { useProductActions } from '@/ui/itx-store/hooks/use-product-actions/use-product-actions';

vi.mock('@/ui/itx-store/hooks/use-product-actions/use-product-actions');

describe('Actions', () => {
  const mockUseProductActions = {
    colors: ['Black', 'White', 'Blue'],
    storages: ['128GB', '256GB', '512GB'],
    selectedColor: 'Black',
    selectedStorage: '128GB',
    handleColorSelect: vi.fn(),
    handleStorageSelect: vi.fn(),
    handleAddToCart: vi.fn(),
    isAddToCartDisabled: false,
    isFetching: false,
  };

  it('should render storage options', () => {
    useProductActions.mockReturnValue(mockUseProductActions);

    render(<Actions productId="123" options={{}} />);

    expect(screen.getByText('Storage')).toBeDefined();
    expect(screen.getByTestId('storage-option-128GB')).toBeDefined();
    expect(screen.getByTestId('storage-option-256GB')).toBeDefined();
    expect(screen.getByTestId('storage-option-512GB')).toBeDefined();
  });

  it('should render color options', () => {
    useProductActions.mockReturnValue(mockUseProductActions);

    render(<Actions productId="123" options={{}} />);

    expect(screen.getByText('Colors')).toBeDefined();
    expect(screen.getByTestId('color-option-Black')).toBeDefined();
    expect(screen.getByTestId('color-option-White')).toBeDefined();
    expect(screen.getByTestId('color-option-Blue')).toBeDefined();
  });

  it('should highlight selected storage', () => {
    useProductActions.mockReturnValue(mockUseProductActions);

    render(<Actions productId="123" options={{}} />);

    const selectedStorage = screen.getByTestId('storage-option-128GB');
    expect(selectedStorage.className).toContain(
      'product_actions__option--selected'
    );
  });

  it('should highlight selected color', () => {
    useProductActions.mockReturnValue(mockUseProductActions);

    render(<Actions productId="123" options={{}} />);

    const selectedColor = screen.getByTestId('color-option-Black');
    expect(selectedColor.className).toContain(
      'product_actions__color--selected'
    );
  });

  it('should render add to cart button', () => {
    useProductActions.mockReturnValue(mockUseProductActions);

    render(<Actions productId="123" options={{}} />);

    const button = screen.getByTestId('add-to-cart-button');
    expect(button.textContent).toBe('Add to cart');
    expect(button.disabled).toBe(false);
  });

  it('should disable add to cart button when isAddToCartDisabled is true', () => {
    useProductActions.mockReturnValue({
      ...mockUseProductActions,
      isAddToCartDisabled: true,
    });

    render(<Actions productId="123" options={{}} />);

    const button = screen.getByTestId('add-to-cart-button');
    expect(button.disabled).toBe(true);
  });

  it('should show spinner when isFetching is true', () => {
    useProductActions.mockReturnValue({
      ...mockUseProductActions,
      isFetching: true,
    });

    render(<Actions productId="123" options={{}} />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeDefined();
  });
});
