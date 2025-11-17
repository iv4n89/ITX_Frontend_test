import { useParams } from 'react-router-dom';
import { DetailsLayout } from '../components/details-layout/details-layout';
import { useProductDetails } from '../hooks/use-product-details/use-product-details';

export const DetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useProductDetails(id);

  return <DetailsLayout product={data} isLoading={isLoading} />;
};
