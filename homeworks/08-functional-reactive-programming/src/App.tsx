import React, { useCallback } from 'react';
import './App.css';

import { useObservable } from './hooks/useObservable';

import { goodShots$ } from './game/statistics';
import { gameGrid$, handleShot } from './game/gameplay';

import { Grid } from './components/Grid';

import { CellContent } from './types';

export const App: React.FC = () => {
  const gameGrid = useObservable(gameGrid$, []);
  const goodShots = useObservable(goodShots$, 0);

  const handleClick = useCallback((target: CellContent) => {
    handleShot(target);
  }, [gameGrid]);

  return (
    <div>
      <Grid cells={gameGrid} onClick={handleClick}/>
      <p>Score: {goodShots}</p>
    </div>
  );
};
