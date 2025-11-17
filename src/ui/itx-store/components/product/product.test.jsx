import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Product } from './product';

vi.mock('../product-specs/product-specs', () => ({
  // eslint-disable-next-line no-unused-vars
  ProductSpecs: ({ data }) => (
    <div data-testid="product-specs">ProductSpecs</div>
  ),
}));

describe('Product', () => {
  const mockData = {
    brand: 'Apple',
    model: 'iPhone 14',
    price: '999',
  };

  it('should render product brand', () => {
    render(<Product data={mockData} />);

    const brand = screen.getByText('Apple');
    expect(brand).toBeDefined();
    expect(brand.className).toContain('product_info__brand');
  });

  it('should render product model', () => {
    render(<Product data={mockData} />);

    const model = screen.getByText('iPhone 14');
    expect(model).toBeDefined();
    expect(model.className).toContain('product_info__model');
  });

  it('should render product price when available', () => {
    render(<Product data={mockData} />);

    const price = screen.getByText('999 €');
    expect(price).toBeDefined();
    expect(price.className).toContain('product_info__price');
  });

  it('should render dash when price is empty', () => {
    const dataWithoutPrice = { ...mockData, price: '' };
    render(<Product data={dataWithoutPrice} />);

    const price = screen.getByText('- €');
    expect(price).toBeDefined();
  });

  it('should render ProductSpecs component with data', () => {
    render(<Product data={mockData} />);

    const specs = screen.getByTestId('product-specs');
    expect(specs).toBeDefined();
  });
});
