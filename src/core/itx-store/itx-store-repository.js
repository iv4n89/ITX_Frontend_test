import { fetchData } from '../common/fetch';

/**
 * ItxStoreRepository handles API interactions for the ITX Store
 *
 * @property {Function} getProductList - Fetches the list of products
 * @property {Function} getProductDetails - Fetches details of a specific product by ID
 * @property {Function} addToCart - Adds a product to the cart
 *
 */
export const ItxStoreRepository = {
  /**
   * Fetch product list
   * @returns {Promise<any>}
   */
  async getProductList() {
    try {
      const url = '/api/product';
      const method = 'GET';

      const response = await fetchData({ url, method });
      return response;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  },
  /**
   * Fetch product details by ID
   * @param {string} productId
   * @returns {Promise<any>}
   */
  async getProductDetails(productId) {
    try {
      const url = `/api/product/${productId}`;
      const method = 'GET';

      const response = await fetchData({ url, method });
      return response;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  },
  /**
   * Add product to cart
   * @param {{id: number, colorCode: number, storageCode: number }} params
   * @returns {Promise<any>}
   */
  async addToCart({ id, colorCode, storageCode }) {
    try {
      const url = '/api/cart';
      const method = 'POST';
      const body = { id, colorCode, storageCode };
      const response = await fetchData({ url, method, body });
      return response;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },
};
