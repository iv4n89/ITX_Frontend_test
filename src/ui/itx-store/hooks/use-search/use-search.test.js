import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSearch } from './use-search';

describe('useSearch', () => {
  const mockData = [
    { brand: 'Apple', model: 'iPhone 14' },
    { brand: 'Samsung', model: 'Galaxy S23' },
    { brand: 'Google', model: 'Pixel 7' },
  ];

  it('should initialize with empty search term', () => {
    const { result } = renderHook(() => useSearch(mockData));
    expect(result.current.searchTerm).toBe('');
    expect(result.current.filteredData).toEqual(mockData);
  });

  it('should filter data by brand', () => {
    const { result } = renderHook(() => useSearch(mockData));

    act(() => {
      result.current.setSearchTerm('apple');
    });

    expect(result.current.searchTerm).toBe('apple');
    expect(result.current.filteredData).toEqual([
      { brand: 'Apple', model: 'iPhone 14' },
    ]);
  });

  it('should filter data by model', () => {
    const { result } = renderHook(() => useSearch(mockData));

    act(() => {
      result.current.setSearchTerm('pixel');
    });

    expect(result.current.filteredData).toEqual([
      { brand: 'Google', model: 'Pixel 7' },
    ]);
  });

  it('should return all data when search term is empty', () => {
    const { result } = renderHook(() => useSearch(mockData));

    act(() => {
      result.current.setSearchTerm('apple');
    });

    act(() => {
      result.current.setSearchTerm('');
    });

    expect(result.current.filteredData).toEqual(mockData);
  });

  it('should return empty array when data is null or undefined', () => {
    const { result } = renderHook(() => useSearch(null));

    act(() => {
      result.current.setSearchTerm('test');
    });

    expect(result.current.filteredData).toEqual([]);
  });

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useSearch(mockData));

    act(() => {
      result.current.setSearchTerm('SAMSUNG');
    });

    expect(result.current.filteredData).toEqual([
      { brand: 'Samsung', model: 'Galaxy S23' },
    ]);
  });
});
