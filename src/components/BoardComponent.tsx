import React, { useState } from 'react';
import './BoardComponent.css';
import { CellComponent } from './CellComponent';
import { Cell } from '../models/Cell';
import type { CellMatrix } from '../models/Cell';
const createMockGrid = (): CellMatrix => {
  const grid: CellMatrix = [];
  for (let row = 0; row < 9; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < 9; col++) {
      const isFilled = Math.random() > 0.7;
      if (isFilled) {
        const randomValue = Math.floor(Math.random() * 9) + 1;
        currentRow.push(new Cell(randomValue, true));
      } else {

        currentRow.push(new Cell(0, false));
      }
    }
    grid.push(currentRow);
  }
  return grid;
};

export const BoardComponent: React.FC = () => {
  const [grid, setGrid] = useState<CellMatrix>(createMockGrid());
  
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