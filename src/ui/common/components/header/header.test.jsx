import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from './header';
import { CartProvider } from '../../context/cart-context/cart-context-provider';

describe('Header', () => {
  it('should render the logo', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );

    const logo = screen.getByAltText('ITX logo');
    expect(logo).toBeDefined();
    expect(logo.src).toContain('/logo.png');
  });

  it('should render a link to home page', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );

    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink.getAttribute('href')).toBe('/');
  });

  it('should render the header container', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );

    const header = screen.getByRole('banner');
    expect(header).toBeDefined();
    expect(header.className).toContain('header__container');
  });
});
