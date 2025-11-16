import { describe, expect, it } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from './query-client';

describe('queryClient', () => {
    it('should be an instance of QueryClient', () => {
        expect(queryClient).toBeInstanceOf(QueryClient);
    });

    it('should have correct default staleTime', () => {
        const options = queryClient.getDefaultOptions();
        expect(options.queries.staleTime).toBe(1000 * 60 * 60);
    });

    it('should have correct default gcTime', () => {
        const options = queryClient.getDefaultOptions();
        expect(options.queries.gcTime).toBe(1000 * 60 * 60);
    });

    it('should have retry set to 3', () => {
        const options = queryClient.getDefaultOptions();
        expect(options.queries.retry).toBe(3);
    });

    it('should have correct retryDelay function', () => {
        const options = queryClient.getDefaultOptions();
        expect(options.queries.retryDelay(0)).toBe(1000);
        expect(options.queries.retryDelay(1)).toBe(2000);
        expect(options.queries.retryDelay(2)).toBe(4000);
        expect(options.queries.retryDelay(10)).toBe(30000);
    });
});