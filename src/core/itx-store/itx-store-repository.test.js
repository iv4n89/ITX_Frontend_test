import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ItxStoreRepository } from './itx-store-repository';
import { fetchData } from '../common/fetch';

vi.mock('../common/fetch');

describe('ItxStoreRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProductList', () => {
    it('should fetch product list successfully', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      fetchData.mockResolvedValue(mockProducts);

      const result = await ItxStoreRepository.getProductList();

      expect(fetchData).toHaveBeenCalledWith({
        url: '/api/product',
        method: 'GET',
      });
      expect(result).toEqual(mockProducts);
    });

    it('should handle errors when fetching product list', async () => {
      const mockError = new Error('Network error');
      fetchData.mockRejectedValue(mockError);
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(ItxStoreRepository.getProductList()).rejects.toThrow(
        'Network error'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching product list:',
        mockError
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
