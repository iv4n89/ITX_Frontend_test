import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Layout } from './layout';

describe('Layout', () => {
  it('should render Header component', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const banner = screen.getByRole('banner');
    expect(banner).toBeDefined();
  });

  it('should render a link to home page in Header', () => {
    render(
        <MemoryRouter>
            <Layout />
        </MemoryRouter>
    );

    const logoLinkg = screen.getByTestId('logo-link');
    expect(logoLinkg.getAttribute('href')).toBe('/');
  })
});