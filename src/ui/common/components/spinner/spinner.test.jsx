import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('should render with default size and color', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner.className).toContain('spinner__medium');
    expect(spinner.className).toContain('spinner__white');
  });

  it('should render with small size', () => {
    render(<Spinner size="small" />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner.className).toContain('spinner__small');
  });

  it('should render with large size', () => {
    render(<Spinner size="large" />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner.className).toContain('spinner__large');
  });

  it('should render with custom color', () => {
    render(<Spinner color="blue" />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner.className).toContain('spinner__blue');
  });

  it('should render loading text for accessibility', () => {
    render(<Spinner />);

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeDefined();
    expect(loadingText.className).toContain('spinner__visuallyhidden');
  });
});
