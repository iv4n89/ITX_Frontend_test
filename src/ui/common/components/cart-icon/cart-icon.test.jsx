import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartIcon } from './cart-icon';

describe('CartIcon', () => {
    it('should render cart icon', () => {
        render(<CartIcon itemCount={0} />);
        
        const icon = screen.getByAltText('Cart icon');
        expect(icon).toBeDefined();
    });

    it('should not display item count when itemCount is 0', () => {
        render(<CartIcon itemCount={0} />);
        
        const itemCountElement = screen.queryByText('0');
        expect(itemCountElement).toBeNull();
    });

    it('should display item count when itemCount is greater than 0', () => {
        render(<CartIcon itemCount={5} />);
        
        const itemCountElement = screen.getByText('5');
        expect(itemCountElement).toBeDefined();
        expect(itemCountElement.className).toContain('header__cart_number_items');
    });

    it('should display correct item count', () => {
        render(<CartIcon itemCount={99} />);
        
        expect(screen.getByText('99')).toBeDefined();
    });
});