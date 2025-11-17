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
      {
        path: 'product/:id',
        lazy: async () => {
          const { DetailsPage } = await import('@/ui/itx-store/views/details');
          return { Component: DetailsPage };
        },
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
