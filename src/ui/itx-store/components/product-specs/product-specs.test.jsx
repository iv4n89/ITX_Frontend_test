import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductSpecs } from './product-specs';

describe('ProductSpecs', () => {
  it('should render all specs when data is provided', () => {
    const data = {
      cpu: 'Mediatek Helio G88',
      ram: '16GB',
      os: 'Android 12',
      displayResolution: '1900x1080',
      battery: '5000mAh',
      primaryCamera: '48MP',
      secondaryCmera: '12MP',
      dimentions: '150x75x8mm',
      weight: '200g',
    };

    render(<ProductSpecs data={data} />);

    expect(screen.getByText('CPU:')).toBeDefined();
    expect(screen.getByText('Mediatek Helio G88')).toBeDefined();
    expect(screen.getByText('RAM:')).toBeDefined();
    expect(screen.getByText('16GB')).toBeDefined();
    expect(screen.getByText('OS:')).toBeDefined();
    expect(screen.getByText('Android 12')).toBeDefined();
    expect(screen.getByText('Screen:')).toBeDefined();
    expect(screen.getByText('1900x1080')).toBeDefined();
    expect(screen.getByText('Battery:')).toBeDefined();
    expect(screen.getByText('5000mAh')).toBeDefined();
    expect(screen.getByText('Camera:')).toBeDefined();
    expect(screen.getByText('48MP')).toBeDefined();
    expect(screen.getByText('Front Camera:')).toBeDefined();
    expect(screen.getByText('12MP')).toBeDefined();
    expect(screen.getByText('Dimentions:')).toBeDefined();
    expect(screen.getByText('150x75x8mm')).toBeDefined();
    expect(screen.getByText('Weight:')).toBeDefined();
    expect(screen.getByText('200g')).toBeDefined();
  });

  it('should render only provided specs', () => {
    const data = {
      cpu: 'Mediatek Helio G88',
      ram: '8GB',
    };

    render(<ProductSpecs data={data} />);

    expect(screen.getByText('CPU:')).toBeDefined();
    expect(screen.getByText('Mediatek Helio G88')).toBeDefined();
    expect(screen.getByText('RAM:')).toBeDefined();
    expect(screen.getByText('8GB')).toBeDefined();
    expect(screen.queryByText('OS:')).toBeNull();
    expect(screen.queryByText('Screen:')).toBeNull();
  });

  it('should render empty list when no data is provided', () => {
    const data = {};

    const { container } = render(<ProductSpecs data={data} />);

    const list = container.querySelector('.product_info__specs_list');
    expect(list).toBeDefined();
    expect(list.children.length).toBe(0);
  });
});
