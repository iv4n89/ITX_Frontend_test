import React from 'react';
import { CartContext } from './cart-context';

/**
 * Custom hook to access the Cart context
 *
 * @returns {{
 *   cart: Array<Object>,
 *   addToCart: (item: Object) => void,
 *   itemCount: number
 * }} The cart context value
 */
export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
