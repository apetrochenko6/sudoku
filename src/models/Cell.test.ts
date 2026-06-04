import { describe, expect, it } from 'vitest';
import { Cell } from './Cell';

describe('Cell', () => {
  it('should create empty cell by default', () => {
    const cell = new Cell();

    expect(cell.getValue()).toBe(0);
    expect(cell.getIsInitial()).toBe(false);
    expect(cell.getIsError()).toBe(false);
  });

  it('should create initial cell with value', () => {
    const cell = new Cell(5, true);

    expect(cell.getValue()).toBe(5);
    expect(cell.getIsInitial()).toBe(true);
  });

  it('should change value when cell is not initial', () => {
    const cell = new Cell(0, false);

    cell.setValue(7);

    expect(cell.getValue()).toBe(7);
  });

  it('should not change value when cell is initial', () => {
    const cell = new Cell(3, true);

    cell.setValue(8);

    expect(cell.getValue()).toBe(3);
  });

  it('should set error flag', () => {
    const cell = new Cell();

    cell.setError(true);

    expect(cell.getIsError()).toBe(true);
  });
});