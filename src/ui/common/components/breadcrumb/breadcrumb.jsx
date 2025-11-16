import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.css';
import React from 'react';

export const Breadcrumb = ({ testid }) => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const breadcrumbItems = [];
    const pathSegments = location.pathname.split('/').filter(Boolean);

    breadcrumbItems.push({ text: 'Home', path: '/' });

    if (pathSegments[0] === 'product' && pathSegments[1]) {
      breadcrumbItems.push({
        text: 'Product details',
        path: `/product/${pathSegments[1]}`,
      });
    }

    return breadcrumbItems;
  };

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`header__breadcrumbs ${isHome ? 'header__breadcrumbs--hidden' : ''}`}
      data-testid={testid}
    >
      {getBreadcrumbItems().map((segment, index, array) => (
        <React.Fragment key={segment.path}>
          <Link to={segment.path} className="header__breadcrumb_link">
            {segment.text}
          </Link>
          <span>{index < array.length - 1 && ' > '}</span>
        </React.Fragment>
      ))}
    </nav>
  );
};
