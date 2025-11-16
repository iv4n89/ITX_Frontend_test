import './skeleton.css';

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
