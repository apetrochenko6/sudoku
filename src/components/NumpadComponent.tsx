import './NumpadComponent.css';

type NumpadComponentProps = {
  onNumberSelect: (value: number) => void;
};

export function NumpadComponent({ onNumberSelect }: NumpadComponentProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleNumberClick(value: number): void {
    onNumberSelect(value);
  }

  return (
    <div className="numpad" aria-label="Panel numeryczny">
      <div className="numpad-grid">
        {numbers.map((number) => (
          <button
            key={number}
            type="button"
            className="numpad-button"
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="numpad-button numpad-clear"
        onClick={() => handleNumberClick(0)}
      >
        Clear
      </button>
    </div>
  );
}
