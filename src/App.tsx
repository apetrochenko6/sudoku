import { useState } from 'react';
import './App.css';
import { BoardComponent } from './components/BoardComponent';
import { ControlPanelComponent } from './components/ControlPanelComponent';
import { ErrorCounterComponent } from './components/ErrorCounterComponent';
import { NumpadComponent } from './components/NumpadComponent';
import { TimerComponent } from './components/TimerComponent';
import { Difficulty } from './models/Difficulty';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [errorsCount, setErrorsCount] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  function resetGameState(): void {
    setErrorsCount(0);
    setSelectedNumber(null);
    setResetKey((previousResetKey) => previousResetKey + 1);
  }

  function handleNewGame(): void {
    resetGameState();
  }

  function handleReset(): void {
    resetGameState();
  }

  function handleSolve(): void {
    console.log('Rozwiązanie gry');
  }

  function handleDifficultyChange(newDifficulty: Difficulty): void {
    setDifficulty(newDifficulty);
    resetGameState();
  }

  function handleNumberSelect(value: number): void {
    setSelectedNumber(value);
  }

  function handleIncorrectMove(): void {
    setErrorsCount((previousErrorsCount) => previousErrorsCount + 1);
  }

  return (
    <div className="app-container">
      <h1>Sudoku Game</h1>

      <div className="game-status-bar">
        <TimerComponent />
        <ErrorCounterComponent errorsCount={errorsCount} />
      </div>

      <ControlPanelComponent
        onNewGame={handleNewGame}
        onReset={handleReset}
        onSolve={handleSolve}
        onDifficultyChange={handleDifficultyChange}
      />

      <p>Wybrany poziom trudności: {difficulty}</p>
      <p>Wybrana cyfra: {selectedNumber === null ? 'brak' : selectedNumber}</p>

      <BoardComponent
        key={`${difficulty}-${resetKey}`}
        difficulty={difficulty}
        onIncorrectMove={handleIncorrectMove}
      />

      <NumpadComponent onNumberSelect={handleNumberSelect} />
    </div>
  );
}

export default App;
