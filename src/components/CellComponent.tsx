import { Cell } from '../models/Cell';
import './CellComponent.css';

type CellComponentProps = {
  cell: Cell;
  row: number;
  col: number;
  onCellChange: (row: number, col: number, value: number) => void;
};

export function CellComponent({
  cell,
  row,
  col,
  onCellChange,
}: CellComponentProps) {
  function handleUserInput(value: string): void {
    if (cell.getIsInitial()) {
      return;
    }

    if (value === '') {
      onCellChange(row, col, 0);
      return;
    }

    const numberValue = Number(value);

    if (numberValue >= 1 && numberValue <= 9) {
      onCellChange(row, col, numberValue);
    }
  }

  function renderCell() {
    return (
      <input
        className={`cell ${cell.getIsInitial() ? 'initial' : ''} ${
          cell.getIsError() ? 'error' : ''
        }`}
        value={cell.getValue() === 0 ? '' : cell.getValue()}
        maxLength={1}
        disabled={cell.getIsInitial()}
        onChange={(event) => handleUserInput(event.target.value)}
      />
    );
  }

  return renderCell();
}