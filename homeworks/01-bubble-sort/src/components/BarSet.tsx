import React from 'react';
import './BarSet.css';

interface BarSetProps {
  numbers: number[];
  currentIndex: number;
}

export const BarSet: React.FC<BarSetProps> = ({ numbers, currentIndex }) => (
  <div className="BarSet">
    {numbers.map((number, index) => {
      const style = {
        height: `${number}px`,
        backgroundColor: index === currentIndex ? '#fddeb6' : '#faebd7',
      };
      return <div className="Bar" style={style} key={`${index}`} />;
    })}
  </div>
);
