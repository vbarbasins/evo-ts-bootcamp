import React from 'react';
import './App.css';

const GRID_CELL_COUNT = 100;

export const App: React.FC = () => {
  const cells = [];
  for (let i = 0; i < GRID_CELL_COUNT; i += 1) {
    cells.push(<div className="cell" key={i}>x</div>);
  }
  return (
    <div className="grid">
      {cells}
    </div>
  );
};
