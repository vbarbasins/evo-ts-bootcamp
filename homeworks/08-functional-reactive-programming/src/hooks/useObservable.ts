import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>, initial: T): T => {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const subscription = observable.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
};
