import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import './layout.css';

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
