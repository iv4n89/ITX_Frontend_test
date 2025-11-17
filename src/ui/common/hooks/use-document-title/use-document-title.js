import React from 'react';

/**
 * Custom hook to set the document title
 * @param {string} title
 */
export const useDocumentTitle = (title) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
};
