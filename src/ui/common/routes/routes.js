import { createBrowserRouter } from 'react-router-dom';

/**
 * Application routes configuration
 * @type {import('react-router-dom').RouteObject[]}
 */
const routes = [
  {
    path: '/',
    Component: <></>,
    children: [
      {
        index: true,
        element: <></>,
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
