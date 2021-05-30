import React, { useCallback } from 'react';
import './App.css';

import { useObservable } from './hooks/useObservable';

import { goodShots$ } from './game/statistics';
import { gameGrid$, handleShot } from './game/gameplay';

import { Grid } from './components/Grid';

import { CellContent } from './types';

export const App: React.FC = () => {
  const cellsWithTarget = useObservable(gameGrid$, []);
  const goodShots = useObservable(goodShots$, 0);

  const handleClick = useCallback((target: CellContent) => {
    handleShot(target);
  }, [cellsWithTarget]);

  return (
    <div>
      <Grid cells={cellsWithTarget} onClick={handleClick}/>
      <p>Score: {goodShots}</p>
    </div>
  );
};
