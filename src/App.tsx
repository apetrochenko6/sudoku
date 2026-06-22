import { useState, useRef } from 'react'; // ДОДАНО: useRef
import './App.css';
import { BoardComponent, type BoardRef } from './components/BoardComponent';
import { ControlPanelComponent } from './components/ControlPanelComponent';
import { ErrorCounterComponent } from './components/ErrorCounterComponent';
import { NumpadComponent } from './components/NumpadComponent';
import { TimerComponent } from './components/TimerComponent';
import { Difficulty } from './models/Difficulty';
type GameStatus = 'PLAYING' | 'WON' | 'LOST';
const MAX_ERRORS = 3;
function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [errorsCount, setErrorsCount] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [selectedCell, setSelectedCell] = useState<{
  row: number;
  col: number;
  } | null>(null);
  const boardRef = useRef<BoardRef>(null);
  
  const [gameStatus, setGameStatus] = useState<GameStatus>('PLAYING');

  function resetGameState(): void {
    setErrorsCount(0);
    setSelectedNumber(null);
    setSelectedCell(null);
    setGameStatus('PLAYING');
    setResetKey((previousResetKey) => previousResetKey + 1);
  }

  function handleNewGame(): void {
    resetGameState();
  }

  function handleReset(): void {
    resetGameState();
  }

  function handleSolve(): void {
    boardRef.current?.solve();
  }

  function handleDifficultyChange(newDifficulty: Difficulty): void {
    setDifficulty(newDifficulty);
    resetGameState();
  }

  function handleNumberSelect(value: number): void {
    if (gameStatus !== 'PLAYING') return;
    setSelectedNumber(value);
  }

  function handleIncorrectMove(): void {
    setErrorsCount((prev) => {
      const newErrors = prev + 1;
      if (newErrors >= MAX_ERRORS) {
        setGameStatus('LOST');
      }
      return newErrors;
    });
  }
  function handleGameWon(): void {
    setGameStatus('WON');
  }
  return (
    <div className="app-container">
      <div className="app-title">Sudoku Game</div>
      <div className="game-status-bar">
        <TimerComponent key={resetKey} resetKey={resetKey}/>
        <ErrorCounterComponent errorsCount={errorsCount} />
        <div style={{ marginLeft: '10px', color: 'gray' }}>Limit błędów: {MAX_ERRORS}</div>
      </div>

      <ControlPanelComponent
        onNewGame={handleNewGame}
        onReset={handleReset}
        onSolve={handleSolve}
        onDifficultyChange={handleDifficultyChange}
      />

      <div className='game-container' style={{ position: 'relative' }}>
                {gameStatus !== 'PLAYING' && (
          <div className="game-over-overlay">
            <h2>{gameStatus === 'WON' ? '🏆 Wygrałeś!' : '💔 Przegrałeś!'}</h2>
            <button onClick={handleNewGame}>Zagraj ponownie</button>
          </div>
        )}

        <BoardComponent
          ref={boardRef}
          key={`${difficulty}-${resetKey}`}
          difficulty={difficulty}
          onIncorrectMove={handleIncorrectMove}
          onGameWon={handleGameWon}
          selectedNumber={selectedNumber}
          selectedCell={selectedCell}
          onCellSelect={setSelectedCell}
          onClearNumber={() => setSelectedNumber(null)}
        />
        <NumpadComponent onNumberSelect={handleNumberSelect} />
      </div>
    </div>
  );
}

export default App;