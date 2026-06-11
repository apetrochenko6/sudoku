import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { BoardComponent } from './BoardComponent';
describe('BoardComponent TDD & Integration', () => {
  it('renderuje główny kontener planszy', () => {
    const { container } = render(<BoardComponent />);
    const boardElement = container.querySelector('.sudoku-board');
    expect(boardElement).toBeInTheDocument();
  });
  it('renderuje dokładnie 81 komórek (siatka 9x9)', () => {
    const { container } = render(<BoardComponent />);
    const cells = container.querySelectorAll('.cell-wrapper');
    expect(cells.length).toBe(81);
  });
});