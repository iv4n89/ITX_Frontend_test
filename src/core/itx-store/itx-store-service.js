import { ItxStoreRepository } from './itx-store-repository';

/**
 * Get the list of products from the ITX Store
 * @returns {Promise<any>}
 */
export const getProductList = async () => {
  return await ItxStoreRepository.getProductList();
};

/**
 * Get product details by ID
 * @param {string} productId
 * @returns {Promise<any>}
 */
export const getProductDetails = async (productId) => {
  return await ItxStoreRepository.getProductDetails(productId);
};

/**
 * Add product to cart
 * @param {{ id: number, colorCode: number, storageCode: number }} params
 * @returns {Promise<any>}
 */
export const addToCart = async ({ id, colorCode, storageCode }) => {
  return await ItxStoreRepository.addToCart({ id, colorCode, storageCode });
};
