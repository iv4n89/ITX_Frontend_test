import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useListProducts } from '../hooks/use-list-products/use-list-products';
import { useSearch } from '../hooks/use-search/use-search';
import { HomePage } from './home';

vi.mock('../hooks/use-list-products/use-list-products');
vi.mock('../hooks/use-search/use-search');
vi.mock('../components/search/search', () => ({
  Search: () => <div data-testid="search">Search</div>,
}));
vi.mock('../components/items-grid/items-grid', () => ({
  ItemsGrid: ({ items, isLoading }) => (
    <div data-testid="items-grid">
      {isLoading ? 'Loading...' : `Items: ${items?.length || 0}`}
    </div>
  ),
}));

describe('HomePage', () => {
  it('should render Search and ItemsGrid components', async () => {
    useListProducts.mockReturnValue({ data: [], isLoading: false });
    useSearch.mockReturnValue({
      searchTerm: '',
      setSearchTerm: vi.fn(),
      filteredData: [],
    });

    render(<HomePage />);

    expect(screen.getByTestId('search')).toBeDefined();
    expect(screen.getByTestId('items-grid')).toBeDefined();
  });

  it('should pass filtered data to ItemsGrid', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    useListProducts.mockReturnValue({ data: mockData, isLoading: false });
    useSearch.mockReturnValue({
      searchTerm: '',
      setSearchTerm: vi.fn(),
      filteredData: mockData,
    });

    render(<HomePage />);

    expect(screen.getByText('Items: 2')).toBeDefined();
  });

  it('should show loading state', async () => {
    useListProducts.mockReturnValue({ data: [], isLoading: true });
    useSearch.mockReturnValue({
      searchTerm: '',
      setSearchTerm: vi.fn(),
      filteredData: [],
    });

    render(<HomePage />);

    expect(screen.getByText('Loading...')).toBeDefined();
  });
});
