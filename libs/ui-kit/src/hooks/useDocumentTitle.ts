import * as React from 'react';

export function useDocumentTitle(title: string): void {
  React.useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
