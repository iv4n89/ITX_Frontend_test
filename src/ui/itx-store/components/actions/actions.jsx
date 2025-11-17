import { useProductActions } from '@/ui/itx-store/hooks/use-product-actions/use-product-actions';
import './actions.css';
import { Spinner } from '@/ui/common/components/spinner/spinner';

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
              key={storage}
              className={`product_actions__option ${
                selectedStorage === storage
                  ? 'product_actions__option--selected'
                  : ''
              }`}
              onClick={() => handleStorageSelect(storage)}
              data-testid={`storage-option-${storage}`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      <div className="product_actions__section">
        <h3 className="product_actions__title">Colors</h3>
        <div className="product_actions__colors">
          {colors.map((color) => (
            <button
              key={color}
              className={`product_actions__color ${
                selectedColor === color
                  ? 'product_actions__color--selected'
                  : ''
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => handleColorSelect(color)}
              title={color}
              data-testid={`color-option-${color}`}
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
