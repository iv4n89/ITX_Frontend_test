import { ProductSpecs } from '../product-specs/product-specs';
import './product.css';

/**
 * Product component to display product information
 * @param {{ data: object }} params
 * @returns {JSX.Element}
 */
export const Product = ({ data }) => {
  return (
    <div className="product_info__container">
      <div className="product_info__header">
        <h1 className="product_info__brand">{data.brand}</h1>
        <h2 className="product_info__model">{data.model}</h2>
        <p className="product_info__price">
          {data.price.length ? data.price : '-'} €
        </p>
      </div>

      <div className="product_info__specs_container">
        <ProductSpecs data={data} />
      </div>
    </div>
  );
};
