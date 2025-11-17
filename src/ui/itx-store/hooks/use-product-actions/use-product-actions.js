import { addToCart } from '@/core/itx-store/itx-store-service';
import { useCart } from '@/ui/common/context/cart-context/use-cart-context';
import { useState, useMemo } from 'react';

/**
 * Hook to manage product actions such as selecting storage and color, and adding to cart.
 * @param {string} productId
 * @param {{storages: {code: number, name: string}[], colors: {code: number, name: string}[]}} options
 * @returns {{
 *  selectedStorage: number|null,
 *  selectedColor: number|null,
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
    if (options?.storages?.length === 1) {
      return options.storages[0].code;
    }
    return null;
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    if (options?.colors?.length === 1) {
      return options.colors[0].code;
    }
    return null;
  });
  const [isFetching, setIsFetching] = useState(false);
  const { addToCart: addToContextCart } = useCart();

  const storages = useMemo(() => options?.storages || [], [options?.storages]);

  const colors = useMemo(() => options?.colors || [], [options?.colors]);

  const isAddToCartDisabled = !selectedStorage || !selectedColor || isFetching;

  const handleStorageSelect = (storageCode) => {
    setSelectedStorage(storageCode);
  };

  const handleColorSelect = (colorCode) => {
    setSelectedColor(colorCode);
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
