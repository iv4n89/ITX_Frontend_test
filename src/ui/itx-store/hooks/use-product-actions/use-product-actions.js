import { addToCart } from '@/core/itx-store/itx-store-service';
import { useCart } from '@/ui/common/context/cart-context/use-cart-context';
import { useState, useMemo } from 'react';

/**
 * Hook to manage product actions such as selecting storage and color, and adding to cart.
 * @param {string} productId
 * @param {{storage: string[], colors: string[]}} options
 * @returns {{
 *  selectedStorage: string|null,
 *  selectedColor: string|null,
 *  storages: string[],
 *  colors: string[],
 *  isAddToCartDisabled: boolean,
 *  handleStorageSelect: function,
 *  handleColorSelect: function,
 *  handleAddToCart: function,
 *  isFetching: boolean,
 * }}
 */
export const useProductActions = (productId, options) => {
  const [selectedStorage, setSelectedStorage] = useState(() => {
    if (options?.storage?.length === 1) {
      return options.storage[0];
    }
    return null;
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    if (options?.colors?.length === 1) {
      return options.colors[0];
    }
    return null;
  });
  const [isFetching, setIsFetching] = useState(false);
  const { addToCart: addToContextCart } = useCart();

  const storages = useMemo(() => options?.storage || [], [options?.storage]);

  const colors = useMemo(() => options?.colors || [], [options?.colors]);

  const isAddToCartDisabled = !selectedStorage || !selectedColor || isFetching;

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
  };

  const handleAddToCart = async () => {
    if (isAddToCartDisabled) {
      return;
    }

    try {
      setIsFetching(true);
      const response = await addToCart({
        id: productId,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      });
      if (response.count === 1) {
        addToContextCart({
          id: productId,
          colorCode: selectedColor,
          storageCode: selectedStorage,
        });
      }
    } finally {
      setIsFetching(false);
    }
  };

  return {
    selectedStorage,
    selectedColor,
    storages,
    colors,
    isAddToCartDisabled,
    handleStorageSelect,
    handleColorSelect,
    handleAddToCart,
    isFetching,
  };
};
