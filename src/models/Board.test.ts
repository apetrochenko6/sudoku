import { afterEach, describe, expect, it, vi } from 'vitest';
import { Board } from './Board';
import { Cell } from './Cell';
import { Difficulty } from './Difficulty';
import { Solver } from './Solver';

const createEmptyGrid = () =>
  Array(9)
    .fill(null)
    .map(() => Array(9).fill(null).map(() => new Cell(0, false)));

const countEmptyCells = (board: Board): number =>
  board
    .getGrid()
    .flat()
    .filter((cell) => cell.getValue() === 0 && !cell.getIsInitial()).length;

describe('Board - Validation', () => {
  describe('checkRow', () => {
    it('powinien pozwolić na wstawienie cyfry, jeśli nie ma jej w wierszu', () => {
      const grid = createEmptyGrid();
      const board = new Board(grid);

      expect(board.checkRow(0, 5)).toBe(true);
    });

    it('powinien zablokować wstawienie cyfry, jeśli już istnieje w wierszu', () => {
      const grid = createEmptyGrid();
      grid[0][4].setValue(5);
      const board = new Board(grid);

      expect(board.checkRow(0, 5)).toBe(false);
    });
  });

  describe('checkColumn', () => {
    it('powinien pozwolić na wstawienie cyfry, jeśli nie ma jej w kolumnie', () => {
      const grid = createEmptyGrid();
      const board = new Board(grid);

      expect(board.checkColumn(0, 7)).toBe(true);
    });

    it('powinien zablokować wstawienie cyfry, jeśli już istnieje w kolumnie', () => {
      const grid = createEmptyGrid();
      grid[4][0].setValue(7);
      const board = new Board(grid);

      expect(board.checkColumn(0, 7)).toBe(false);
    });
  });

  describe('checkBox3x3', () => {
    it('powinien pozwolić na wstawienie cyfry, jeśli blok 3x3 jest pusty', () => {
      const grid = createEmptyGrid();
      const board = new Board(grid);

      expect(board.checkBox3x3(1, 1, 9)).toBe(true);
    });

    it('powinien zablokować wstawienie cyfry, jeśli istnieje już w tym samym bloku 3x3', () => {
      const grid = createEmptyGrid();
      grid[0][0].setValue(9);
      const board = new Board(grid);

      expect(board.checkBox3x3(2, 2, 9)).toBe(false);
    });
  });

  describe('isValidMove', () => {
    it('powinien zwrócić true dla w pełni poprawnego ruchu', () => {
      const grid = createEmptyGrid();
      const board = new Board(grid);

      expect(board.isValidMove(0, 0, 5)).toBe(true);
    });

    it('powinien zwrócić false, jeśli występuje konflikt w wierszu', () => {
      const grid = createEmptyGrid();
      grid[0][8].setValue(5);
      const board = new Board(grid);

      expect(board.isValidMove(0, 0, 5)).toBe(false);
    });

    it('powinien zwrócić false, jeśli występuje konflikt w bloku 3x3', () => {
      const grid = createEmptyGrid();
      grid[1][1].setValue(5);
      const board = new Board(grid);

      expect(board.isValidMove(0, 0, 5)).toBe(false);
    });

    it('powinien ignorować aktualnie sprawdzaną komórkę', () => {
      const grid = createEmptyGrid();
      grid[0][0].setValue(5);
      const board = new Board(grid);

      expect(board.isValidMove(0, 0, 5)).toBe(true);
    });
  });
});
describe('isMoveGloballyValid', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('powinien zwrócić false, jeśli ruch jest lokalnie niepoprawny', () => {
      const grid = createEmptyGrid();
      grid[0][0].setValue(5);
      const board = new Board(grid);

      // Próbujemy wstawić 5 w tym samym wierszu obok, co łamie podstawowe zasady
      expect(board.isMoveGloballyValid(0, 1, 5)).toBe(false);
    });

    it('powinien zwrócić true, jeśli ruch jest lokalnie poprawny i prowadzi do rozwiązania', () => {
      const grid = createEmptyGrid();
      const board = new Board(grid);

      // Sztucznie mówimy Solverowi: "zakładamy, że znalazłeś rozwiązanie"
      const solveSpy = vi.spyOn(Solver.prototype, 'solve').mockReturnValue(true);

      expect(board.isMoveGloballyValid(0, 0, 7)).toBe(true);
      
      // Upewniamy się, że Solver faktycznie został użyty do sprawdzenia
      expect(solveSpy).toHaveBeenCalledOnce();
    });

    it('powinien zwrócić false, jeśli ruch jest lokalnie poprawny, ale plansza staje się nierozwiązywalna', () => {
      const grid = createEmptyGrid();
      const board = new Board(grid);

      // Sztucznie wymuszamy sytuację ślepego zaułka (Solver nie potrafi rozwiązać)
      const solveSpy = vi.spyOn(Solver.prototype, 'solve').mockReturnValue(false);

      expect(board.isMoveGloballyValid(0, 0, 9)).toBe(false);
      
      // Sprawdzamy, czy Solver został zapytany o zdanie
      expect(solveSpy).toHaveBeenCalledOnce();
    });
  });
describe('Board - Generation', () => {
  it('powinien wygenerować planszę EASY z 30 pustymi polami', () => {
    const board = Board.generateBoard(Difficulty.EASY);

    expect(countEmptyCells(board)).toBe(30);
  });

  it('powinien wygenerować planszę MEDIUM z 45 pustymi polami', () => {
    const board = Board.generateBoard(Difficulty.MEDIUM);

    expect(countEmptyCells(board)).toBe(45);
  });

  it('powinien wygenerować planszę HARD z 55 pustymi polami', () => {
    const board = Board.generateBoard(Difficulty.HARD);

    expect(countEmptyCells(board)).toBe(55);
  });
}
);
