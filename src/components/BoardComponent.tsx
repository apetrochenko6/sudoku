import { useState, forwardRef, useImperativeHandle, useEffect  }
 from 'react';import './BoardComponent.css';
import { CellComponent } from './CellComponent';
import { Board } from '../models/Board';
import type { CellMatrix } from '../models/Cell';
import { Difficulty } from '../models/Difficulty';

type BoardComponentProps = {
  difficulty?: Difficulty;
  onIncorrectMove?: () => void;
  selectedNumber?: number | null;
  selectedCell?: {
    row: number;
    col: number;
  } | null;

   onCellSelect?: (
    cell: { row: number; col: number } | null
  ) => void;
  onClearNumber?: () => void;
  onGameWon?: () => void;
};
export type BoardRef = {
  solve: () => void;
};
export const BoardComponent = forwardRef<BoardRef, BoardComponentProps>(
  ({ difficulty = Difficulty.HARD, onIncorrectMove = () => undefined, selectedNumber = null,selectedCell = null,
    onCellSelect,onClearNumber,onGameWon = () => undefined}, ref) => {
    const [boardObj] = useState<Board>(() => Board.generateBoard(difficulty));
    const [grid, setGrid] = useState<CellMatrix>(boardObj.getGrid());

  function refreshGrid(): void {
    setGrid(boardObj.getGrid().map((row) => [...row]));
  }
  useImperativeHandle(ref, () => ({
      solve() {
        boardObj.solve();
        refreshGrid();
      },
    }));
  function handleCellChange(row: number, col: number, value: number): void {
    const valueToSet = value ?? selectedNumber;
      if (valueToSet === null) {
        return;
      }
      const cell = boardObj.getCell(row, col);
      if (cell.getIsInitial()) {
        return;
      }
      if (valueToSet === 0) {
        cell.setValue(0);
        cell.setError(false);
        refreshGrid();
        return;
      }
      const isCorrectMove = boardObj.isMoveGloballyValid(row, col, valueToSet);
      cell.setValue(valueToSet);
      cell.setError(!isCorrectMove);
      if (!isCorrectMove) {
        onIncorrectMove();
      } else {
        if (checkIsGameWon(boardObj.getGrid())) {
          onGameWon();
        }
      }
    refreshGrid();
  }
  useEffect(() => {
    if (
      selectedNumber === null ||
      selectedCell === null
    ) {
      return;
    }

    handleCellChange(
      selectedCell.row,
      selectedCell.col,
      selectedNumber
    );
    onCellSelect?.(null);
    onClearNumber?.();
  }, [selectedNumber, selectedCell]);
    function checkIsGameWon(currentGrid: CellMatrix): boolean {
      for (const row of currentGrid) {
        for (const cell of row) {
          if (cell.getValue() === 0 || cell.getIsError()) {
            return false; 
          }
        }
      }
      return true;
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
                onSelect={() => onCellSelect?.({
                  row: rowIndex,
                  col: colIndex,
                  })
                }
              />
            </div>
          );
        })
      ))}
    </div>
);
  }
);
