import './search.css';

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
