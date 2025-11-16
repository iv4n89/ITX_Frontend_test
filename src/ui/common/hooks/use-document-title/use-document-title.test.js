import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useDocumentTitle } from './use-document-title';

describe('useDocumentTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it('should set document title', () => {
    const title = 'Test Title';
    renderHook(() => useDocumentTitle(title));
    expect(document.title).toBe(title);
  });

  it('should update document title when title changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Initial Title' },
    });
    expect(document.title).toBe('Initial Title');

    rerender({ title: 'Updated Title' });
    expect(document.title).toBe('Updated Title');
  });
});
