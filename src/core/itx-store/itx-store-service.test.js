import { describe, expect, it, vi } from 'vitest';
import { ItxStoreRepository } from './itx-store-repository';
import {
  addToCart,
  getProductDetails,
  getProductList,
} from './itx-store-service';

vi.mock('./itx-store-repository');

describe('itx-store-service', () => {
  describe('getProductList', () => {
    it('should call ItxStoreRepository.getProductList', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      vi.mocked(ItxStoreRepository.getProductList).mockResolvedValue(
        mockProducts
      );

      const result = await getProductList();

      expect(ItxStoreRepository.getProductList).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('getProductDetails', () => {
    it('should call ItxStoreRepository.getProductDetails with productId', async () => {
      const productId = '123';
      const mockProduct = { id: '123', name: 'Product Details' };
      vi.mocked(ItxStoreRepository.getProductDetails).mockResolvedValue(
        mockProduct
      );

      const result = await getProductDetails(productId);

      expect(ItxStoreRepository.getProductDetails).toHaveBeenCalledWith(
        productId
      );
      expect(result).toEqual(mockProduct);
    });
  });

  describe('addToCart', () => {
    it('should call ItxStoreRepository.addToCart with correct parameters', async () => {
      const cartItem = { id: '123', colorCode: 'red', storageCode: '128GB' };
      const mockResponse = { success: true };
      vi.mocked(ItxStoreRepository.addToCart).mockResolvedValue(mockResponse);

      const result = await addToCart(cartItem);

      expect(ItxStoreRepository.addToCart).toHaveBeenCalledWith(cartItem);
      expect(result).toEqual(mockResponse);
    });
  });
});
