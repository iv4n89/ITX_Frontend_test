import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DetailsPage } from './details';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/use-product-details/use-product-details';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('../hooks/use-product-details/use-product-details', () => ({
  useProductDetails: vi.fn(),
}));

vi.mock('../components/details-layout/details-layout', () => ({
  DetailsLayout: vi.fn(({ product, isLoading }) => (
    <div data-testid="details-layout">
      {isLoading && <div>Loading</div>}
      {product && <div>{product.name}</div>}
    </div>
  )),
}));

describe('DetailsPage', () => {
  it('should render DetailsLayout with product data', () => {
    useParams.mockReturnValue({ id: '123' });
    useProductDetails.mockReturnValue({
      data: { name: 'Test Product' },
      isLoading: false,
    });

    render(<DetailsPage />);

    expect(screen.getByTestId('details-layout')).toBeDefined();
    expect(screen.getByText('Test Product')).toBeDefined();
  });

  it('should render DetailsLayout with loading state', () => {
    useParams.mockReturnValue({ id: '123' });
    useProductDetails.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<DetailsPage />);

    expect(screen.getByTestId('details-layout')).toBeDefined();
    expect(screen.getByText('Loading')).toBeDefined();
  });

  it('should call useProductDetails with id from params', () => {
    useParams.mockReturnValue({ id: '456' });
    useProductDetails.mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<DetailsPage />);

    expect(useProductDetails).toHaveBeenCalledWith('456');
  });
});
