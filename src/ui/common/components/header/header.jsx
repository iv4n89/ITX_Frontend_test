import { Link } from 'react-router-dom';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import './header.css';
import { CartIcon } from '../cart-icon/cart-icon';
import { useCart } from '../../context/cart-context/use-cart-context';

/**
 * Header component containing logo, breadcrumb, and cart icon
 * @returns {JSX.Element}
 */
export const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="header__container">
      <div className="header__content">
        <div className="header__left">
          <Link to="/" className="header__logo_link" data-testid="logo-link">
            <img className="header__logo" src="/logo.png" alt="ITX logo" />
          </Link>
          <Breadcrumb />
        </div>
        <div className="header__right">
          <CartIcon itemCount={itemCount} />
        </div>
      </div>
    </header>
  );
};
