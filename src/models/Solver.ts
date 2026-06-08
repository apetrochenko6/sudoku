import { Board } from './Board';
import type { Position } from './Position';

export class Solver {
  public solve(board: Board): boolean {
    const position = this.findEmptyCell(board);

    if (position === null) {
      return true;
    }

    const numbers = this.getShuffledNumbers();

    for (const value of numbers) {
      if (board.isValidMove(position.row, position.col, value)) {
        board.getCell(position.row, position.col).setValue(value);

        if (this.solve(board)) {
          return true;
        }

        board.getCell(position.row, position.col).setValue(0);
      }
    }

    return false;
  }

  public findEmptyCell(board: Board): Position | null {
    const grid = board.getGrid();

    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        if (grid[row][col].getValue() === 0) {
          return { row, col };
        }
      }
    }

    return null;
  }

  public generateUniqueSolution(): Board {
    const board = new Board();
    this.solve(board);

    const solvedGrid = board
      .getGrid()
      .map((row) => row.map((cell) => cell.cloneAsInitial()));

    return new Board(solvedGrid);
  }

  private getShuffledNumbers(): number[] {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let index = numbers.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const temporaryValue = numbers[index];
      numbers[index] = numbers[randomIndex];
      numbers[randomIndex] = temporaryValue;
    }

    return numbers;
  }
}
