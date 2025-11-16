import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from './header';

describe('Header', () => {
    it('should render the logo', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const logo = screen.getByAltText('ITX logo');
        expect(logo).toBeDefined();
        expect(logo.src).toContain('/logo.png');
    });

    it('should render a link to home page', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const logoLink = screen.getByTestId('logo-link');
        expect(logoLink.getAttribute('href')).toBe('/');
    });

    it('should render the header container', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const header = screen.getByRole('banner');
        expect(header).toBeDefined();
        expect(header.className).toContain('header__container');
    });
});