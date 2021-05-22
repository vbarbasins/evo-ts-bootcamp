import React from 'react';
import './App.css';

import { Cell } from './components/Cell';

import { CellContent } from './types';

const GRID_CELL_COUNT = 100;

export const App: React.FC = () => {
  const cells = [];
  for (let i = 0; i < GRID_CELL_COUNT; i += 1) {
    cells.push(<Cell content={CellContent.WALL}/>);
  }
  return (
    <div className="grid">
      {cells}
    </div>
  );
};
