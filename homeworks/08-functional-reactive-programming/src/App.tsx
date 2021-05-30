import React, { useCallback, useEffect, useState } from 'react';
import {
  combineLatest, from, interval, of, Subject,
} from 'rxjs';
import { map, scan } from 'rxjs/operators';
import './App.css';

import { useObservable } from './hooks/useObservable';

import { Grid } from './components/Grid';

import { generateGrid, getRandomTarget } from './utils';

import { CellContent } from './types';

export const App: React.FC = () => {
  const [goodShots, setGoodShots] = useState<number>(0);

  const shotTarget = new Subject<CellContent>();
  const shotTarget$ = shotTarget.asObservable();

  const targetIndex$ = interval(1000).pipe(map(() => getRandomTarget()));

  const grid$ = of(generateGrid());

  const cellsWithTarget$ = combineLatest([targetIndex$, grid$])
    .pipe(
      map(([targetIndex, grid]) => {
        const newGrid = [...grid];
        newGrid[targetIndex].content = CellContent.CAT;
        return newGrid;
      }),
    );

  const goodShots$ = from(shotTarget$)
    .pipe(
      map((target) => (target === CellContent.CAT ? 1 : 0)),
      scan((acc, count) => acc + count, 0),
    );

  const cellsWithTarget = useObservable(cellsWithTarget$);

  useEffect(() => {
    const sub = goodShots$.subscribe((v) => {
      setGoodShots(v);
    });
    return sub.unsubscribe;
  }, []);

  const handleClick = useCallback((target: CellContent) => {
    shotTarget.next(target);
  }, []);

  return (
    <div>
      <Grid cells={cellsWithTarget} onClick={handleClick}/>
      <p>Score:{goodShots}</p>
    </div>
  );
};
