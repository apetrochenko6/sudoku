import { useEffect, useState } from 'react';

export function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive)
      return;

    const interval = setInterval(() => {
      setSeconds(previousSeconds => previousSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;

    return `${minutes}:${restSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Czas gry: {formatTime()}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pauza</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}