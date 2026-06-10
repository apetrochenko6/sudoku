import { Difficulty } from '../models/Difficulty';
import './ControlPanelComponent.css';

type ControlPanelComponentProps = {
  onNewGame: () => void;
  onReset: () => void;
  onSolve: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
};

export function ControlPanelComponent({
  onNewGame,
  onReset,
  onSolve,
  onDifficultyChange,
}: ControlPanelComponentProps) {
  const renderNewGameBtn = () => {
  return (
    <button className="control-button primary" onClick={onNewGame}>
      Nowa gra
    </button>
  );
};

const renderResetBtn = () => {
  return (
    <button className="control-button secondary" onClick={onReset}>
      Reset
    </button>
  );
};

const renderSolveBtn = () => {
  return (
    <button className="control-button primary" onClick={onSolve}>
      Rozwiąż
    </button>
  );
};
  return (
   <div className="control-panel">
     <div className="difficulty-control">
  <label className="difficulty-label">Poziom trudności: </label>
        <select className="difficulty-select" onChange={event => onDifficultyChange(event.target.value as Difficulty)}>
          <option value={Difficulty.EASY}>EASY</option>
          <option value={Difficulty.MEDIUM}>MEDIUM</option>
          <option value={Difficulty.HARD}>HARD</option>
        </select>
      </div>

      <div className="control-buttons">
        {renderNewGameBtn()}
        {renderResetBtn()}
        {renderSolveBtn()}
      </div>
    </div>
  );
}