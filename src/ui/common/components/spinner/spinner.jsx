import './spinner.css';

/**
 * Spinner component to indicate loading state
 * @param {{size: 'small' | 'medium' | 'large', color: string}} options
 * @returns A animated spinner
 */
export const Spinner = ({ size = 'medium', color = 'white' }) => {
  return (
    <div
      className={`spinner spinner__${size} spinner__${color}`}
      data-testid="spinner"
    >
      <span className="spinner__visuallyhidden">Loading...</span>
    </div>
  );
};
