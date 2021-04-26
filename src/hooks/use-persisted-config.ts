import { useEffect } from 'react';

export function usePersistConfig<T>(
  key: string,
  value: T,
  restore: (value: T) => void,
) {
  useEffect(() => {
    const ls = localStorage.getItem(key);
    if (ls) {
      restore(JSON.parse(ls));
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}
