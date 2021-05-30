import { useState, useEffect } from 'react';

export const useObservable = (observable: any) => {
  const [value, setValue] = useState(observable);

  useEffect(
    () => {
      if (!observable || !observable.subscribe) {
        return;
      }
      const subscription = observable.subscribe(setValue);
      // eslint-disable-next-line consistent-return
      return () => subscription.unsubscribe();
    },
    [observable],
  );

  return value;
};
