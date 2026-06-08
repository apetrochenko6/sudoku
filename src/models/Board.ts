import { Cell } from './Cell';

type CellMatrix = Cell[][];

export class Board {
  private grid: CellMatrix;
  constructor(initialGrid: CellMatrix) {
    this.grid = initialGrid;
  }

  public checkRow(row: number, value: number): boolean {
    for (let col = 0; col < 9; col++) {
      if (this.grid[row][col].getValue() === value) {
        return false; 
      }
    }
    return true;
  }

  public checkColumn(col: number, value: number): boolean {
    for (let row = 0; row < 9; row++) {
      if (this.grid[row][col].getValue() === value) {
        return false; 
      }
    }
    return true;
  }

  public checkBox3x3(row: number, col: number, value: number): boolean {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.grid[startRow + r][startCol + c].getValue() === value) {
          return false; 
        }
      }
    }
    return true;
  }
  public isValidMove(row: number, col: number, value: number): boolean {
    return false;
  }
}