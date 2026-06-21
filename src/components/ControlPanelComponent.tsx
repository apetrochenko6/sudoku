import { Difficulty } from '../models/Difficulty';

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
    return <button onClick={onNewGame}>Nowa gra</button>;
  };

  const renderResetBtn = () => {
    return <button onClick={onReset}>Reset</button>;
  };

  const renderSolveBtn = () => {
    return <button onClick={onSolve}>Rozwiąż</button>;
  };

  return (
    <div>
      <div>
        <label>Poziom trudności: </label>
        <select onChange={event => onDifficultyChange(event.target.value as Difficulty)}>
          <option value={Difficulty.EASY}>EASY</option>
          <option value={Difficulty.MEDIUM}>MEDIUM</option>
          <option value={Difficulty.HARD}>HARD</option>
        </select>
      </div>

      <div>
        {renderNewGameBtn()}
        {renderResetBtn()}
        {renderSolveBtn()}
      </div>
    </div>
  );
}