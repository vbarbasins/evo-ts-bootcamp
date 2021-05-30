import { useState, useEffect, useMemo } from 'react';
import { Observable, Subject, Subscription } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>, initial: T): T => {
  const [value, setValue] = useState<T>(initial);
  const subject = useMemo(() => new Subject(), []);

  useEffect(() => {
    const subscription = new Subscription();
    subscription.add(subject);
    subscription.add(subject.pipe(() => observable).subscribe((subValue) => setValue(subValue)));
    return () => subscription.unsubscribe();
  }, [subject]);

  return value;
};
