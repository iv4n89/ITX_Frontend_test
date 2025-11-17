import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Layout } from './layout';
import { CartProvider } from '../../context/cart-context/cart-context-provider';

describe('Layout', () => {
  it('should render Header component', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </CartProvider>
    );

    const banner = screen.getByRole('banner');
    expect(banner).toBeDefined();
  });

  it('should render a link to home page in Header', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </CartProvider>
    );

    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink.getAttribute('href')).toBe('/');
  });
});
