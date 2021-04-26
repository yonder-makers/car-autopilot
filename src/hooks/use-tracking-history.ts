import { useEffect, useState } from 'react';

export function useTrackHistory(simTime: number, value: number) {
  const [data, setData] = useState([value]);

  useEffect(() => {
    setData((oldData) => {
      const newData = [...oldData, Math.floor(value)];
      return newData;
    });
  }, [simTime]);

  return { data };
}
