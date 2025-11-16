import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Item } from './item';

describe('Item', () => {
  it('should render item with all props', () => {
    render(
      <MemoryRouter>
        <Item
          id="123"
          imageSrc="/test.jpg"
          brand="TestBrand"
          model="TestModel"
          price="999"
        />
      </MemoryRouter>
    );

    expect(screen.getByText('TestBrand')).toBeDefined();
    expect(screen.getByText('TestModel')).toBeDefined();
    expect(screen.getByText('999€')).toBeDefined();
  });

  it('should render "- €" when price is not provided', () => {
    render(
      <MemoryRouter>
        <Item
          id="123"
          imageSrc="/test.jpg"
          brand="TestBrand"
          model="TestModel"
        />
      </MemoryRouter>
    );

    expect(screen.getByText('- €')).toBeDefined();
  });

  it('should link to correct product page', () => {
    render(
      <MemoryRouter>
        <Item
          id="123"
          imageSrc="/test.jpg"
          brand="TestBrand"
          model="TestModel"
          price="999"
        />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/product/123');
  });
});
