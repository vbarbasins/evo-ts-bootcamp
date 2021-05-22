import React from 'react';
import { combineLatest, interval, of } from 'rxjs';
import { useObservableState } from 'observable-hooks';
import { map } from 'rxjs/operators';
import './App.css';

import { GridCell } from './components/GridCell';

import { generateCells, randomiseCat } from './utils';

import { CellContent } from './types';

export const App: React.FC = () => {
  const cat$ = interval(1000).pipe(map(() => randomiseCat()));

  const cells$ = of(generateCells());

  const cellsWithCat$ = combineLatest([cat$, cells$])
    .pipe(
      map(([cat, cellss]) => {
        // eslint-disable-next-line no-param-reassign
        cellss[cat].content = CellContent.CAT;
        return cellss;
      }),
    );
  const cells = useObservableState(cellsWithCat$);
  // eslint-disable-next-line no-undef
  const gameCells: JSX.Element[] = [];
  if (cells && cells.length > 0) {
    cells.forEach(
      (cell) => gameCells.push(<GridCell content={cell.content} key= {cell.id}/>),
    );
  }

  return (
    <div className="grid">
      {gameCells}
    </div>
  );
};
