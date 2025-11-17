import React from 'react';

/**
 * Custom hook to manage search functionality
 * @param {object[]} data - Array of products to search from
 * @returns {{ searchTerm: string, setSearchTerm: function, filteredData: object[] }}
 */
export const useSearch = (data) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    if (!searchTerm) return data;
    return data.filter(
      (item) =>
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return { searchTerm, setSearchTerm, filteredData };
};
