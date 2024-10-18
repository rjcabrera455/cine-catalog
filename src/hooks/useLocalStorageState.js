import { useEffect, useState } from 'react';

export function useLocalStorageState(key, initial) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
