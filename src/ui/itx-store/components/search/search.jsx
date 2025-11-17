import './search.css';

/**
 * Search component to handle product search input
 * @param {{ searchTerm: string, setSearchTerm: function }} params
 * @returns {JSX.Element}
 */
export const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search__container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by brand or model"
        className="search__input"
      />
    </div>
  );
};
