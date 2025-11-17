import './item-image.css';

/**
 * ItemImage component to display product image
 * @param {{ src: string, alt: string }} params
 * @returns {JSX.Element}
 */
export const ItemImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="item_image__image" />;
};
