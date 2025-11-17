import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import './layout.css';

/**
 * Layout component to structure the page with header and main content
 * @returns {JSX.Element}
 */
export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
