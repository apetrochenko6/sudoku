import { describe, expect, it } from 'vitest';
import { Board } from './Board';
import { Cell } from './Cell';
import { Solver } from './Solver';

const expectedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const sortedValues = (values: number[]): number[] => [...values].sort((first, second) => first - second);

const expectValidSolvedBoard = (board: Board): void => {
  const grid = board.getGrid();

  for (let row = 0; row < 9; row += 1) {
    expect(sortedValues(grid[row].map((cell) => cell.getValue()))).toEqual(expectedValues);
  }

  for (let col = 0; col < 9; col += 1) {
    const columnValues = grid.map((row) => row[col].getValue());

    expect(sortedValues(columnValues)).toEqual(expectedValues);
  }

  for (let startRow = 0; startRow < 9; startRow += 3) {
    for (let startCol = 0; startCol < 9; startCol += 3) {
      const boxValues: number[] = [];

      for (let rowOffset = 0; rowOffset < 3; rowOffset += 1) {
        for (let colOffset = 0; colOffset < 3; colOffset += 1) {
          boxValues.push(grid[startRow + rowOffset][startCol + colOffset].getValue());
        }
      }

      expect(sortedValues(boxValues)).toEqual(expectedValues);
    }
  }
};

describe('Solver', () => {
  it('powinien znaleźć pierwszą pustą komórkę w planszy', () => {
    const solver = new Solver();
    const grid = Board.createEmptyGrid();
    grid[0][0] = new Cell(5, true);
    const board = new Board(grid);

    expect(solver.findEmptyCell(board)).toEqual({ row: 0, col: 1 });
  });

  it('powinien rozwiązać pustą planszę Sudoku', () => {
    const solver = new Solver();
    const board = new Board();

    expect(solver.solve(board)).toBe(true);
    expectValidSolvedBoard(board);
  });

  it('powinien wygenerować pełną poprawną planszę Sudoku', () => {
    const solver = new Solver();
    const board = solver.generateUniqueSolution();

    expectValidSolvedBoard(board);
  });
});
