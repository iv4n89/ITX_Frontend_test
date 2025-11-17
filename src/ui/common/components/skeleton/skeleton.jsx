import './skeleton.css';

/**
 * Skeleton component to display a loading placeholder
 * @param {{ borderRadius?: number, width: string | number, height: string | number, className?: string, testid?: string }} params
 * @returns {JSX.Element}
 */
export const Skeleton = ({
  borderRadius = 8,
  width,
  height,
  className,
  testid,
}) => {
  return (
    <div
      className={`skeleton ${className || ''}`}
      style={{
        borderRadius,
        width,
        height,
      }}
      data-testid={testid}
    ></div>
  );
};
