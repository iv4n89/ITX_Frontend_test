import { useProductActions } from '@/ui/itx-store/hooks/use-product-actions/use-product-actions';
import './actions.css';
import { Spinner } from '@/ui/common/components/spinner/spinner';

/**
 * Actions component to display product options and add to cart button
 * @param {{ productId: string, options: object }} params
 * @returns {JSX.Element}
 */
export const Actions = ({ productId, options }) => {
  const {
    colors,
    handleAddToCart,
    handleColorSelect,
    handleStorageSelect,
    isAddToCartDisabled,
    selectedColor,
    selectedStorage,
    storages,
    isFetching,
  } = useProductActions(productId, options);

  return (
    <div className="product_actions__container">
      <div className="product_actions__section">
        <h3 className="product_actions__title">Storage</h3>
        <div className="product_actions__options">
          {storages.map((storage) => (
            <button
              key={storage.code}
              className={`product_actions__option ${
                selectedStorage === storage.code
                  ? 'product_actions__option--selected'
                  : ''
              }`}
              onClick={() => handleStorageSelect(storage.code)}
              data-testid={`storage-option-${storage.name}`}
            >
              {storage.name}
            </button>
          ))}
        </div>
      </div>

      <div className="product_actions__section">
        <h3 className="product_actions__title">Colors</h3>
        <div className="product_actions__colors">
          {colors.map((color) => (
            <button
              key={color.code}
              className={`product_actions__color ${
                selectedColor === color.code
                  ? 'product_actions__color--selected'
                  : ''
              }`}
              style={{ backgroundColor: color.name.toLowerCase() }}
              onClick={() => handleColorSelect(color.code)}
              title={color.name}
              data-testid={`color-option-${color.name}`}
            />
          ))}
        </div>
      </div>

      <button
        className="product_actions__add_to_cart_button"
        onClick={handleAddToCart}
        disabled={isAddToCartDisabled}
        data-testid="add-to-cart-button"
      >
        {isFetching ? <Spinner size="large" color="white" /> : 'Add to cart'}
      </button>
    </div>
  );
};
