import React, { useState } from 'react';
import './BoardComponent.css';
import { CellComponent } from './CellComponent';
import { Board } from '../models/Board';
import { Difficulty } from '../models/Difficulty';
import { ControlPanelComponent } from './ControlPanelComponent';
import { Solver } from '../models/Solver';

export const BoardComponent: React.FC = () => {
  const [boardObj] = useState(() => {
    const newBoard = new Board();
    newBoard.generateBoard(Difficulty.HARD);
    return newBoard;
  });

  
  const [, forceRender] = useState(0);
  const grid = boardObj.getGrid();
  const handleCellChange = (row: number, col: number, value: number) => {
    if (boardObj.isMoveGloballyValid(row, col, value)) {
      console.log(`Genialny ruch! ${value} w [${row}, ${col}]`);
      boardObj.getCell(row, col).setValue(value);
      forceRender(prev => prev + 1);
    } else{
      console.log(`Błąd: cyfra ${value} tu nie pasuje globalnie lub łamie zasady.`);
    }
  };
  const [difficulty, setDifficulty] = useState(Difficulty.HARD);
  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
  };
  const handleNewGame = () => {
    boardObj.generateBoard(difficulty);
    forceRender(prev => prev + 1);
  };

  const handleReset = () => {
    boardObj.getGrid().forEach(row => {
      row.forEach(cell => {
        if (!cell.getIsInitial()) {
          cell.setValue(0);
        }
      });
    });
    forceRender(prev => prev + 1);
  };
const handleSolve = () => {
  const solver = new Solver();
  const solvedBoard = new Board(boardObj.cloneGrid());

  if (solver.solve(solvedBoard)) {
    const solvedGrid = solvedBoard.getGrid();

    solvedGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        boardObj.getCell(rowIndex, colIndex).setValue(cell.getValue());
      });
    });

    forceRender(prev => prev + 1);
  }
}; 
  return (
    <div className="board-container">
    <ControlPanelComponent
    difficulty={difficulty}
    onDifficultyChange={handleDifficultyChange}
    onNewGame={handleNewGame}
    onReset={handleReset}
    onSolve={handleSolve}
    />
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
    </div>
  );}