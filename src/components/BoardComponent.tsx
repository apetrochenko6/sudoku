import React, { useState } from 'react';
import './BoardComponent.css';
import { CellComponent } from './CellComponent';
import { Cell } from '../models/Cell';
import type { CellMatrix } from '../models/Cell';

import { Board } from '../models/Board';
import { Difficulty } from '../models/Difficulty';


export const BoardComponent: React.FC = () => {

  const [boardObj] = useState(() => {
    const newBoard = new Board();
    newBoard.generateBoard(Difficulty.EASY);
    return newBoard;
  });
  const [grid, setGrid] = useState<CellMatrix>(boardObj.getGrid());
  const handleCellChange = (row: number, col: number, value: number) => {
    console.log(`Gracz chce wstawić cyfrę ${value} w komórkę [${row}, ${col}]`);
  };

  return (
    <div className="sudoku-board" data-testid="sudoku-board">
      {grid.map((rowArr, rowIndex) => (
        rowArr.map((cellObj, colIndex) => {
          const isThickRight = colIndex === 2 || colIndex === 5;
          const isThickBottom = rowIndex === 2 || rowIndex === 5;
          return (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className={`cell-wrapper ${isThickRight ? 'border-right-thick' : ''} ${isThickBottom ? 'border-bottom-thick' : ''}`}
              data-testid="cell-wrapper"
            >
              <CellComponent 
                cell={cellObj} 
                row={rowIndex} 
                col={colIndex} 
                onCellChange={handleCellChange} 
              />
            </div>
          );
        })
      ))}
    </div>
  );
};