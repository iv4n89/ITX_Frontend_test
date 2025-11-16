import { Link } from 'react-router-dom';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import './header.css';
import { CartIcon } from '../cart-icon/cart-icon';

export const Header = () => {
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
          <CartIcon />
        </div>
      </div>
    </header>
  );
};
