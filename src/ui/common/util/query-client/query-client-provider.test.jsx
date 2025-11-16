import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryProviderClient } from './query-client-provider';

vi.mock('@tanstack/query-async-storage-persister', () => ({
  createAsyncStoragePersister: vi.fn(() => ({})),
}));

vi.mock('@tanstack/react-query-persist-client', () => ({
  PersistQueryClientProvider: ({ children }) => (
    <div data-testid="query-provider">{children}</div>
  ),
}));

vi.mock('./query-client', () => ({
  queryClient: {},
}));

describe('QueryProviderClient', () => {
  it('should render children', () => {
    render(
      <QueryProviderClient>
        <div data-testid="test-child">Test Content</div>
      </QueryProviderClient>
    );

    expect(screen.getByTestId('test-child')).toBeDefined();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('should render PersistQueryClientProvider', () => {
    render(
      <QueryProviderClient>
        <div>Test</div>
      </QueryProviderClient>
    );

    expect(screen.getByTestId('query-provider')).toBeDefined();
  });
});
