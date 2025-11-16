import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  it('should be hidden on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Breadcrumb testid="breadcrumb-nav" />
      </MemoryRouter>
    );

    const nav = screen.getByTestId('breadcrumb-nav');
    expect(nav.className).toContain('header__breadcrumbs--hidden');
  });

  it('should display "Details" on product page', () => {
    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <Breadcrumb />
      </MemoryRouter>
    );

    expect(screen.getByText(/Details/i)).toBeDefined();
  });

  it('should not be hidden on product page', () => {
    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <Breadcrumb testid="breadcrumb-nav" />
      </MemoryRouter>
    );

    const nav = screen.getByTestId('breadcrumb-nav');
    expect(nav.className).not.toContain('header__breadcrumbs--hidden');
  });
});
