import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ItemsGrid } from './items-grid';
import { MemoryRouter } from 'react-router-dom';

describe('ItemsGrid', () => {
  it('should render skeletons when loading', () => {
    render(<ItemsGrid isLoading={true} />);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(16);
  });

  it('should render items when not loading', () => {
    const mockItems = [
      {
        id: 1,
        imgUrl: 'test1.jpg',
        brand: 'Brand1',
        model: 'Model1',
        price: 100,
      },
      {
        id: 2,
        imgUrl: 'test2.jpg',
        brand: 'Brand2',
        model: 'Model2',
        price: 200,
      },
    ];

    render(
      <MemoryRouter>
        <ItemsGrid items={mockItems} isLoading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('Brand1')).toBeDefined();
    expect(screen.getByText('Brand2')).toBeDefined();
  });

  it('should render empty grid when no items', () => {
    render(<ItemsGrid items={[]} isLoading={false} testid="items-grid" />);

    const grid = screen.getByTestId('items-grid');
    expect(grid.children).toHaveLength(0);
  });
});
