import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.css';

export const Breadcrumb = () => {
  const location = useLocation();

  const getBreadcrumbText = () => {
    if (location.pathname.startsWith('/product/')) return 'Detalle de producto';
    return 'Home';
  };

  const isHome = location.pathname === '/';

  return (
    <nav className={`header__breadcrumbs ${isHome ? 'header__breadcrumbs--hidden' : ''}`}>
      <Link to="/" className="header__breadcrumb_link">
        {'>'} {getBreadcrumbText()}
      </Link>
    </nav>
  );
};
