import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('should render with default border radius', () => {
    render(<Skeleton testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.style.borderRadius).toBe('8px');
  });

  it('should render with custom border radius', () => {
    render(<Skeleton borderRadius={12} testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.style.borderRadius).toBe('12px');
  });

  it('should render with custom width and height', () => {
    render(<Skeleton width="200px" height="100px" testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.style.width).toBe('200px');
    expect(skeleton.style.height).toBe('100px');
  });

  it('should apply custom className', () => {
    render(<Skeleton className="custom-class" testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.className).toContain('skeleton');
    expect(skeleton.className).toContain('custom-class');
  });
});
