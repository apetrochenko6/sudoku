import { Cell } from '../models/Cell';
import './CellComponent.css';

type CellComponentProps = {
  cell: Cell;
  row: number;
  col: number;
  onCellChange: (row: number, col: number, value: number) => void;
  onSelect?: () => void;
};

export function CellComponent(props: CellComponentProps) {
  function handleUserInput(value: string): void {
    if (props.cell.getIsInitial()) {
      return;
    }

    if (value === '') {
      props.onCellChange(props.row, props.col, 0);
      return;
    }

    const numberValue = Number(value);

    if (numberValue >= 1 && numberValue <= 9) {
      props.onCellChange(props.row, props.col, numberValue);
    }
  }

  const className = [
    'cell',
    props.cell.getIsInitial() ? 'initial' : '',
    props.cell.getIsError() ? 'error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <input
      className={className}
      inputMode="numeric"
      maxLength={1}
      readOnly={props.cell.getIsInitial()}
      value={props.cell.getValue() === 0 ? '' : props.cell.getValue()}
      onChange={(event) => handleUserInput(event.target.value)}
      onClick={props.onSelect}
    />
  );
}