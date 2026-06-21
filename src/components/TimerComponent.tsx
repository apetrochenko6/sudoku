import { useEffect, useState } from 'react';
import timerIcon from '../assets/timer-icon.svg';
import './TimerComponent.css';
type TimerComponentProps = {
  resetKey: number;
};
export function TimerComponent({ resetKey }: TimerComponentProps) {
  const [seconds, setSeconds] = useState(0);
 const [isActive] = useState(true);

  useEffect(() => {
    setSeconds(0);
  }, [resetKey]);

  useEffect(() => {
    if (!isActive)
      return;

    const interval = setInterval(() => {
      setSeconds(previousSeconds => previousSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);


  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;

    return `${minutes}:${restSeconds.toString().padStart(2, '0')}`;
  };

 return (
  <div className="timer-card">
   <div className="timer-icon">
  <img src={timerIcon} alt="" className="timer-icon-image" />
</div>

    <div className="timer-content">
      <span className="timer-label">Czas</span>
      <span className="timer-value">{formatTime()}</span>
    </div>
  </div>
);
}