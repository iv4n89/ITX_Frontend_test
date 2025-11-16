import { RouterProvider } from 'react-router-dom';
import './App.css';
import { QueryProviderClient } from '@/ui/common/util/query-client/query-client-provider';
import { Routes } from '@/ui/common/routes/routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartProvider } from './ui/common/context/cart-context/cart-context-provider';

function App() {
  return (
    <>
      <QueryProviderClient>
        <CartProvider>
          <RouterProvider router={Routes} />
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
          />
        </CartProvider>
      </QueryProviderClient>
    </>
  );
}

export default App;
