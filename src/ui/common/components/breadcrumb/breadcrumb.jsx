import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.css';

export const Breadcrumb = ({ testid }) => {
  const location = useLocation();

  const getBreadcrumbText = () => {
    if (location.pathname.startsWith('/product/')) return 'Details';
    return 'Home';
  };

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`header__breadcrumbs ${isHome ? 'header__breadcrumbs--hidden' : ''}`}
      data-testid={testid}
    >
      <Link to="/" className="header__breadcrumb_link">
        {'>'} {getBreadcrumbText()}
      </Link>
    </nav>
  );
};
