import './product-specs.css';

/**
 * ProductSpecs component to display product specifications
 * @param {{ data: object }} params
 * @returns {JSX.Element}
 */
export const ProductSpecs = ({ data }) => {
  return (
    <ul className="product_info__specs_list">
      {data.cpu && (
        <li>
          <strong>CPU:</strong>
          {data.cpu}
        </li>
      )}
      {data.ram && (
        <li>
          <strong>RAM:</strong>
          {data.ram}
        </li>
      )}
      {data.os && (
        <li>
          <strong>OS:</strong>
          {data.os}
        </li>
      )}
      {data.displayResolution && (
        <li>
          <strong>Screen:</strong>
          {data.displayResolution}
        </li>
      )}
      {data.battery && (
        <li>
          <strong>Battery:</strong>
          {data.battery}
        </li>
      )}
      {data.primaryCamera && (
        <li>
          <strong>Camera:</strong>
          {data.primaryCamera}
        </li>
      )}
      {data.secondaryCmera && (
        <li>
          <strong>Front Camera:</strong>
          {data.secondaryCmera}
        </li>
      )}
      {data.dimentions && (
        <li>
          <strong>Dimensions:</strong>
          {data.dimentions}
        </li>
      )}
      {data.weight && (
        <li>
          <strong>Weight:</strong>
          {data.weight}
        </li>
      )}
    </ul>
  );
};
