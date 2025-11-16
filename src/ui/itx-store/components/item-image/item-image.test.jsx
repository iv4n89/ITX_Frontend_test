import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ItemImage } from './item-image';

describe('ItemImage', () => {
  it('should render image with correct src', () => {
    render(<ItemImage src="/test-image.jpg" alt="Test" />);

    const img = screen.getByRole('img');
    expect(img.src).toContain('/test-image.jpg');
  });

  it('should render image with correct alt text', () => {
    render(<ItemImage src="/test-image.jpg" alt="Test Product" />);

    const img = screen.getByAltText('Test Product');
    expect(img).toBeDefined();
  });
});
