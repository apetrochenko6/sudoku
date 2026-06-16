import { Cell } from './Cell';
import { Difficulty } from './Difficulty';
import type { Difficulty as DifficultyLevel } from './Difficulty';
import { Solver } from './Solver';

type CellMatrix = Cell[][];

const cellsToRemoveByDifficulty: Record<DifficultyLevel, number> = {
  [Difficulty.EASY]: 30,
  [Difficulty.MEDIUM]: 45,
  [Difficulty.HARD]: 55,
};

export class Board {
  private grid: CellMatrix;

  constructor(initialGrid: CellMatrix = Board.createEmptyGrid()) {
    this.grid = initialGrid;
  }

  public static createEmptyGrid(): CellMatrix {
    return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Cell(0, false)));
  }

  public static generateBoard(diff: DifficultyLevel): Board {
    const solver = new Solver();
    const solvedBoard = solver.generateUniqueSolution();
    const generatedGrid = solvedBoard.cloneGrid();
    const cellsToRemove = cellsToRemoveByDifficulty[diff];
    const removedPositions = new Set<string>();

    while (removedPositions.size < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const positionKey = `${row}-${col}`;

      if (!removedPositions.has(positionKey)) {
        generatedGrid[row][col] = new Cell(0, false);
        removedPositions.add(positionKey);
      }
    }

    return new Board(generatedGrid);
  }

  public generateBoard(diff: DifficultyLevel): void {
    this.grid = Board.generateBoard(diff).cloneGrid();
  }

  public getGrid(): CellMatrix {
    return this.grid;
  }

  public getCell(row: number, col: number): Cell {
    return this.grid[row][col];
  }

  public cloneGrid(): CellMatrix {
    return this.grid.map((row) => row.map((cell) => new Cell(cell.getValue(), cell.getIsInitial())));
  }

  public checkRow(row: number, value: number, ignoredCol: number | null = null): boolean {
    for (let col = 0; col < 9; col += 1) {
      if (col !== ignoredCol && this.grid[row][col].getValue() === value) {
        return false;
      }
    }

    return true;
  }

  public checkColumn(col: number, value: number, ignoredRow: number | null = null): boolean {
    for (let row = 0; row < 9; row += 1) {
      if (row !== ignoredRow && this.grid[row][col].getValue() === value) {
        return false;
      }
    }

    return true;
  }

  public checkBox3x3(row: number, col: number, value: number): boolean {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let rowOffset = 0; rowOffset < 3; rowOffset += 1) {
      for (let colOffset = 0; colOffset < 3; colOffset += 1) {
        const currentRow = startRow + rowOffset;
        const currentCol = startCol + colOffset;

        if (
          (currentRow !== row || currentCol !== col) &&
          this.grid[currentRow][currentCol].getValue() === value
        ) {
          return false;
        }
      }
    }

    return true;
  }

  public isValidMove(row: number, col: number, value: number): boolean {
    if (value < 1 || value > 9) {
      return false;
    }

    return (
      this.checkRow(row, value, col) &&
      this.checkColumn(col, value, row) &&
      this.checkBox3x3(row, col, value)
    );
  }
  public isMoveGloballyValid(row: number, col: number, value: number): boolean {
    if (!this.isValidMove(row, col, value)) {
      return false;
    }
    const boardCopy = new Board(this.cloneGrid());
    boardCopy.getCell(row, col).setValue(value);
    const solver = new Solver();
    return solver.solve(boardCopy);
  }
  
}
