import { Cell } from './Cell';

type CellMatrix = Cell[][];

export class Board {
  private grid: CellMatrix;
  constructor(initialGrid: CellMatrix) {
    this.grid = initialGrid;
  }

  public checkRow(row: number, value: number): boolean {
    
    return true;
  }

  public checkColumn(col: number, value: number): boolean {
    return true;
  }

  public checkBox3x3(row: number, col: number, value: number): boolean {
    return true;
  }
}