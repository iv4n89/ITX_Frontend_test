import { useQuery } from '@tanstack/react-query';
import { QUERIES } from '../../consts/queries';
import { getProductDetails } from '@/core/itx-store/itx-store-service';

/**
 * Hook to fetch product details using React Query
 * @param {string} productId
 * @returns {import('@tanstack/react-query').UseQueryResult<any, unknown>}
 */
export const useProductDetails = (productId) => {
  const query = useQuery({
    queryKey: [QUERIES.PRODUCT_DETAILS, productId],
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return query;
};
