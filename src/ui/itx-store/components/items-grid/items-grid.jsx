import { Skeleton } from '@/ui/common/components/skeleton/skeleton';
import { Item } from '../item/item';
import './items-grid.css';

export const ItemsGrid = ({ items, isLoading, testid }) => {
  if (isLoading) {
    return (
      <div className="items_grid" data-testid={testid}>
        {Array.from({ length: 16 }).map((_, index) => (
          <Skeleton
            key={index}
            borderRadius={12}
            width="100%"
            height={450}
            testid="skeleton"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="items_grid" data-testid={testid}>
      {Array.isArray(items) &&
        items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            imageSrc={item.imgUrl}
            brand={item.brand}
            model={item.model}
            price={item.price}
          />
        ))}
    </div>
  );
};
