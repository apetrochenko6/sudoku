import React, { useState } from 'react';
import './BoardComponent.css';
import { CellComponent } from './CellComponent';
import { Board } from '../models/Board';
import type { CellMatrix } from '../models/Cell';
import { Difficulty } from '../models/Difficulty';

export const BoardComponent: React.FC = () => {
  const [boardObj] = useState(() => {
    const newBoard = new Board();
    newBoard.generateBoard(Difficulty.HARD);
    return newBoard;
  });

  const [grid] = useState<CellMatrix>(boardObj.getGrid());
  const [, forceRender] = useState(0);
  const handleCellChange = (row: number, col: number, value: number) => {
    if (boardObj.isMoveGloballyValid(row, col, value)) {
      console.log(`Genialny ruch! ${value} w [${row}, ${col}]`);
      boardObj.getCell(row, col).setValue(value);
      forceRender(prev => prev + 1);
    } else{
      console.log(`Błąd: cyfra ${value} tu nie pasuje globalnie lub łamie zasady.`);
    }
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