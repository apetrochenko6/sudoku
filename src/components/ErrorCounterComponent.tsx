import './ErrorCounterComponent.css';

type ErrorCounterComponentProps = {
  errorsCount: number;
};

export function ErrorCounterComponent({ errorsCount }: ErrorCounterComponentProps) {
  return (
    <div className="error-counter-card" aria-label="Licznik błędów">
      <span className="error-counter-icon">⚠️</span>
      <div className="error-counter-content">
        <span className="error-counter-label">Błędy</span>
        <span className="error-counter-value">{errorsCount}</span>
      </div>
    </div>
  );
}
