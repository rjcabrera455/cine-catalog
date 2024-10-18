import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(() => {
    function calback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener('keydown', calback);

    return function () {
      document.removeEventListener('keydown', calback);
    };
  }, [action]);
}
