import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DetailsLayout } from './details-layout';

vi.mock('../actions/actions', () => ({
  Actions: ({ productId, options }) => (
    <div
      data-testid="actions"
      data-product-id={productId}
      data-options={JSON.stringify(options)}
    />
  ),
}));

vi.mock('../item-image/item-image', () => ({
  ItemImage: ({ src, alt }) => (
    <img data-testid="item-image" src={src} alt={alt} />
  ),
}));

vi.mock('../product/product', () => ({
  Product: ({ data }) => (
    <div data-testid="product" data-product={JSON.stringify(data)} />
  ),
}));

vi.mock('@/ui/common/components/skeleton/skeleton', () => ({
  Skeleton: ({ width, height, borderRadius, style }) => (
    <div
      data-testid="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  ),
}));

describe('DetailsLayout', () => {
  const mockProduct = {
    id: '1',
    imgUrl: '/test-image.jpg',
    brand: 'Apple',
    model: 'iPhone 15',
    internalMemory: ['128GB', '256GB'],
    colors: ['Black', 'White'],
  };

  it('should render loading skeletons when isLoading is true', () => {
    render(<DetailsLayout isLoading={true} />);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('should render product details when isLoading is false', () => {
    render(<DetailsLayout product={mockProduct} isLoading={false} />);

    const itemImage = screen.getByTestId('item-image');
    expect(itemImage).toBeDefined();
    expect(itemImage.alt).toBe('Apple iPhone 15');
    expect(itemImage.src).toContain('/test-image.jpg');
  });

  it('should render Product component with correct data', () => {
    render(<DetailsLayout product={mockProduct} isLoading={false} />);

    const product = screen.getByTestId('product');
    expect(product).toBeDefined();
    expect(product.dataset.product).toContain(mockProduct.id);
  });

  it('should render Actions component with correct props', () => {
    render(<DetailsLayout product={mockProduct} isLoading={false} />);

    const actions = screen.getByTestId('actions');
    expect(actions).toBeDefined();
    expect(actions.dataset.productId).toBe(mockProduct.id);
  });
});
