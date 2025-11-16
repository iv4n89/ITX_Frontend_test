import { useQuery } from '@tanstack/react-query';
import { QUERIES } from '@/ui/itx-store/consts/queries';
import { getProductList } from '@/core/itx-store/itx-store-service';

export const useListProducts = () => {
  const query = useQuery({
    queryKey: [QUERIES.LIST_PRODUCTS],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return query;
};
