import { describe, expect, it } from 'vitest';
import { Board } from './Board';
import { Cell } from './Cell';

describe('Board - Validation', () => {
    const createEmptyGrid = () => 
    Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => new Cell(0, false))
    );

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
});