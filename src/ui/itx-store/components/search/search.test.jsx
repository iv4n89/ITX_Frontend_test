import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './search';

describe('Search', () => {
  it('should render input with placeholder', () => {
    render(<Search searchTerm="" setSearchTerm={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Search by brand or model');
    expect(input).toBeDefined();
  });

  it('should display search term value', () => {
    render(<Search searchTerm="iPhone" setSearchTerm={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Search by brand or model');
    expect(input.value).toBe('iPhone');
  });
});