import { useState } from 'react';
import './BoardComponent.css';
import { CellComponent } from './CellComponent';
import { Board } from '../models/Board';
import type { CellMatrix } from '../models/Cell';
import { Difficulty } from '../models/Difficulty';

type BoardComponentProps = {
  difficulty?: Difficulty;
  onIncorrectMove?: () => void;
};

export function BoardComponent({
  difficulty = Difficulty.HARD,
  onIncorrectMove = () => undefined,
}: BoardComponentProps) {
  const [boardObj] = useState<Board>(() => Board.generateBoard(difficulty));
  const [grid, setGrid] = useState<CellMatrix>(boardObj.getGrid());

  function refreshGrid(): void {
    setGrid(boardObj.getGrid().map((row) => [...row]));
  }

  function handleCellChange(row: number, col: number, value: number): void {
    const cell = boardObj.getCell(row, col);

    if (cell.getIsInitial()) {
      return;
    }

    if (value === 0) {
      cell.setValue(0);
      cell.setError(false);
      refreshGrid();
      return;
    }

    const isCorrectMove = boardObj.isMoveGloballyValid(row, col, value);

    cell.setValue(value);
    cell.setError(!isCorrectMove);

    if (!isCorrectMove) {
      onIncorrectMove();
    }

    refreshGrid();
  }

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
}
