import { describe, expect, it, vi } from 'vitest';
import { ItxStoreRepository } from './itx-store-repository';
import { getProductList } from './itx-store-service';

vi.mock('./itx-store-repository');

describe('itx-store-service', () => {
  describe('getProductList', () => {
    it('should call ItxStoreRepository.getProductList', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      vi.mocked(ItxStoreRepository.getProductList).mockResolvedValue(mockProducts);

      const result = await getProductList();

      expect(ItxStoreRepository.getProductList).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });
});