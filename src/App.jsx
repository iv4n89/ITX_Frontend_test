import { RouterProvider } from 'react-router-dom';
import './App.css';
import { QueryProviderClient } from '@/ui/common/util/query-client/query-client-provider';
import { Routes } from '@/ui/common/routes/routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <QueryProviderClient>
        <RouterProvider router={Routes} />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </QueryProviderClient>
    </>
  );
}

export default App;
