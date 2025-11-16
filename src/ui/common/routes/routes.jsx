import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { HomePage } from '@/ui/itx-store/views/home';

/**
 * Application routes configuration
 * @type {import('react-router-dom').RouteObject[]}
 */
const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
