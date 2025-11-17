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

  describe('getProductDetails', () => {
    it('should fetch product details successfully', async () => {
      const mockProduct = { id: 1, name: 'Product 1', price: 100 };
      const productId = 1;
      fetchData.mockResolvedValue(mockProduct);

      const result = await ItxStoreRepository.getProductDetails(productId);

      expect(fetchData).toHaveBeenCalledWith({
        url: `/api/product/${productId}`,
        method: 'GET',
      });
      expect(result).toEqual(mockProduct);
    });

    it('should handle errors when fetching product details', async () => {
      const mockError = new Error('Network error');
      const productId = 1;
      fetchData.mockRejectedValue(mockError);
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(
        ItxStoreRepository.getProductDetails(productId)
      ).rejects.toThrow('Network error');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching product details:',
        mockError
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('addToCart', () => {
    it('should add product to cart successfully', async () => {
      const mockResponse = { success: true, cartId: 123 };
      const cartItem = { id: 1, colorCode: 'red', storageCode: '128GB' };
      fetchData.mockResolvedValue(mockResponse);

      const result = await ItxStoreRepository.addToCart(cartItem);

      expect(fetchData).toHaveBeenCalledWith({
        url: '/api/cart',
        method: 'POST',
        body: cartItem,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when adding to cart', async () => {
      const mockError = new Error('Network error');
      const cartItem = { id: 1, colorCode: 'red', storageCode: '128GB' };
      fetchData.mockRejectedValue(mockError);
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(ItxStoreRepository.addToCart(cartItem)).rejects.toThrow(
        'Network error'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error adding to cart:',
        mockError
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
