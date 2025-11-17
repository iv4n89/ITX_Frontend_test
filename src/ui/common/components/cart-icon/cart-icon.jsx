import './cart-icon.css';

/**
 * CartIcon component to display the cart icon with item count
 * @param {{ itemCount: number }} params
 * @returns {JSX.Element}
 */
export const CartIcon = ({ itemCount }) => {
  return (
    <div className="header__cart_container">
      {itemCount > 0 && (
        <div className="header__cart_number_items">{itemCount}</div>
      )}
      <img className="header__cart_icon" src="/cart.svg" alt="Cart icon" />
    </div>
  );
};
